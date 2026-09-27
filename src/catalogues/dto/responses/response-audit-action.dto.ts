import { ApiProperty } from "@nestjs/swagger";
import { AuditActionEntity } from "../../entities/audit-action.entity";

export class ResponseAuditActionDto {
    @ApiProperty({
        description: "Identificador de la acción de auditoría.",
        example: 1,
    })
    id!: number;

    @ApiProperty({
        description: "Nombre de la acción de auditoría.",
        example: "Editar",
    })
    name!: string;

    @ApiProperty({
        description: "Código de la acción de auditoría.",
        example: "UPDATE",
    })
    code!: string;

    static fromEntity(entity: AuditActionEntity): ResponseAuditActionDto {
        const dto = new ResponseAuditActionDto();

        dto.id = entity.id;
        dto.name = entity.name;
        dto.code = entity.code;

        return dto;
    }
}
