import { Inject, Injectable } from "@nestjs/common";
import { DB_POOL } from "../database/database.module";
import type { Pool } from "mysql2/promise";

@Injectable()
export class EvidenceRepository {
    constructor(@Inject(DB_POOL) private readonly pool: Pool) {}
}
