import { Inject, Injectable } from "@nestjs/common";
import type { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { DB_POOL } from "../database/database.module";
import { DRAFT_STATUS_ID, PAGE_SIZE, PUBLISHED_STATUS_ID, REJECTED_STATUS_ID, UPLOADED_STATUS_ID, VALIDATED_STATUS_ID } from "../common/constants";
import { FindPostsDto } from "./dto/requests/find-posts.dto";
import { FindPostsResult } from "./dto/responses/find-posts-result.dto";
import { CreatePostDto } from "./dto/requests/create-post.dto";
import { PostEntity } from "./entities/post.entity";

const POST_COLUMNS =
    "fp.id, fp.title, fp.description, fp.status_id," +
    "fp.is_fraud, fp.published_at, fp.category_id," +
    "u.username AS author";
const DETAILED_POST_COLUMNS =
    "fp.id, fp.title, fp.description, fp.seller_name,"+
    "fp.product, fp.phone_number, fp.url, fp.platform,"+
    "fp.fraudulent_email, fp.status_id, fp.is_fraud,"+
    "fp.published_at, fp.category_id," +
    "u.username AS author";

const ADMIN_POST_DETAILED_COLUMNS = DETAILED_POST_COLUMNS + ", fp.is_anonymous, fp.deleted_at";

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
    author: string;
}

interface DetailedPostRow extends PostRow {
    seller_name: string | null;
    product: string | null;
    phone_number: string | null;
    url: string | null;
    platform: string | null;
    fraudulent_email: string | null;
}

interface AdminPostRow extends DetailedPostRow {
    is_anonymous: boolean;
    deleted_at: Date | null;
}

interface FraudTypeIdRow extends RowDataPacket {
    fraud_type_id: number;
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
        query: FindPostsDto,
        status_condition: string,
        user_id?: string
    ): Promise<FindPostsResult> {
        const conditions: string[] = [
            status_condition
        ];
        const values: (number | string)[] = [];

        const page = query.page ?? 1;
        const offset = (page - 1) * PAGE_SIZE;

        let where = "";

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

        if (user_id !== undefined) {
            conditions.push("fp.author_id = ?");
            values.push(user_id);
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
            `SELECT ${POST_COLUMNS}
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

        /*const [evidenceRows] = await this.pool.query<EvidenceRow[]>(
            `
            SELECT
                e.id,
                e.url,
                e.evidence_type
            FROM post_evidence pe
            INNER JOIN evidence e ON e.id = pe.evidence_id
            WHERE pe.post_id = ?
            `,
            [post_id],
        );*/

        const post = this.toAdminPostEntity(rows[0]);
        post.types = typeRows.map(row => row.fraud_type_id);

        return post;
    }

    async findVisibleToUser(
        post_id: number,
        user_id: string
    ): Promise<PostEntity | null> {
        const [rows] = await this.pool.query<DetailedPostRow[]>(
            `
            SELECT ${DETAILED_POST_COLUMNS}
            FROM fraud_post fp
            INNER JOIN user u ON u.id = fp.author_id
            WHERE fp.id = ?
            AND (
            fp.status_id IN (${PUBLISHED_STATUS_ID}, ${VALIDATED_STATUS_ID})
            OR (
            fp.status_id IN (${DRAFT_STATUS_ID}, ${REJECTED_STATUS_ID}, ${UPLOADED_STATUS_ID})
            AND fp.author_id = ?))
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

        /*const [evidenceRows] = await this.pool.query<EvidenceRow[]>(
            `
            SELECT
                e.id,
                e.url,
                e.evidence_type
            FROM post_evidence pe
            INNER JOIN evidence e ON e.id = pe.evidence_id
            WHERE pe.post_id = ?
            `,
            [post_id],
        );*/

        const post = this.toDetailedPostEntity(rows[0]);
        post.types = typeRows.map(row => row.fraud_type_id);

        return post;
    }

    async create(
        dto: CreatePostDto,
        user_id: string
    ): Promise<PostEntity>{
        const [result] = await this.pool.execute<ResultSetHeader>(
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

            await this.pool.query(
                `
                INSERT INTO post_fraud_type (
                    post_id,
                    fraud_type_id
                )
                VALUES ?
                `,
                [values],
            );
        }
        /*if (dto.evidences !== undefined && dto.evidences.length > 0) {
            const values = dto.evidences.map(evidence_id => [
                post_id,
                evidence_id,
            ]);

            await this.pool.query(
                `
                INSERT INTO post_evidence (
                    post_id,
                    evidence_id
                )
                VALUES ?
                `,
                [values],
            );
        }*/

        const post = await this.findAdminById(post_id);
        if(post === null){
            throw new Error("La publicación creada no pudo recuperarse.")
        }
        return post;
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
        post.author = row.author!;
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
        post.author = row.author!;
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
}
