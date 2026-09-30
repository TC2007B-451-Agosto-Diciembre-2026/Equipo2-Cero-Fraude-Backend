import { ApiProperty } from "@nestjs/swagger";
import { Evidence } from "../entities/evidence.entity";

export class ResponseEvidenceDto {
    @ApiProperty({
        example: 1,
        description: "Evidence identifier.",
    })
    id: number;

    @ApiProperty({
        example: "550e8400-e29b-41d4-a716-446655440000.pdf",
        description: "Stored evidence filename.",
    })
    storage_path: string;

    @ApiProperty({
        example: 1,
        description: "Evidence type identifier.",
        nullable: true,
    })
    evidence_type_id: number | null;

    @ApiProperty({
        example: null,
        description: "Post associated with the evidence.",
        nullable: true,
    })
    post_id: number | null;

    @ApiProperty({
        example: "2026-09-29T20:30:00.000Z",
        description: "Evidence creation date.",
    })
    created_at: Date;

    @ApiProperty({
        example: "2026-09-29T21:00:00.000Z",
        description: "Expiration date for unassociated evidence.",
        nullable: true,
    })
    expires_at: Date | null;

    static fromEntity(evidence: Evidence): ResponseEvidenceDto {
        const dto = new ResponseEvidenceDto();

        dto.id = evidence.id;
        dto.storage_path = evidence.storage_path;
        dto.evidence_type_id = evidence.evidence_type_id;
        dto.post_id = evidence.post_id;
        dto.created_at = evidence.created_at;
        dto.expires_at = evidence.expires_at;

        return dto;
    }
}
