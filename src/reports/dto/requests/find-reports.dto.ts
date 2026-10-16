import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class FindReportsDto {
    @ApiPropertyOptional({
        description: "Página de resultados. Comienza en 1.",
        example: 1
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;
}
