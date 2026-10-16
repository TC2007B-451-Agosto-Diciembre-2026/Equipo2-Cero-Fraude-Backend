import { ReportEntity } from "../../entities/report.entity";
import { ApiProperty } from "@nestjs/swagger";

export class ResponseReportDto {
    @ApiProperty({
        example: 1,
        description: "Identificador del reporte."
    })
    id: number;
    @ApiProperty({
        example:
            "Esta publicación es spam y no cumple con las normas de la comunidad.",
        description: "Información adicional sobre el reporte.",
        nullable: true
    })
    information: string | null;
    @ApiProperty({
        example: 1,
        description: "Identificador del motivo del reporte."
    })
    report_reason: number;
    @ApiProperty({
        example: "550e8400-e29b-41d4-a716-446655440000",
        description: "Identificador del usuario que realizó el reporte."
    })
    user: string;
    @ApiProperty({
        example: 1,
        description: "Identificador de la publicación reportada."
    })
    post: number;

    static fromEntity(report: ReportEntity) {
        const dto = new ResponseReportDto();
        dto.id = report.id;
        dto.information = report.details;
        dto.report_reason = report.report_reason_id;
        dto.user = report.reporter_id;
        dto.post = report.post_id;
        return dto;
    }
}
