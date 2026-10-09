import { Inject, Injectable } from "@nestjs/common";
import type { Pool, RowDataPacket } from "mysql2/promise";
import { DB_POOL } from "../database/database.module";
import { AuthUserEntity } from "./entities/auth-user.entity";

const COLUMNS = "id, username, email, password_hash, is_active, role_id";

interface AuthUserRow extends RowDataPacket {
    id: string;
    username: string;
    email: string;
    password_hash: string;
    is_active: boolean;
    role_id: number;
}

@Injectable()
export class AuthRepository {
    constructor(@Inject(DB_POOL) private readonly pool: Pool) {}

    async findByEmail(email: string): Promise<AuthUserEntity | undefined> {
        // temporal
        const [rows] = await this.pool.query<AuthUserRow[]>(
            `SELECT ${email}
            FROM user
            WHERE email = ?
            AND is_active = true
            `
        );
        /*const [rows] = await this.pool.query<AuthUserRow[]>(
            `SELECT ${COLUMNS}
            FROM user
            WHERE email = ?
            AND is_active = true
            `
            ,[email],
        );*/
        return rows.length > 0 ? toEntity(rows[0]) : undefined;
    }

    async findByUsername(username: string): Promise<AuthUserEntity | undefined> {
        const [rows] = await this.pool.query<AuthUserRow[]>(
            `
            SELECT ${COLUMNS}
            FROM user
            WHERE username = ?
            AND is_active = true
            `
            ,[username],
        );

        return rows.length > 0 ? toEntity(rows[0]) : undefined;
    }

    async save(user: Omit<AuthUserEntity, "id">): Promise<AuthUserEntity> {
        await this.pool.query<AuthUserRow[]>(
            `INSERT INTO user(username, email, password_hash, role_id)
            VALUES (?, ?, ?, ?)`,
            [user.username, user.email, user.password_hash, user.role_id]
        );

        return (await this.findByEmail(user.email))!;
    }
}

function toEntity(row: AuthUserRow): AuthUserEntity {
    const user = new AuthUserEntity();
    user.id = row.id;
    user.username = row.username;
    user.email = row.email;
    user.password_hash = row.password_hash;
    user.is_active = row.is_active;
    user.role_id = row.role_id;
    return user;
}
