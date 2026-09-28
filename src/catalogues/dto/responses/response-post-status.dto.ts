import { ApiProperty } from "@nestjs/swagger";
import { PostStatusEntity } from "../../entities/post-status.entity";

export class ResponsePostStatusDto {
    @ApiProperty({
        description: "Identificador del estado.",
        example: 1,
    })
    id!: number;

    @ApiProperty({
        description: "Nombre del estado.",
        example: "Borrador",
    })
    name!: string;

    @ApiProperty({
        description: "Código del estado.",
        example: "DRAFT",
    })
    code!: string;

    static fromEntity(entity: PostStatusEntity): ResponsePostStatusDto {
        const dto = new ResponsePostStatusDto();

        dto.id = entity.id;
        dto.name = entity.name;
        dto.code = entity.code;

        return dto;
    }
}
