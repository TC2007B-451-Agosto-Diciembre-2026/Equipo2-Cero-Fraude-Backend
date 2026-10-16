import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class UpdateCommentDto {
    @ApiProperty({
        example: false,
        description: "Indica si el comentario debe verse públicamenre."
    })
    @IsBoolean()
    is_visible: boolean;
}
