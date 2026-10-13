import { ApiProperty } from "@nestjs/swagger";
import { EvidenceEntity } from "../entities/evidence.entity";
import { ResponseDetailedEvidenceDto } from "./response-detailed-evidence.dto";

export class ResponseAdminEvidenceDto extends ResponseDetailedEvidenceDto{
    @ApiProperty({
        example: "2026-09-29T20:30:00.000Z",
        description: "Fecha de creación de la evidencia.",
    })
    is_visible: boolean

    static fromEntity(
        evidence: EvidenceEntity,
        baseUrl: string
    ): ResponseAdminEvidenceDto {
        const dto = new ResponseAdminEvidenceDto();

        dto.id = evidence.id;
        dto.url = `${baseUrl}/uploads/${evidence.storage_path}`;
        dto.evidence_type_id = evidence.evidence_type_id;
        dto.post_id = evidence.post_id;
        dto.created_at = evidence.created_at;
        dto.expires_at = evidence.expires_at;
        dto.is_visible = evidence.is_visible;

        return dto;
    }
}
