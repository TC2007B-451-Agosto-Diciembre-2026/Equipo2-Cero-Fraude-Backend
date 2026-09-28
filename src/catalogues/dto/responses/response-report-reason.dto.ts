import { ApiProperty } from "@nestjs/swagger";
import { ReportReasonEntity } from "../../entities/report-reason.entity";

export class ResponseReportReasonDto {
    @ApiProperty({
        description: "Identificador de la razón de reporte.",
        example: 1,
    })
    id!: number;

    @ApiProperty({
        description: "Nombre de la razón de reporte.",
        example: "Información incorrecta",
    })
    name!: string;

    @ApiProperty({
        description: "Código de la razón de reporte.",
        example: "FALSE_INFO",
    })
    code!: string;

    static fromEntity(entity: ReportReasonEntity): ResponseReportReasonDto {
        const dto = new ResponseReportReasonDto();

        dto.id = entity.id;
        dto.name = entity.name;
        dto.code = entity.code;

        return dto;
    }
}
