import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { ReportRepository } from "./report.repository";
import { CreateReportDto } from "./dto/requests/create-report.dto";
import { ResponseReportDto } from "./dto/responses/response-report.dto";
import { handleDuplicateError } from "../common/error-handler";

@Injectable()
export class ReportService {
    constructor(private readonly repository: ReportRepository) {}

    async create(
        post_id: number,
        user_id: string,
        dto: CreateReportDto,
    ): Promise<ResponseReportDto> {
        const post = await this.repository.findPostForReport(post_id);
        if (!post) {
            throw new NotFoundException("Publicación no encontrada.");
        }

        if (post.author_id === user_id) {
            throw new ForbiddenException(
                "No puedes reportar tu propia publicación.",
            );
        }

        const reasonExists = await this.repository.reportReasonExists(
            dto.report_reason,
        );
        if (!reasonExists) {
            throw new BadRequestException("La razón de reporte no existe.");
        }

        try {
            const report = await this.repository.create(
                dto.information || null,
                dto.report_reason,
                user_id,
                post_id,
            );

            return ResponseReportDto.fromEntity(report);
        } catch (error) {
            handleDuplicateError(error);
            throw error;
        }
    }
}
