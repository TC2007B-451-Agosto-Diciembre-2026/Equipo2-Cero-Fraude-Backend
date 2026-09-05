import { Inject, Injectable } from "@nestjs/common";
import { Usuario } from "./entities/usuario.entity";
import type { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { DB_POOL } from "../database/database.module";

const COLUMNS = 'id, nombre, correo, fecha_creacion, estado';

@Injectable()
export class UsuariosRepository {
    constructor(@Inject(DB_POOL) private readonly pool: Pool) {}

    async findAll(): Promise<Usuario []> {
        const [rows] = await this.pool.query<RowDataPacket[]>(
            `SELECT ${COLUMNS} FROM usuario ORDER BY fecha_creacion`,
        );
        return rows.map(toEntity);
    }

    async findById(id: string): Promise<Usuario | undefined> {
        const [rows] = await this.pool.query<RowDataPacket[]>(
            `SELECT ${COLUMNS} FROM usuario WHERE id = ?`,
            [id],
        );

        return toEntity(rows[0]);
    }

    async findByEmail(email: string): Promise<Usuario | undefined> {
        const [rows] = await this.pool.query<RowDataPacket[]>(
            `SELECT ${COLUMNS} FROM usuario WHERE correo = ?`
            ,[email],
        );

        return toEntity(rows[0]);
    }

    async save(usuario: Omit<Usuario, "id" | "fechaCreacion">): Promise<Usuario> {
        await this.pool.query<RowDataPacket[]>(
            `INSERT INTO usuario(nombre, hash_contrasena, sal, correo, estado, rol_id)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [usuario.nombre, usuario.hash, usuario.sal, usuario.email, usuario.estado, usuario.rol_id]
        );

        return (await this.findByEmail(usuario.email!))!;
    }
}

function toEntity(row: any): Usuario {
    const usuario = new Usuario();
    usuario.id = row.id;
    usuario.nombre = row.nombre;
    usuario.email = row.correo;
    usuario.fechaCreacion = row.fecha_creacion;
    usuario.estado = row.estado;
    return usuario;
}
