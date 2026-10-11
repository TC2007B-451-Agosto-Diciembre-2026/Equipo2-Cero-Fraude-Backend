import {
    IsArray,
    IsInt,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ToArray } from "../../../common/to-array";

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
        description: "Texto a buscar en la información de la publicación.",
        example: "iPhone",
        minimum: 1,
        maximum: 255,
    })
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    text?: string;

    @ApiPropertyOptional({
        description: "IDs de las categorías asociadas a las publicaciones.",
        example: [1, 2],
        type: [Number],
    })
    @IsOptional()
    @ToArray()
    @Type(() => Number)
    @IsArray()
    @IsInt({ each: true })
    @Min(1, { each: true })
    category?: number[];

    @ApiPropertyOptional({
        description: "IDs de los tipos asociados a las publicaciones.",
        example: [1, 3],
        type: [Number],
    })
    @IsOptional()
    @ToArray()
    @Type(() => Number)
    @IsArray()
    @IsInt({ each: true })
    @Min(1, { each: true })
    type?: number[];

    @ApiPropertyOptional({
        description: "IDs de los estados de las publicaciones.",
        example: [1, 2],
        type: [Number],
    })
    @IsOptional()
    @ToArray()
    @Type(() => Number)
    @IsArray()
    @IsInt({ each: true })
    @Min(1, { each: true })
    status_id?: number[];
}
