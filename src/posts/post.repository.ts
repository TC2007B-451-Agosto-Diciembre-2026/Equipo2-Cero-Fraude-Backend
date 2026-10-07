import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { DB_POOL } from "../database/database.module";
import { ADMIN_ROLE_ID, DRAFT_STATUS_ID, PAGE_SIZE, PUBLISHED_STATUS_ID, REJECTED_STATUS_ID, UPLOADED_STATUS_ID, USER_ROLE_ID, VALIDATED_STATUS_ID } from "../common/constants";
import { FindPostsResult } from "./dto/responses/find-posts-result.dto";
import { CreatePostDto } from "./dto/requests/create-post.dto";
import { PostEntity } from "./entities/post.entity";
import { EvidenceEntity } from "../evidences/entities/evidence.entity";
import { DerivedFindPostsDto } from "./dto/requests/derived-find-posts.dto";
import { UpdatePostDto } from "./dto/requests/update-post.dto";
import { DeletedPostResult } from "./dto/requests/deleted-post-results.dto";
import { DeletedEvidenceResult } from "./dto/requests/deleted-evidence-result.dto";

const POST_COLUMNS =
    "fp.id, fp.title, fp.description, fp.status_id," +
    "fp.is_fraud, fp.published_at, fp.category_id";
const DETAILED_POST_COLUMNS =
    "fp.id, fp.title, fp.description, fp.seller_name,"+
    "fp.product, fp.phone_number, fp.url, fp.platform,"+
    "fp.fraudulent_email, fp.status_id, fp.is_fraud,"+
    "fp.published_at, fp.category_id";

const USER_COLUMN = "u.username AS author";

const TEXT_COLUMNS =
    "fp.title, fp.seller_name, fp.product, fp.phone_number,"+
    "fp.url, fp.platform, fp.fraudulent_email";

const ADMIN_POST_DETAILED_COLUMNS = DETAILED_POST_COLUMNS + ", fp.is_anonymous, fp.deleted_at";

const EVIDENCE_COLUMNS =
    "e.id, e.owner_id, e.is_visible, e.storage_path,"+
    "e.created_at, e.evidence_type_id, e.post_id"

const POST_TYPE_COLUMNS = "pf.post_id, pf.fraud_type_id";

const CREATE_COLUMNS =
    "title, description, seller_name, product, phone_number, url," +
    "platform, fraudulent_email, status_id, is_anonymous,"+
    "author_id, category_id";

interface PostRow extends RowDataPacket {
    id: number;
    title: string | null;
    description: string | null;
    status_id: number | null;
    is_fraud: boolean | null;
    published_at: Date | null;
    category_id: number | null;
    author: string | null;
}

interface DetailedPostRow extends PostRow {
    seller_name: string | null;
    product: string | null;
    phone_number: string | null;
    url: string | null;
    platform: string | null;
    fraudulent_email: string | null;
    is_anonymous: boolean;
}

interface AdminPostRow extends DetailedPostRow {
    deleted_at: Date | null;
}

interface FraudTypeIdRow extends RowDataPacket {
    fraud_type_id: number;
}

interface EvidenceRow extends RowDataPacket {
    id: number;
    owner_id: string;
    is_visible: boolean;
    storage_path: string;
    created_at: Date;
    evidence_type_id: number;
    post_id: number | null;
}

interface TypeRow extends RowDataPacket {
    post_id: number;
    fraud_type_id: number;
}

interface CountRow extends RowDataPacket {
    total: number;
}

@Injectable()
export class PostRepository{
    constructor(@Inject(DB_POOL) private readonly pool: Pool) {}

