import { Inject, Injectable } from "@nestjs/common";
import { DB_POOL } from "../database/database.module";
import { ResultSetHeader, RowDataPacket, type Pool } from "mysql2/promise";
import { EvidenceEntity } from "./entities/evidence.entity";

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

const COLUMNS = "id, owner_id, is_visible, storage_path, created_at, expires_at, deleted_at, evidence_type_id, post_id";

@Injectable()
export class EvidenceRepository {
    constructor(@Inject(DB_POOL) private readonly pool: Pool) {}

    async create(
        owner_id: string,
        storage_path: string,
        evidence_type_id: number,
        expires_at: Date
    ): Promise<EvidenceEntity> {
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
            throw new Error("La evidencia fue creada pero no pudo obtenerse.")
        }

        return evidence;
    }

    async findById(
        id: number
    ): Promise<EvidenceEntity | null> {
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

    private toEntity(row: EvidenceRow): EvidenceEntity {
        const entity = new EvidenceEntity();

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
