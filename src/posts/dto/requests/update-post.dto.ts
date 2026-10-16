import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import {
    IsBoolean,
    IsOptional,
    ArrayUnique,
    IsArray,
    IsInt,
    Min
} from "class-validator";
import { ToArray } from "../../../common/to-array";
import { CreatePostDto } from "./create-post.dto";

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @ApiPropertyOptional({
        description:
            "Indica si el fraude reportado en la publicación es fraude o no.",
        example: true
    })
    @IsOptional()
    @IsBoolean()
    is_fraud?: boolean;

    @ApiPropertyOptional({
        description: "IDs de las autoridades asignadas al post.",
        example: [1, 2],
        type: [Number]
    })
    @IsOptional()
    @ArrayUnique()
    @ToArray()
    @IsArray()
    @IsInt({ each: true })
    @Min(1, { each: true })
    authorities?: number[];
}
