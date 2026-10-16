import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException
} from "@nestjs/common";
import { ReportRepository } from "./report.repository";
import { CreateReportDto } from "./dto/requests/create-report.dto";
import { ResponseReportDto } from "./dto/responses/response-report.dto";
import { handleDuplicateError } from "../common/error-handler";
import { FindReportsDto } from "./dto/requests/find-reports.dto";
import { ResponseReportsDto } from "./dto/responses/response-reports.dto";
import { PAGE_SIZE } from "../common/constants";

@Injectable()
export class ReportService {
    constructor(private readonly repository: ReportRepository) {}

    async create(
        post_id: number,
        user_id: string,
        dto: CreateReportDto
    ): Promise<ResponseReportDto> {
        const post = await this.repository.findPostForReport(post_id);
        if (!post) {
            throw new NotFoundException("Publicación no encontrada.");
        }

        if (post.author_id === user_id) {
            throw new ForbiddenException(
                "No puedes reportar tu propia publicación."
            );
        }

        const reasonExists = await this.repository.reportReasonExists(
            dto.report_reason
        );
        if (!reasonExists) {
            throw new BadRequestException("La razón de reporte no existe.");
        }

        try {
            const report = await this.repository.create(
                dto.information || null,
                dto.report_reason,
                user_id,
                post_id
            );

            return ResponseReportDto.fromEntity(report);
        } catch (error) {
            handleDuplicateError(error);
            throw error;
        }
    }

    async findAll(query: FindReportsDto): Promise<ResponseReportsDto> {
        return this.findPage(query.page ?? 1);
    }

    async findByPost(
        post_id: number,
        query: FindReportsDto
    ): Promise<ResponseReportsDto> {
        const postExists = await this.repository.postExists(post_id);
        if (!postExists) {
            throw new NotFoundException("Publicación no encontrada.");
        }

        return this.findPage(query.page ?? 1, post_id);
    }

    async delete(post_id: number, report_id: number): Promise<void> {
        const deleted = await this.repository.delete(post_id, report_id);
        if (!deleted) {
            throw new NotFoundException("El reporte a eliminar no existe.");
        }
    }

    private async findPage(
        page: number,
        post_id?: number
    ): Promise<ResponseReportsDto> {
        const result = await this.repository.findAll(page, post_id);

        return {
            data: result.reports.map((report) =>
                ResponseReportDto.fromEntity(report)
            ),
            page: page,
            total_pages: Math.ceil(result.total / PAGE_SIZE),
            total: result.total
        };
    }
}
