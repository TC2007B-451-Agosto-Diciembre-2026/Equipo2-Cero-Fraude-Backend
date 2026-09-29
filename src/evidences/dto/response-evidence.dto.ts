import { ApiProperty } from "@nestjs/swagger";
import { Evidence } from "../entities/evidence.entity";

export class ResponseEvidenceDto {
    id: number | undefined;

    @ApiProperty({
        type: String,
        example: "uploads/foto123.png",
        nullable: true,
        description: "Ruta de la evidencia."
    })
    url: string | null = null;

    static fromEntity(evidence: Evidence): ResponseEvidenceDto {
        const dto = new ResponseEvidenceDto();
        dto.id = evidence.id;
        dto.url = evidence.url ? "/uploads/" + evidence.url : null;
        return dto;
    }
}
