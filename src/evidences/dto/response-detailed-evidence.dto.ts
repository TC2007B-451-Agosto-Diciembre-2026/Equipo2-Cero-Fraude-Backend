import { ApiProperty } from "@nestjs/swagger";
import { EvidenceEntity } from "../entities/evidence.entity";
import { ResponseEvidenceDto } from "./response-evidence.dto";

export class ResponseDetailedEvidenceDto extends ResponseEvidenceDto{
    @ApiProperty({
        example: "2026-09-29T20:30:00.000Z",
        description: "Fecha de creación de la evidencia.",
    })
    created_at: Date;

    @ApiProperty({
        example: "2026-09-29T21:00:00.000Z",
        description: "Fecha de expiración de la evidencia.",
        nullable: true,
    })
    expires_at: Date | null;

    static fromEntity(
        evidence: EvidenceEntity,
        baseUrl: string
    ): ResponseDetailedEvidenceDto {
        const dto = new ResponseDetailedEvidenceDto();

        dto.id = evidence.id;
        dto.url = `${baseUrl}/uploads/${evidence.storage_path}`;
        dto.evidence_type_id = evidence.evidence_type_id;
        dto.post_id = evidence.post_id;
        dto.created_at = evidence.created_at;
        dto.expires_at = evidence.expires_at;

        return dto;
    }
}
