import { Inject, Injectable } from "@nestjs/common";
import type { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { DB_POOL } from "../database/database.module";
import { ReportEntity } from "./entities/report.entity";
import { PUBLISHED_STATUS_ID, VALIDATED_STATUS_ID } from "../common/constants";

const COLUMNS =
    "id, details, created_at, report_reason_id, reporter_id, post_id";

interface ReportRow extends RowDataPacket {
    id: number;
    details: string | null;
    created_at: Date;
    report_reason_id: number;
    reporter_id: string;
    post_id: number;
}

interface PostAuthorRow extends RowDataPacket {
    author_id: string;
}

interface IdRow extends RowDataPacket {
    id: number;
}

@Injectable()
export class ReportRepository {
    constructor(@Inject(DB_POOL) private readonly pool: Pool) {}

    async findPostForReport(
        post_id: number,
    ): Promise<{ author_id: string } | null> {
        const [rows] = await this.pool.query<PostAuthorRow[]>(
            `
            SELECT author_id
            FROM fraud_post
            WHERE id = ?
            AND status_id IN (${PUBLISHED_STATUS_ID}, ${VALIDATED_STATUS_ID})
            AND deleted_at IS NULL
            `,
            [post_id],
        );

        return rows.length > 0 ? { author_id: rows[0].author_id } : null;
    }

    async reportReasonExists(report_reason_id: number): Promise<boolean> {
        const [rows] = await this.pool.query<IdRow[]>(
            `
            SELECT id
            FROM report_reason
            WHERE id = ?
            `,
            [report_reason_id],
        );

        return rows.length > 0;
    }

    async create(
        details: string | null,
        report_reason_id: number,
        reporter_id: string,
        post_id: number,
    ): Promise<ReportEntity> {
        const [result] = await this.pool.execute<ResultSetHeader>(
            `
            INSERT INTO post_report (details, report_reason_id, reporter_id, post_id)
            VALUES (?, ?, ?, ?)
            `,
            [details, report_reason_id, reporter_id, post_id],
        );

        const report = await this.findById(result.insertId);

        return report!;
    }

    async findById(id: number): Promise<ReportEntity | null> {
        const [rows] = await this.pool.query<ReportRow[]>(
            `
            SELECT ${COLUMNS}
            FROM post_report
            WHERE id = ?
            `,
            [id],
        );

        return rows.length > 0 ? toEntity(rows[0]) : null;
    }
}

function toEntity(row: ReportRow): ReportEntity {
    const report = new ReportEntity();
    report.id = row.id;
    report.details = row.details;
    report.created_at = row.created_at;
    report.report_reason_id = row.report_reason_id;
    report.reporter_id = row.reporter_id;
    report.post_id = row.post_id;

    return report;
}
