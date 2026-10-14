import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { ReportController } from "./report.controller";
import { ReportService } from "./report.service";
import { ReportRepository } from "./report.repository";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [ReportController],
    providers: [ReportService, ReportRepository],
})
export class ReportModule {}