    async findAll(
        query: DerivedFindPostsDto,
        status_condition: string,
    ): Promise<FindPostsResult> {
        const conditions: string[] = [
            status_condition
        ];
        const values: (number | string)[] = [];

        const page = query.page ?? 1;
        const offset = (page - 1) * PAGE_SIZE;

        let where = "";

        if(query.text !== undefined){
            conditions.push(`CONCAT_WS(" ", ${TEXT_COLUMNS}) LIKE ?`)
            values.push(`%${query.text}%`);
        }

        if(query.category !== undefined && query.category.length > 0){
            const placeholders = query.category.map(() => "?").join(", ");
            conditions.push("fp.category_id IN (" + placeholders + ")");
            values.push(...query.category);
        }

        if(query.type !== undefined && query.type.length > 0){
            const placeholders = query.type.map(() => "?").join(", ");
            conditions.push(
                `EXISTS (
                    SELECT 1
                    FROM post_fraud_type pf
                    WHERE pf.post_id = fp.id
                    AND pf.fraud_type_id IN (${placeholders})
                )`
            );
            values.push(...query.type);
        }
        if(query.status_id !== undefined && query.status_id.length > 0){
            const placeholders = query.status_id.map(() => "?").join(", ");
            conditions.push("fp.status_id IN (" + placeholders + ")");
            values.push(...query.status_id);
        }

        if(query.role_id !== undefined && query.role_id === USER_ROLE_ID){
            conditions.push("fp.deleted_at IS NULL");
        }

        let COLUMNS = POST_COLUMNS;
        if(query.role_id !== undefined && query.role_id === ADMIN_ROLE_ID){
            COLUMNS += ", " + USER_COLUMN;
        }

        if (query.user_id !== undefined) {
            conditions.push("fp.author_id = ?");
            values.push(query.user_id);
        }

        if(conditions.length > 0){
            where += ` WHERE ${conditions.join(" AND ")}`
        }

        const [countRows] = await this.pool.query<CountRow[]>(
            `
            SELECT COUNT(*) AS total
            FROM fraud_post fp
            ${where}
            `,
            values,
        );

        const total = countRows[0].total;

        const pageValues = [...values, PAGE_SIZE, offset];

        const [rows] = await this.pool.query<PostRow[]>(
            `SELECT ${COLUMNS}
            FROM fraud_post fp
            INNER JOIN user u ON u.id = fp.author_id
            ${where}
            ORDER BY fp.published_at DESC, fp.id DESC
            LIMIT ?
            OFFSET ?
            `,
            pageValues,
        );

        const postIds = rows.map(row => row.id);

        if (postIds.length === 0) {
            return {
                posts: [],
                total,
            };
        }

        const placeholders = postIds.map(() => "?").join(", ");

        const [typeRows] = await this.pool.query<TypeRow[]>(
            `
            SELECT ${POST_TYPE_COLUMNS}
            FROM post_fraud_type pf
            WHERE pf.post_id IN (${placeholders})
            `,
            postIds,
        );

        const typesByPost = new Map<number, number[]>();

        for (const row of typeRows) {
            const types = typesByPost.get(row.post_id) ?? [];
            types.push(row.fraud_type_id);
            typesByPost.set(row.post_id, types);
        }
        return {
            posts: rows.map(row =>
                this.toPostEntity(
                    row,
                    typesByPost.get(row.id) ?? []
                )
            ),
            total,
        };
    }

    async findAdminById(
        post_id: number
    ): Promise<PostEntity | null> {
        const [rows] = await this.pool.query<AdminPostRow[]>(
            `
            SELECT ${ADMIN_POST_DETAILED_COLUMNS}
            FROM fraud_post fp
            INNER JOIN user u ON u.id = fp.author_id
            WHERE fp.id = ?
            `,
            [post_id]
        );
        if(rows.length === 0){
            return null;
        }

         const [typeRows] = await this.pool.query<FraudTypeIdRow[]>(
            `
            SELECT fraud_type_id
            FROM post_fraud_type
            WHERE post_id = ?
            `,
            [post_id],
        );

        const [evidenceRows] = await this.pool.query<EvidenceRow[]>(
            `
            SELECT ${EVIDENCE_COLUMNS}
            FROM post_evidence e
            WHERE e.post_id = ?
            `,
            [post_id],
        );

        // const [reactionRows]
        // const [commentRows]
        // const [authorityRows]

        const post = this.toAdminPostEntity(rows[0]);
        post.types = typeRows.map(row => row.fraud_type_id);
        post.evidences = evidenceRows.map(row =>
            this.toEvidenceEntity(row)
        );
        return post;
    }

