import { ApiProperty } from "@nestjs/swagger";
import { ModifiedFieldEntity } from "../../entities/modified-field.entity";

export class ResponseModifiedFieldDto {
    @ApiProperty({
        description: "Identificador del campo modificado.",
        example: 1,
    })
    id!: number;

    @ApiProperty({
        description: "Nombre del campo modificado.",
        example: "Título",
    })
    name!: string;

    @ApiProperty({
        description: "Código del campo modificado.",
        example: "TITLE",
    })
    code!: string;

    static fromEntity(entity: ModifiedFieldEntity): ResponseModifiedFieldDto {
        const dto = new ResponseModifiedFieldDto();

        dto.id = entity.id;
        dto.name = entity.name;
        dto.code = entity.code;

        return dto;
    }
}
