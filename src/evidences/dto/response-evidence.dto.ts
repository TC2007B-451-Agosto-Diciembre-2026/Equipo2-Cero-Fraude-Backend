import { ApiProperty } from "@nestjs/swagger";
import { EvidenceEntity } from "../entities/evidence.entity";

export class ResponseEvidenceDto {
    @ApiProperty({
        example: 1,
        description: "Identificador de la evidencia.",
    })
    id: number;

    @ApiProperty({
        example: "http://localhost:3000/uploads/550e8400-e29b-41d4-a716-446655440000.pdf",
        description: "Url de la evidencia guardada.",
    })
    url: string;

    @ApiProperty({
        example: 1,
        description: "Identificador del tipo de la evidencia.",
        nullable: true,
    })
    evidence_type_id: number;

    @ApiProperty({
        example: null,
        description: "Identificador de la publicación asociada a la evidencia.",
        nullable: true,
    })
    post_id: number | null;

    static fromEntity(
        evidence: EvidenceEntity,
        baseUrl: string
    ): ResponseEvidenceDto {
        const dto = new ResponseEvidenceDto();

        dto.id = evidence.id;
        dto.url = `${baseUrl}/uploads/${evidence.storage_path}`;
        dto.evidence_type_id = evidence.evidence_type_id;
        dto.post_id = evidence.post_id;

        return dto;
    }
}
