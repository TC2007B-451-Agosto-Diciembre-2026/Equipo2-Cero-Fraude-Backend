import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
    IsBoolean,
    IsDateString,
    IsInt,
    IsOptional,
    Min,
} from "class-validator";

export class FindUsersDto {
    @ApiPropertyOptional({
        description: "Página de resultados. Comienza en 1.",
        example: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;

    @ApiPropertyOptional({
        description: "Filtra por estado de la cuenta.",
        example: true,
    })
    @IsOptional()
    @Transform(({ value }) => {
        if (value === "true") return true;
        if (value === "false") return false;
        return value;
    })
    @IsBoolean()
    is_active?: boolean;

    @ApiPropertyOptional({
        description: "Filtra por identificador de rol.",
        example: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    role_id?: number;

    @ApiPropertyOptional({
        description: "Fecha inicial en formato ISO 8601.",
        example: "2026-09-01T00:00:00.000Z",
    })
    @IsOptional()
    @IsDateString()
    initial_date?: string;

    @ApiPropertyOptional({
        description: "Fecha final en formato ISO 8601.",
        example: "2026-09-27T23:59:59.999Z",
    })
    @IsOptional()
    @IsDateString()
    final_date?: string;
}
