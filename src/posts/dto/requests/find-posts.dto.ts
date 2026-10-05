import {
    IsArray,
    IsInt,
    IsOptional,
    Max,
    Min,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class FindPostsDto {
    @ApiPropertyOptional({
        description: "Página de resultados a obtener. Comienza en 1.",
        example: 1,
        minimum: 1,
        maximum: 100,
        default: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    page?: number;

    @ApiPropertyOptional({
        description: "IDs de las categorías asociadas a las publicaciones.",
        example: [1, 2],
        type: [Number],
    })
    @IsOptional()
    @IsArray()
    @Type(() => Number)
    @IsInt({ each: true })
    @Min(1, { each: true })
    category?: number[];

    @ApiPropertyOptional({
        description: "IDs de los tipos asociados a las publicaciones.",
        example: [1, 3],
        type: [Number],
    })
    @IsOptional()
    @IsArray()
    @Type(() => Number)
    @IsInt({ each: true })
    @Min(1, { each: true })
    type?: number[];

    @ApiPropertyOptional({
        description: "IDs de los estados de las publicaciones.",
        example: [1, 2],
        type: [Number],
    })
    @IsOptional()
    @IsArray()
    @Type(() => Number)
    @IsInt({ each: true })
    @Min(1, { each: true })
    status_id?: number[];
}
