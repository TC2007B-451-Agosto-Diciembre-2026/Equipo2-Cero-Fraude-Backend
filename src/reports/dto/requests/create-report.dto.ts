import { IsInt, Min, IsOptional, IsString, MaxLength } from "class-validator";
import { MAX_REPORT_INFORMATION_LENGTH } from "../../../common/constants";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreateReportDto {
    @ApiProperty({
        example: 1,
        description: "Identificador del motivo del reporte."
    })
    @IsInt()
    @Min(1)
    report_reason: number;

    @ApiPropertyOptional({
        example:
            "Esta publicación es spam y no cumple con las normas de la comunidad.",
        description: "Información adicional sobre el reporte.",
        maxLength: MAX_REPORT_INFORMATION_LENGTH
    })
    @IsString()
    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value === "string") return value.trim();
        return value;
    })
    @MaxLength(MAX_REPORT_INFORMATION_LENGTH)
    information?: string;
}
