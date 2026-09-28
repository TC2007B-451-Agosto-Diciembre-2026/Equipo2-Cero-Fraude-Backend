import { ApiProperty } from "@nestjs/swagger";
import { EvidenceTypeEntity } from "../../entities/evidence-type.entity";

export class ResponseEvidenceTypeDto {
    @ApiProperty({
        description: "Identificador del tipo de evidencia.",
        example: 1,
    })
    id!: number;

    @ApiProperty({
        description: "Nombre del tipo de evidencia.",
        example: "Imagen",
    })
    name!: string;

    static fromEntity(entity: EvidenceTypeEntity): ResponseEvidenceTypeDto {
        const dto = new ResponseEvidenceTypeDto();

        dto.id = entity.id;
        dto.name = entity.name;

        return dto;
    }
}
