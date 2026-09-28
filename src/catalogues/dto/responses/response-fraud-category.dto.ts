import { ApiProperty } from "@nestjs/swagger";
import { FraudCategoryEntity } from "../../entities/fraud-category.entity";

export class ResponseFraudCategoryDto {
    @ApiProperty({
        description: "Identificador de la categoría.",
        example: 1,
    })
    id!: number;

    @ApiProperty({
        description: "Nombre de la categoría.",
        example: "Redes sociales",
    })
    name!: string;

    @ApiProperty({
        description: "Código de la categoría.",
        example: "SOCIAL",
    })
    code!: string;

    static fromEntity(entity: FraudCategoryEntity): ResponseFraudCategoryDto {
        const dto = new ResponseFraudCategoryDto();

        dto.id = entity.id;
        dto.name = entity.name;
        dto.code = entity.code;

        return dto;
    }
}