    async findVisibleToUser(
        post_id: number,
        user_id: string
    ): Promise<PostEntity | null> {
        const COLUMNS = DETAILED_POST_COLUMNS + ", fp.is_anonymous, " + USER_COLUMN;
        const [rows] = await this.pool.query<DetailedPostRow[]>(
            `
            SELECT ${COLUMNS}
            FROM fraud_post fp
            INNER JOIN user u ON u.id = fp.author_id
            WHERE fp.id = ?
            AND (
            fp.status_id IN (${PUBLISHED_STATUS_ID}, ${VALIDATED_STATUS_ID})
            OR (
            fp.status_id IN (${DRAFT_STATUS_ID}, ${REJECTED_STATUS_ID}, ${UPLOADED_STATUS_ID})
            AND fp.author_id = ?))
            AND fp.deleted_at IS NULL
            `,
            [post_id, user_id]
        );
        if(rows.length === 0){
            return null;
        }

         const [typeRows] = await this.pool.query<FraudTypeIdRow[]>(
            `
            SELECT fraud_type_id
            FROM post_fraud_type
            WHERE post_id = ?
            `,
            [post_id],
        );

        const [evidenceRows] = await this.pool.query<EvidenceRow[]>(
            `
            SELECT ${EVIDENCE_COLUMNS}
            FROM post_evidence e
            WHERE e.post_id = ?
            AND e.is_visible = true
            `,
            [post_id],
        );

        // const [reactionRows]
        // const [commentRows]
        // const [authorityRows]

        const post = this.toDetailedPostEntity(rows[0]);
        if(post.is_anonymous){
            post.author = null;
        }

        post.types = typeRows.map(row => row.fraud_type_id);
        post.evidences = evidenceRows.map(row =>
            this.toEvidenceEntity(row)
        );
        return post;
    }

