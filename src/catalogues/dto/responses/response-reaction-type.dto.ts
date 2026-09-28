import { ApiProperty } from "@nestjs/swagger";
import { ReactionTypeEntity } from "../../entities/reaction-type.entity";

export class ResponseReactionTypeDto {
    @ApiProperty({
        description: "Identificador de la reacción.",
        example: 1,
    })
    id!: number;

    @ApiProperty({
        description: "Nombre de la reacción.",
        example: "like",
    })
    name!: string;

    @ApiProperty({
        description: "Código de la reacción.",
        example: "LIKE",
    })
    code!: string;

    static fromEntity(entity: ReactionTypeEntity): ResponseReactionTypeDto {
        const dto = new ResponseReactionTypeDto();

        dto.id = entity.id;
        dto.name = entity.name;
        dto.code = entity.code;

        return dto;
    }
}
