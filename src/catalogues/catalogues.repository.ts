import { Inject, Injectable } from "@nestjs/common";

import { UserRoleEntity } from "./entities/user-role.entity";
import { ReactionTypeEntity } from "./entities/reaction-type.entity";
import { PostStatusEntity } from "./entities/post-status.entity";
import { FraudCategoryEntity } from "./entities/fraud-category.entity";
import { AuditActionEntity } from "./entities/audit-action.entity";
import { ReportReasonEntity } from "./entities/report-reason.entity";
import { FraudTypeEntity } from "./entities/fraud-type.entity";
import { ModifiedFieldEntity } from "./entities/modified-field.entity";
import { EvidenceTypeEntity } from "./entities/evidence-type.entity";
import { AuthorityEntity } from "./entities/authority.entity";

import { CreateReactionTypeDto } from "./dto/requests/create-reaction-type.dto";
import { CreateFraudCategoryDto } from "./dto/requests/create-fraud-category.dto";
import { CreateReportReasonDto } from "./dto/requests/create-report-reason.dto";
import { CreateFraudTypeDto } from "./dto/requests/create-fraud-type.dto";
import { CreateEvidenceTypeDto } from "./dto/requests/create-evidence-type.dto";
import { CreateAuthorityDto } from "./dto/requests/create-authority.dto";
import { UpdateAuthorityDto } from "./dto/requests/update-authority.dto";

