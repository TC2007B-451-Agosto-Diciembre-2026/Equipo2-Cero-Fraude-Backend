import { Controller, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ReportService } from "./report.service";
import { AuthGuard } from "../auth/auth.guard";

@ApiTags("reports")
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard)
export class ReportController {
    constructor(private readonly service: ReportService) {}
}