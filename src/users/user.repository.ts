import { Inject, Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import type { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { DB_POOL } from "../database/database.module";

const COLUMNS = 'id, nombre, correo, hash_contrasena, sal, fecha_creacion, estado';

@Injectable()
export class UserRepository {
    constructor(@Inject(DB_POOL) private readonly pool: Pool) {}

    async findAll(): Promise<User []> {
        const [rows] = await this.pool.query<RowDataPacket[]>(
            `SELECT ${COLUMNS} FROM usuario ORDER BY fecha_creacion`,
        );
        return rows.map(toEntity);
    }

    async findById(id: string): Promise<User | undefined> {
        const [rows] = await this.pool.query<RowDataPacket[]>(
            `SELECT ${COLUMNS} FROM usuario WHERE id = ?`,
            [id],
        );

        return rows.length > 0 ? toEntity(rows[0]) : undefined;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const [rows] = await this.pool.query<RowDataPacket[]>(
            `SELECT ${COLUMNS} FROM usuario WHERE correo = ?`
            ,[email],
        );

        return rows.length > 0 ? toEntity(rows[0]) : undefined;
    }

    async save(usuario: Omit<User, "id" | "fechaCreacion">): Promise<User> {
        await this.pool.query<RowDataPacket[]>(
            `INSERT INTO usuario(nombre, hash_contrasena, sal, correo, estado, rol_id)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [usuario.nombre, usuario.hash, usuario.sal, usuario.email, usuario.estado, usuario.rol_id]
        );

        return (await this.findByEmail(usuario.email!))!;
    }
}

function toEntity(row: any): User {
    const user = new User();
    user.id = row.id;
    user.nombre = row.nombre;
    user.email = row.correo;
    user.hash = row.hash_contrasena;
    user.sal = row.sal;
    user.fechaCreacion = row.fecha_creacion;
    user.estado = row.estado;
    return user;
}