    async create(
        dto: CreatePostDto,
        user_id: string
    ): Promise<PostEntity>{

        const connection = await this.pool.getConnection();

        try{
            await connection.beginTransaction();
            const [result] = await connection.execute<ResultSetHeader>(
                `INSERT INTO fraud_post (${CREATE_COLUMNS})
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    dto.title ?? null,
                    dto.description ?? null,
                    dto.seller_name ?? null,
                    dto.product ?? null,
                    dto.phone_number ?? null,
                    dto.url ?? null,
                    dto.platform ?? null,
                    dto.fraudulent_email ?? null,
                    dto.status_id,
                    dto.is_anonymous ?? false,
                    user_id,
                    dto.category ?? null,
                ]
            );
            const post_id = result.insertId;

            if (dto.types !== undefined && dto.types.length > 0) {
                const values = dto.types.map(type_id => [
                    post_id,
                    type_id,
                ]);

                await connection.query(
                    `
                    INSERT INTO post_fraud_type (
                        post_id,
                        fraud_type_id
                    )
                    VALUES ?
                    `,
                    [values]
                );
            }
            if (dto.evidences !== undefined && dto.evidences.length > 0) {
                const [evidences] = await connection.query<RowDataPacket[]>(
                    `
                    SELECT id
                    FROM post_evidence
                    WHERE owner_id = ?
                    AND post_id IS NULL
                    AND id IN (?)
                    `,
                    [user_id, dto.evidences]
                )

                const found_ids = new Set(
                    evidences.map(evidence => evidence.id),
                );

                const invalid_ids = dto.evidences.filter(
                    evidence_id => !found_ids.has(evidence_id),
                );

                if (invalid_ids.length > 0) {
                    throw new ForbiddenException(
                        `Las evidencias [${invalid_ids.join(", ")}] no existen o no pertenecen al usuario.`,
                    );
                }


                await connection.query(
                    `
                    UPDATE post_evidence
                    SET post_id = ?, expires_at = null
                    WHERE id IN (?)
                    AND post_id IS NULL
                    AND owner_id = ?
                    `,
                    [post_id, dto.evidences, user_id],
                );
            }
            await connection.commit();
            const post = await this.findAdminById(post_id);
            if(post === null){
               throw new Error("La publicación creada no pudo recuperarse.")
            }

            return post;
        } catch(error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    async updatePost(
        post_id: number,
        dto: UpdatePostDto,
        user_id: string,
        user_role: number
    ): Promise<PostEntity | null> {
        const connection = await this.pool.getConnection();

        try {
            await connection.beginTransaction();

            const fields: string[] = [];
            const values: (boolean | string | number) [] = [];

            if (dto.title !== undefined) {
                fields.push("title = ?");
                values.push(dto.title);
            }

            if (dto.description !== undefined) {
                fields.push("description = ?");
                values.push(dto.description);
            }

            if (dto.seller_name !== undefined) {
                fields.push("seller_name = ?");
                values.push(dto.seller_name);
            }

            if (dto.product !== undefined) {
                fields.push("product = ?");
                values.push(dto.product);
            }

            if (dto.phone_number !== undefined) {
                fields.push("phone_number = ?");
                values.push(dto.phone_number);
            }

            if (dto.url !== undefined) {
                fields.push("url = ?");
                values.push(dto.url);
            }

            if (dto.platform !== undefined) {
                fields.push("platform = ?");
                values.push(dto.platform);
            }

            if (dto.fraudulent_email !== undefined) {
                fields.push("fraudulent_email = ?");
                values.push(dto.fraudulent_email);
            }

            if (dto.status_id !== undefined) {
                fields.push("status_id = ?");
                values.push(dto.status_id);
            }

            if (dto.is_fraud !== undefined) {
                fields.push("is_fraud = ?");
                values.push(dto.is_fraud);
            }

            if (dto.is_anonymous !== undefined) {
                fields.push("is_anonymous = ?");
                values.push(dto.is_anonymous);
            }

            if (dto.category !== undefined) {
                fields.push("category_id = ?");
                values.push(dto.category);
            }

            if (fields.length > 0) {
                values.push(post_id);

                await connection.execute(
                    `
                    UPDATE fraud_post
                    SET ${fields.join(", ")}
                    WHERE id = ?`,
                    values
                );
            }

            if (dto.types !== undefined) {
                if (dto.types.length > 0) {
                    const placeholders = dto.types.map(() => "?").join(", ");

                    const [rows] = await connection.execute<RowDataPacket[]>(
                        `
                        SELECT id
                        FROM fraud_type
                        WHERE id IN (${placeholders})
                        `,
                        dto.types
                    );

                    if (rows.length !== dto.types.length) {
                        throw new BadRequestException(
                            "Una o más categorías de fraude no existen."
                        );
                    }
                }

                await connection.execute(
                    `
                    DELETE FROM post_fraud_type
                    WHERE post_id = ?
                    `,
                    [post_id]
                );

                if (dto.types.length > 0) {
                    const values = dto.types.flatMap((type_id) => [
                        post_id,
                        type_id,
                    ]);

                    const placeholders = dto.types
                        .map(() => "(?, ?)")
                        .join(", ");

                    await connection.execute(
                        `INSERT INTO post_fraud_type (post_id, fraud_type_id)
                        VALUES ${placeholders}`,
                        values
                    );
                }
            }

            if (dto.evidences !== undefined) {
                if (dto.evidences.length > 0) {
                    const placeholders = dto.evidences
                        .map(() => "?")
                        .join(", ");

                    const queryValues:  (boolean | string | number)[] = [
                        ...dto.evidences,
                        post_id,
                    ];

                    let ownerCondition = "";

                    if (user_role === USER_ROLE_ID) {
                        ownerCondition = "AND owner_id = ?";
                        queryValues.push(user_id);
                    }

                    const [rows] = await connection.execute<RowDataPacket[]>(
                        `
                        SELECT COUNT(*) AS valid_count
                        FROM post_evidence
                        WHERE id IN (${placeholders})
                        AND deleted_at IS NULL
                        AND (
                            post_id IS NULL
                            OR post_id = ?
                        )
                        ${ownerCondition}
                        `,
                        queryValues
                    );

                    if (Number(rows[0].valid_count) !== dto.evidences.length) {
                        throw new BadRequestException(
                            "Una o más evidencias no son válidas para asociarse a la publicación."
                        );
                    }
                }

                await connection.execute(
                    `
                    UPDATE post_evidence
                    SET post_id = NULL
                    WHERE post_id = ?
                    `,
                    [post_id]
                );

                if (dto.evidences.length > 0) {
                    const placeholders = dto.evidences
                        .map(() => "?")
                        .join(", ");

                    await connection.execute(
                        `
                        UPDATE post_evidence
                        SET post_id = ?
                        WHERE id IN (${placeholders})
                        `,
                        [
                            post_id,
                            ...dto.evidences,
                        ]
                    );
                }
            }

            const [rows] = await connection.execute<AdminPostRow[]>(
                `SELECT ${ADMIN_POST_DETAILED_COLUMNS},
                        ${USER_COLUMN}
                FROM fraud_post fp
                JOIN user u
                    ON u.id = fp.author_id
                WHERE fp.id = ?`,
                [post_id]
            );

            if (rows.length === 0) {
                await connection.rollback();
                return null;
            }

            const post = this.toAdminPostEntity(rows[0]);

            await connection.commit();

            return post;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    async deleteByAdmin(
        post_id: number
    ): Promise<DeletedPostResult | null> {
        const [evidenceRows] = await this.pool.query<EvidenceRow[]>(
            `
            SELECT ${EVIDENCE_COLUMNS}
            FROM post_evidence e
            INNER JOIN fraud_post fp
            ON fp.id = e.post_id
            WHERE fp.id = ?
            AND fp.status_id IN (
                ${UPLOADED_STATUS_ID},
                ${PUBLISHED_STATUS_ID},
                ${VALIDATED_STATUS_ID},
                ${REJECTED_STATUS_ID}
            )
            `,
            [post_id]
        )

        const [postRows] = await this.pool.query<PostRow[]>(
            `
            SELECT ${POST_COLUMNS}
            FROM fraud_post fp
            WHERE fp.id = ?
            AND fp.status_id IN (
                ${UPLOADED_STATUS_ID},
                ${PUBLISHED_STATUS_ID},
                ${VALIDATED_STATUS_ID},
                ${REJECTED_STATUS_ID}
            )
            AND fp.deleted_at IS NULL
            `,
            [post_id],
        );
        if(postRows.length === 0){
            return null;
        }
        await this.pool.query(
            `
            UPDATE fraud_post fp
            SET fp.deleted_at = NOW()
            WHERE id = ?
            `,
            [post_id],
        )
         await this.pool.query(
            `
            DELETE FROM post_evidence e
            WHERE e.post_id = ?
            `,
            [post_id],
        )
        return {
            evidence_paths: evidenceRows.map(row => row.storage_path)
        };
    }

    async deleteByUser(
        post_id: number,
        user_id: string
    ): Promise<DeletedPostResult | null>{
        const [rows] = await this.pool.query<PostRow[]>(
            `
            SELECT ${POST_COLUMNS}
            FROM fraud_post fp
            WHERE fp.id = ?
            AND fp.author_id = ?
            AND fp.status_id IN (
            ${DRAFT_STATUS_ID},
            ${UPLOADED_STATUS_ID},
            ${PUBLISHED_STATUS_ID},
            ${VALIDATED_STATUS_ID}
            )
            AND fp.deleted_at IS NULL
            `,
            [post_id, user_id],
        );
        if(rows.length === 0){
            return null;
        }

        if(rows[0].status_id !== DRAFT_STATUS_ID){
            return await this.deleteByAdmin(post_id)
        }

        const [evidenceRows] = await this.pool.query<EvidenceRow[]>(
            `
            SELECT ${EVIDENCE_COLUMNS}
            FROM post_evidence e
            INNER JOIN fraud_post fp
            ON fp.id = e.post_id
            WHERE fp.id = ?
            AND fp.status_id IN (
                ${DRAFT_STATUS_ID}
            )
            `,
            [post_id]
        )

        await this.pool.query(
            `
            DELETE FROM fraud_post fp
            WHERE id IN (?)
            `,
            [post_id],
        )

        await this.pool.query(
            `
            DELETE FROM post_evidence e
            WHERE e.post_id IN (?)
            `,
            [post_id],
        )

        return {
            evidence_paths: evidenceRows.map(row => row.storage_path)
        };
    }

    async updatePostEvidence(
        post_id: number,
        evidence_id: number,
        is_visible: boolean
    ): Promise<EvidenceEntity | null>{
        const [rows] = await this.pool.query<EvidenceRow[]>(
            `
            SELECT ${EVIDENCE_COLUMNS}
            FROM post_evidence e
            INNER JOIN fraud_post fp
            ON e.post_id = fp.id
            WHERE e.id = ?
            AND e.post_id = ?
            AND fp.status_id IN (${UPLOADED_STATUS_ID}, ${PUBLISHED_STATUS_ID}, ${VALIDATED_STATUS_ID})
            `,
            [evidence_id, post_id],
        );
        if(rows.length === 0){
            throw new NotFoundException("La evidencia no existe o su acceso no está permitido todavía.")
        }
        await this.pool.execute<ResultSetHeader>(
            `
            UPDATE post_evidence e
            SET e.is_visible = ?
            WHERE id IN (?)
            `,
            [is_visible, evidence_id],
        )
        rows[0].is_visible = is_visible;
        return this.toEvidenceEntity(rows[0]);
    }

    async deleteEvidenceByAdmin(
        post_id: number,
        evidence_id: number
    ): Promise<DeletedEvidenceResult | null> {
       const [rows] = await this.pool.query<EvidenceRow[]>(
            `
            SELECT ${EVIDENCE_COLUMNS}
            FROM post_evidence e
            INNER JOIN fraud_post fp
            ON fp.id = e.post_id
            WHERE e.id = ?
            AND e.post_id = ?
            AND fp.status_id IN (
                ${UPLOADED_STATUS_ID},
                ${PUBLISHED_STATUS_ID},
                ${VALIDATED_STATUS_ID},
                ${REJECTED_STATUS_ID}
            )`,
            [evidence_id, post_id],
        );
        if(rows.length === 0){
            return null;
        }
        await this.pool.query(
            `
            DELETE FROM post_evidence e
            WHERE id = ?
            `,
            [evidence_id],
        )
        return {
            storage_path: rows[0].storage_path,
        };
    }

    async deleteEvidenceByUser(
        post_id: number,
        evidence_id: number,
        user_id: string
    ): Promise<DeletedEvidenceResult | null>{
        const [rows] = await this.pool.query<EvidenceRow[]>(
            `
            SELECT ${EVIDENCE_COLUMNS}
            FROM post_evidence e
            INNER JOIN fraud_post fp
            ON fp.id = e.post_id
            WHERE e.id = ?
            AND e.post_id = ?
            AND fp.author_id = ?
            AND fp.status_id IN (${DRAFT_STATUS_ID})
            `,
            [evidence_id, post_id, user_id]
        );
        if(rows.length === 0){
            return null;
        }

        await this.pool.query(
            `
            DELETE FROM post_evidence e
            WHERE id IN (?)
            `,
            [evidence_id],
        )
        return {
            storage_path: rows[0].storage_path
        }
    }

    private toPostEntity(
        row: PostRow,
        types: number[] = []
    ): PostEntity {
        const post = new PostEntity();

        post.id = row.id;
        post.title = row.title;
        post.description = row.description;
        post.status_id = row.status_id!;
        post.is_fraud = row.is_fraud;
        post.published_at = row.published_at;
        post.category_id = row.category_id;
        post.author = row.author;
        post.types = types;
        return post;
    }

    private toDetailedPostEntity(row: DetailedPostRow): PostEntity {
        const post = new PostEntity();

        post.id = row.id;
        post.title = row.title;
        post.description = row.description;
        post.status_id = row.status_id!;
        post.is_fraud = row.is_fraud;
        post.published_at = row.published_at;
        post.category_id = row.category_id;
        post.author = row.author;
        post.seller_name = row.seller_name;
        post.product = row.product;
        post.phone_number = row.phone_number;
        post.url = row.url;
        post.platform = row.platform;
        post.fraudulent_email = row.fraudulent_email;
        return post;
    }

    private toAdminPostEntity(row: AdminPostRow): PostEntity {
        const post = new PostEntity();

        post.id = row.id;
        post.title = row.title;
        post.description = row.description;
        post.status_id = row.status_id!;
        post.is_fraud = row.is_fraud;
        post.published_at = row.published_at;
        post.category_id = row.category_id;
        post.author = row.author!;
        post.seller_name = row.seller_name;
        post.product = row.product;
        post.phone_number = row.phone_number;
        post.url = row.url;
        post.platform = row.platform;
        post.fraudulent_email = row.fraudulent_email;
        post.is_anonymous = row.is_anonymous;
        post.deleted_at = row.deleted_at;
        return post;
    }

    private toEvidenceEntity(row: EvidenceRow): EvidenceEntity {
            const entity = new EvidenceEntity();

            entity.id = row.id;
            entity.owner_id = row.owner_id;
            entity.is_visible = row.is_visible;
            entity.storage_path = row.storage_path;
            entity.created_at = row.created_at;
            entity.evidence_type_id = row.evidence_type_id;
            entity.post_id = row.post_id;

            return entity;
        }
}
