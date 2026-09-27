import { ApiProperty } from "@nestjs/swagger";
import { FraudTypeEntity } from "../../entities/fraud-type.entity";

export class ResponseFraudTypeDto {
    @ApiProperty({
        description: "Identificador del tipo de fraude.",
        example: 1,
    })
    id!: number;

    @ApiProperty({
        description: "Nombre del tipo de fraude.",
        example: "Producto falso",
    })
    name!: string;

    @ApiProperty({
        description: "Código del tipo de fraude.",
        example: "FAKE_PROD",
    })
    code!: string;

    static fromEntity(entity: FraudTypeEntity): ResponseFraudTypeDto {
        const dto = new ResponseFraudTypeDto();

        dto.id = entity.id;
        dto.name = entity.name;
        dto.code = entity.code;

        return dto;
    }
}
