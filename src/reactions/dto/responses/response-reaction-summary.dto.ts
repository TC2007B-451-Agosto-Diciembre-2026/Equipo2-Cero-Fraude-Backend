import { ApiProperty } from "@nestjs/swagger";
import { ReactionSummaryEntity } from "../../entities/reaction-summary.entity";

export class ResponseReactionSummaryDto {
    @ApiProperty({
        example: 45,
        description: "Cantidad de reacciones LIKE de la publicación.",
    })
    like: number;
    @ApiProperty({
        example: 50,
        description: "Cantidad de reacciones DISLIKE de la publicación.",
    })
    dislike: number;
    @ApiProperty({
        example: 1,
        description:
            "Identificador de la reacción del usuario autenticado sobre la publicación, o null si no ha reaccionado.",
        nullable: true,
        type: Number,
    })
    user_reaction: number | null;

    static fromEntity(
        summary: ReactionSummaryEntity,
    ): ResponseReactionSummaryDto {
        const dto = new ResponseReactionSummaryDto();
        dto.like = summary.like;
        dto.dislike = summary.dislike;
        dto.user_reaction = summary.user_reaction;
        return dto;
    }
}
