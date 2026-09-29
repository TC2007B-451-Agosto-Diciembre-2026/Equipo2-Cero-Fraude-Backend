import { Injectable } from "@nestjs/common";
import { EvidenceRepository } from "./evidence.repository";
import { ResponseEvidenceDto } from "./dto/response-evidence.dto";


@Injectable()
export class EvidenceService {
    //constructor(private readonly repository: EvidenceRepository) {}


    async setEvidence(
        file: Express.Multer.File
    ) {
    //: Promise<ResponseEvidenceDto> {
        return "/uploads/" + file.filename;
    }
}