import type { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { DB_POOL } from "../database/database.module";

const STANDARD_COLUMNS = "id, name, code";
const EVIDENCE_TYPE_COLUMNS = "id, name";
const AUTHORITY_COLUMNS = "id, name, code, description";

interface CatalogueRow extends RowDataPacket {
    id: number;
    name: string;
    code: string;
}

interface EvidenceTypeRow extends RowDataPacket {
    id: number;
    name: string;
}

interface AuthorityRow extends RowDataPacket {
    id: number;
    name: string;
    code: string;
    description: string;
}

@Injectable()
export class CatalogueRepository {
    constructor(@Inject(DB_POOL) private readonly pool: Pool) {}

    async findRoles(): Promise<UserRoleEntity[]> {
        const [rows] = await this.pool.query<CatalogueRow[]>(
            `SELECT ${STANDARD_COLUMNS}
            FROM user_role`,
        );
        return rows.map(row => this.toUserRoleEntity(row));
    }

    async findReactions(): Promise<ReactionTypeEntity[]> {
        const [rows] = await this.pool.query<CatalogueRow[]>(
            `SELECT ${STANDARD_COLUMNS}
            FROM reaction_type`,
        );
        return rows.map(row => this.toReactionTypeEntity(row));
    }

    async createReaction(
        dto: CreateReactionTypeDto,
    ): Promise<ReactionTypeEntity> {
        const [result] = await this.pool.execute<ResultSetHeader>(
            `INSERT INTO reaction_type (name, code)
            VALUES (?, ?)`,
            [dto.name, dto.code]
        );

        const [rows] = await this.pool.query<CatalogueRow[]>(
            `SELECT ${STANDARD_COLUMNS}
            FROM reaction_type
            WHERE id = ?`,
            [result.insertId],
        );

        return this.toReactionTypeEntity(rows[0]);
    }

    async findStates(): Promise<PostStatusEntity[]> {
        const [rows] = await this.pool.query<CatalogueRow[]>(
            `SELECT ${STANDARD_COLUMNS}
            FROM post_status`,
        );
        return rows.map(row => this.toPostStatusEntity(row));
    }

    async findCategories(): Promise<FraudCategoryEntity[]> {
        const [rows] = await this.pool.query<CatalogueRow[]>(
            `SELECT ${STANDARD_COLUMNS}
            FROM fraud_category`,
        );
        return rows.map(row => this.toFraudCategoryEntity(row));
    }

    async createCategory(
        dto: CreateFraudCategoryDto,
    ): Promise<FraudCategoryEntity> {
        const [result] = await this.pool.execute<ResultSetHeader>(
            `INSERT INTO fraud_category (name, code)
            VALUES (?, ?)`,
            [dto.name, dto.code]
        );

        const [rows] = await this.pool.query<CatalogueRow[]>(
            `SELECT ${STANDARD_COLUMNS}
            FROM fraud_category
            WHERE id = ?`,
            [result.insertId],
        );

        return this.toFraudCategoryEntity(rows[0]);
    }

    async findAuditActions(): Promise<AuditActionEntity[]> {
        const [rows] = await this.pool.query<CatalogueRow[]>(
            `SELECT ${STANDARD_COLUMNS}
            FROM audit_action`,
        );
        return rows.map(row => this.toAuditActionEntity(row));
    }

    async findReportReasons(): Promise<ReportReasonEntity[]> {
        const [rows] = await this.pool.query<CatalogueRow[]>(
            `SELECT ${STANDARD_COLUMNS}
            FROM report_reason`,
        );
        return rows.map(row => this.toReportReasonEntity(row));
    }

    async createReportReason(
        dto: CreateReportReasonDto,
    ): Promise<ReportReasonEntity> {
        const [result] = await this.pool.execute<ResultSetHeader>(
            `INSERT INTO report_reason (name, code)
            VALUES (?, ?)`,
            [dto.name, dto.code]
        );

        const [rows] = await this.pool.query<CatalogueRow[]>(
            `SELECT ${STANDARD_COLUMNS}
            FROM report_reason
            WHERE id = ?`,
            [result.insertId],
        );

        return this.toReportReasonEntity(rows[0]);
    }

    async findTypes(): Promise<FraudTypeEntity[]> {
        const [rows] = await this.pool.query<CatalogueRow[]>(
            `SELECT ${STANDARD_COLUMNS}
            FROM fraud_type`,
        );
        return rows.map(row => this.toFraudTypeEntity(row));
    }

    async createType(
        dto: CreateFraudTypeDto,
    ): Promise<FraudTypeEntity> {
        const [result] = await this.pool.execute<ResultSetHeader>(
            `INSERT INTO fraud_type (name, code)
            VALUES (?, ?)`,
            [dto.name, dto.code]
        );

        const [rows] = await this.pool.query<CatalogueRow[]>(
            `SELECT ${STANDARD_COLUMNS}
            FROM fraud_type
            WHERE id = ?`,
            [result.insertId],
        );

        return this.toFraudTypeEntity(rows[0]);
    }

    async findModifiedFields(): Promise<ModifiedFieldEntity[]> {
        const [rows] = await this.pool.query<CatalogueRow[]>(
            `SELECT ${STANDARD_COLUMNS}
            FROM modified_field`,
        );
        return rows.map(row => this.toModifiedFieldEntity(row));
    }

    async findEvidenceTypes(): Promise<EvidenceTypeEntity[]> {
        const [rows] = await this.pool.query<EvidenceTypeRow[]>(
            `SELECT ${EVIDENCE_TYPE_COLUMNS}
            FROM evidence_type`,
        );
        return rows.map(row => this.toEvidenceTypeEntity(row));
    }

    async createEvidenceType(
        dto: CreateEvidenceTypeDto,
    ): Promise<EvidenceTypeEntity> {
        const [result] = await this.pool.execute<ResultSetHeader>(
            `INSERT INTO evidence_type (name)
            VALUES (?)`,
            [dto.name]
        );

        const [rows] = await this.pool.query<CatalogueRow[]>(
            `SELECT ${EVIDENCE_TYPE_COLUMNS}
            FROM evidence_type
            WHERE id = ?`,
            [result.insertId],
        );

        return this.toEvidenceTypeEntity(rows[0]);
    }

    async findAuthorities(): Promise<AuthorityEntity[]> {
        const [rows] = await this.pool.query<AuthorityRow[]>(
            `SELECT ${AUTHORITY_COLUMNS}
            FROM authority`,
        );
        return rows.map(row => this.toAuthorityEntity(row));
    }

    async createAuthority(
        dto: CreateAuthorityDto,
    ): Promise<AuthorityEntity> {
        const [result] = await this.pool.execute<ResultSetHeader>(
            `INSERT INTO authority (name, code, description)
            VALUES (?, ?, ?)`,
            [dto.name, dto.code, dto.description]
        );

        const [rows] = await this.pool.query<AuthorityRow[]>(
            `SELECT ${AUTHORITY_COLUMNS}
            FROM authority
            WHERE id = ?`,
            [result.insertId],
        );

        return this.toAuthorityEntity(rows[0]);
    }

    async updateAuthority(
        id: number,
        dto: UpdateAuthorityDto,
    ): Promise<AuthorityEntity | null> {
        const fields: string[] = [];
        const values: (string | number)[] = [];

        if (dto.name !== undefined) {
            fields.push("name = ?");
            values.push(dto.name);
        }

        if (dto.description !== undefined) {
            fields.push("description = ?");
            values.push(dto.description);
        }

        values.push(id);

        await this.pool.execute(
            `UPDATE authority
            SET ${fields.join(", ")}
            WHERE id = ?`,
            values,
        );

        const [rows] = await this.pool.query<AuthorityRow[]>(
            `SELECT ${AUTHORITY_COLUMNS}
            FROM authority
            WHERE id = ?`,
            [id],
        );

        if (rows.length === 0) {
            return null;
        }

        return this.toAuthorityEntity(rows[0]);
    }


    private toUserRoleEntity(row: CatalogueRow): UserRoleEntity {
        const entity = new UserRoleEntity();

        entity.id = row.id;
        entity.name = row.name;
        entity.code = row.code;

        return entity;
    }

    private toReactionTypeEntity(row: CatalogueRow): ReactionTypeEntity {
        const entity = new ReactionTypeEntity();

        entity.id = row.id;
        entity.name = row.name;
        entity.code = row.code;

        return entity;
    }

    private toPostStatusEntity(row: CatalogueRow): PostStatusEntity {
        const entity = new PostStatusEntity();

        entity.id = row.id;
        entity.name = row.name;
        entity.code = row.code;

        return entity;
    }

    private toFraudCategoryEntity(row: CatalogueRow): FraudCategoryEntity {
        const entity = new FraudCategoryEntity();

        entity.id = row.id;
        entity.name = row.name;
        entity.code = row.code;

        return entity;
    }

    private toAuditActionEntity(row: CatalogueRow): AuditActionEntity {
        const entity = new AuditActionEntity();

        entity.id = row.id;
        entity.name = row.name;
        entity.code = row.code;

        return entity;
    }

    private toReportReasonEntity(row: CatalogueRow): ReportReasonEntity {
        const entity = new ReportReasonEntity();

        entity.id = row.id;
        entity.name = row.name;
        entity.code = row.code;

        return entity;
    }

    private toFraudTypeEntity(row: CatalogueRow): FraudTypeEntity {
        const entity = new FraudTypeEntity();

        entity.id = row.id;
        entity.name = row.name;
        entity.code = row.code;

        return entity;
    }

    private toModifiedFieldEntity(row: CatalogueRow): ModifiedFieldEntity {
        const entity = new ModifiedFieldEntity();

        entity.id = row.id;
        entity.name = row.name;
        entity.code = row.code;

        return entity;
    }

    private toEvidenceTypeEntity(row: EvidenceTypeRow): EvidenceTypeEntity {
        const entity = new EvidenceTypeEntity();

        entity.id = row.id;
        entity.name = row.name;

        return entity;
    }

    private toAuthorityEntity(row: AuthorityRow): AuthorityEntity {
        const entity = new AuthorityEntity();

        entity.id = row.id;
        entity.name = row.name;
        entity.code = row.code;
        entity.description = row.description;

        return entity;
    }
}

