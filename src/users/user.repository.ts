import { Inject, Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import type { Pool, RowDataPacket } from "mysql2/promise";
import { DB_POOL } from "../database/database.module";
import { FindUsersDto } from "./dto/find-users.dto";
import { PAGE_SIZE } from "../common/constants";
import { AuthUser } from "./entities/auth-user.entity";

const COLUMNS = "id, username, email, created_at, is_active, role_id";
const AUTH_COLUMNS = COLUMNS + ", password_hash";

interface UserRow extends RowDataPacket {
    id: string;
    username: string;
    email: string;
    created_at: Date;
    is_active: boolean;
    role_id: number;
}

interface CountRow extends RowDataPacket {
    total: number;
}

interface FindUsersResult {
    users: User[];
    total: number;
}

@Injectable()
export class UserRepository {
    constructor(@Inject(DB_POOL) private readonly pool: Pool) {}

    async findAll(
        query: FindUsersDto
    ): Promise<FindUsersResult> {
        const conditions: string[] = [];
        const values: (string | number | boolean)[] = [];

        const page = query.page ?? 1;
        const offset = (page - 1) * PAGE_SIZE;

        let where = "";

        if(query.is_active !== undefined){
            conditions.push("is_active = ?");
            values.push(query.is_active);
        }
        if(query.role_id !== undefined){
            conditions.push("role_id = ?");
            values.push(query.role_id);
        }
        if(query.initial_date !== undefined){
            conditions.push("created_at >= ?");
            values.push(query.initial_date);
        }
        if(query.final_date !== undefined){
            conditions.push("created_at <= ?");
            values.push(query.final_date);
        }

        if(conditions.length > 0){
            where += ` WHERE ${conditions.join(" AND ")}`
        }

        const [countRows] = await this.pool.query<CountRow[]>(
            `
            SELECT COUNT(*) AS total
            FROM user
            ${where}
            `,
            values,
        );

        const total = countRows[0].total;

        const pageValues = [...values, PAGE_SIZE, offset];

        const [rows] = await this.pool.query<UserRow[]>(
            `SELECT ${COLUMNS}
            FROM user
            ${where}
            ORDER BY created_at DESC, id DESC
            LIMIT ?
            OFFSET ?
            `,
            pageValues,
        );

        return {
            users: rows.map(toEntity),
            total,
        };
    }

    async findById(
        id: string
    ): Promise<User | null> {
        const [rows] = await this.pool.query<UserRow[]>(
            `
            SELECT ${COLUMNS}
            FROM user
            WHERE id = ?
            `,
            [id],
        );

        return rows.length > 0 ? toEntity(rows[0]) : null;
    }

    async findByIdWithPassword(
        id: string
    ): Promise<AuthUser | null> {
        const [rows] = await this.pool.query<UserRow[]>(
            `
            SELECT ${AUTH_COLUMNS}
            FROM user
            WHERE id = ?
            `,
            [id],
        );

        return rows.length > 0 ? toAuthEntity(rows[0]) : null;
    }

    async updateById(
        id: string,
        data: Partial<Pick<User, "username" | "role_id" | "is_active">>
    ): Promise<User | null> {
        const fields: string[] = [];
        const values: (string | number | boolean)[] = [];

        if(data.username !== undefined) {
            fields.push("username = ?");
            values.push(data.username);
        }
        if(data.role_id !== undefined) {
            fields.push("role_id = ?");
            values.push(data.role_id);
        }
        if(data.is_active !== undefined) {
            fields.push("is_active = ?");
            values.push(data.is_active);
        }
        if(fields.length === 0){
            return null;
        }

        values.push(id);

        await this.pool.execute(
            `
            UPDATE user
            SET ${fields.join(", ")}
            WHERE id = ?`,
            values
        );

        return await this.findById(id);
    }

    async updatePasswordById(
        id: string,
        password_hash: string,
    ): Promise<void> {

        if(password_hash !== undefined) {
        }

        await this.pool.execute(
            `
            UPDATE user
            SET password_hash = ?
            WHERE id = ?
            `,
            [password_hash, id]
        );
    }
}

function toEntity(userRow: UserRow): User {
    const user = new User();
    user.id = userRow.id;
    user.username = userRow.username;
    user.email = userRow.email;
    user.created_at = userRow.created_at;
    user.is_active = userRow.is_active;
    user.role_id = userRow.role_id;
    return user;
}

function toAuthEntity(userRow: UserRow): AuthUser {
    const user = new AuthUser();
    user.id = userRow.id;
    user.username = userRow.username;
    user.email = userRow.email;
    user.password_hash = userRow.password_hash;
    user.created_at = userRow.created_at;
    user.is_active = userRow.is_active;
    user.role_id = userRow.role_id;
    return user;
}
