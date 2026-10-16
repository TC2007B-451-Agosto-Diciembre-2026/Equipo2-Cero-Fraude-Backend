import { ApiProperty } from "@nestjs/swagger";
import { ReactionEntity } from "../../entities/reaction.entity";

export class ResponseReactionDto {
    @ApiProperty({
        example: 1,
        description: "Identificador de la publicación.",
    })
    post: number;
    @ApiProperty({
        example: 1,
        description: "Identificador del tipo de reacción.",
    })
    reaction: number;
    @ApiProperty({
        example: "550e8400-e29b-41d4-a716-446655440000",
        description: "Identificador del usuario que reaccionó.",
    })
    user: string;

    static fromEntity(reaction: ReactionEntity): ResponseReactionDto {
        const dto = new ResponseReactionDto();
        dto.post = reaction.post_id;
        dto.reaction = reaction.reaction_type_id;
        dto.user = reaction.user_id;
        return dto;
    }
}
