import { Evidence } from "../entities/evidence.entity";


export class EvidenceResponseDto {
    id: string | undefined;
    url: string | null;

    static fromEntity(evidence: Evidence): EvidenceResponseDto {
        const dto = new EvidenceResponseDto();
        dto.id = evidence.id;
        dto.url = evidence.url ? "/uploads/" + evidence.url : null;
        return dto;
    }
}
