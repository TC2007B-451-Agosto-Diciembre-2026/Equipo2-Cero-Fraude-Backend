import { ApiProperty } from "@nestjs/swagger";
import { AuthorityEntity } from "../../entities/authority.entity";

export class ResponseAuthorityDto {
    @ApiProperty({
        description: "Identificador de la autoridad.",
        example: 1,
    })
    id!: number;

    @ApiProperty({
        description: "Nombre de la autoridad.",
        example: "CONDUSEF",
    })
    name!: string;

    @ApiProperty({
        description: "Código de la autoridad.",
        example: "CONDUSEF",
    })
    code!: string;

    @ApiProperty({
        description: "Descripción de la autoridad.",
        example:
            "Brinda orientación y apoyo en asuntos relacionados con productos, servicios e instituciones financieras.",
    })
    description!: string;

    static fromEntity(entity: AuthorityEntity): ResponseAuthorityDto {
        const dto = new ResponseAuthorityDto();

        dto.id = entity.id;
        dto.name = entity.name;
        dto.code = entity.code;
        dto.description = entity.description;

        return dto;
    }
}
