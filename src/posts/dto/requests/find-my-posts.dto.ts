import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsOptional,
    Min,
} from "class-validator";

export class FindMyPostsDto {
    @ApiPropertyOptional({
        description: "Página de resultados. Comienza en 1.",
        example: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;

    @ApiProperty({
        description: "Si buscar borradores o publicaciones.",
        example: true,
    })
    @IsNotEmpty()
    @Transform(({ value }) => {
        if (value === "true") return true;
        if (value === "false") return false;
        return value;
    })
    @IsBoolean()
    is_draft?: boolean;
}
