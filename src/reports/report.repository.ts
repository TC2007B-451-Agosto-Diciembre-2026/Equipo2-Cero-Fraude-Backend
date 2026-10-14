import { Inject, Injectable } from "@nestjs/common";
import type { Pool, RowDataPacket } from "mysql2/promise";
import { DB_POOL } from "../database/database.module";

@Injectable()
export class ReportRepository {
    constructor(@Inject(DB_POOL) private readonly pool: Pool) {}
}