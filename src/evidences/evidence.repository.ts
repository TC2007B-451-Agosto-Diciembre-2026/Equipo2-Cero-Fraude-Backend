import { Inject, Injectable } from "@nestjs/common";
import { DB_POOL } from "../database/database.module";
import { ResultSetHeader, RowDataPacket, type Pool } from "mysql2/promise";
import { Evidence } from "./entities/evidence.entity";

interface EvidenceRow extends RowDataPacket {
    id: number;
    owner_id: string;
    is_visible: boolean;
    storage_path: string;
    created_at: Date;
    expires_at: Date | null;
    deleted_at: Date | null;
    evidence_type_id: number;
    post_id: number | null;
}

const COLUMNS =
"id, owner_id, is_visible, storage_path, created_at, expires_at, deleted_at, evidence_type_id, post_id";

@Injectable()
export class EvidenceRepository {
    constructor(@Inject(DB_POOL) private readonly pool: Pool) {}

    async create(
        owner_id: string,
        storage_path: string,
        evidence_type_id: number,
        expires_at: Date
    ): Promise<Evidence> {
        const [result] = await this.pool.execute<ResultSetHeader>(
            `
            INSERT INTO post_evidence (
                owner_id,
                storage_path,
                evidence_type_id,
                expires_at
            )
            VALUES(?, ?, ?, ?)
            `,
            [owner_id, storage_path, evidence_type_id, expires_at]
        );
        const evidence = await this.findById(result.insertId);

        if(!evidence) {
            throw new Error("Evidence was created but could not be retrieved.")
        }

        return evidence;
    }

    async findById(
        id: number
    ): Promise<Evidence | null> {
        const [rows] = await this.pool.execute<EvidenceRow[]>(
            `
            SELECT ${COLUMNS}
            FROM post_evidence
            WHERE id = ?
            AND deleted_at IS NULL
            `,
            [id],
        );

        return rows.length > 0 ? this.toEntity(rows[0]) : null;
    }

    async findByIdAndOwnerId(
        id: number,
        owner_id: string
    ): Promise <Evidence | null> {
        const [rows] = await this.pool.execute<EvidenceRow[]>(
            `
            SELECT ${COLUMNS}
            FROM post_evidence
            WHERE id = ?
            AND owner_id = ?
            AND deleted_at IS NULL
            `,
            [id, owner_id],
        );

        return rows.length > 0 ? this.toEntity(rows[0]) : null;
    }

    async associateWithPost(
        id: number,
        post_id: number
    ): Promise<Evidence | null>{
        const [result] = await this.pool.execute<ResultSetHeader>(
            `
            UPDATE post_evidence
            SET
            post_id = ?,
            WHERE id = ?
            AND post_id IS NULL
            AND deleted_at IS NULL
            `,
            [post_id, id]
        );
        if(result.affectedRows === 0){
            return null;
        }
        return this.findById(id);
    }

    async updateById(
        id: number,
        post_id: number,
        is_visible: boolean
    ): Promise<Evidence | null> {
        const [result] = await this.pool.execute<ResultSetHeader>(
            `
            UPDATE post_evidence
            SET
            is_visible = ?
            WHERE id = ?
            AND post_id = ?
            AND deleted_at IS NULL
            `,
            [is_visible, id, post_id]
        );

        if(result.affectedRows === 0){
            return null;
        }
        return this.findById(id);
    }

    async delete(
        id: number
    ): Promise<boolean> {
        const [result] = await this.pool.execute<ResultSetHeader>(
            `
            UPDATE post_evidence
            SET deleted_at = CURRENT_TIMESTAMP
            WHERE id = ?
            AND deleted_at IS NULL
            `,
            [id]
        );

        return result.affectedRows > 0;
    }

    private toEntity(row: EvidenceRow): Evidence {
        const entity = new Evidence();

        entity.id = row.id;
        entity.owner_id = row.owner_id;
        entity.is_visible = row.is_visible;
        entity.storage_path = row.storage_path;
        entity.created_at = row.created_at;
        entity.expires_at = row.expires_at;
        entity.deleted_at = row.deleted_at;
        entity.evidence_type_id = row.evidence_type_id;
        entity.post_id = row.post_id;

        return entity;
    }
}
