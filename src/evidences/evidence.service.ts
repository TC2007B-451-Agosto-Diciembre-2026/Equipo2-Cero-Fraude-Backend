import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, StreamableFile } from "@nestjs/common";
import { EvidenceRepository } from "./evidence.repository";
import { ResponseEvidenceDto } from "./dto/response-evidence.dto";
import { getLanUrl } from "../config/network";
import { ALLOWED_FILE_TYPES, EXPIRATION_TTL, MAX_FILE_SIZE } from "../constants";
import { extname, join } from "node:path";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import { createReadStream } from "fs";
import { lookup } from "mime-types";

@Injectable()
export class EvidenceService {
    constructor(private readonly repository: EvidenceRepository) {}

    async create(
        owner_id: string,
        file: Express.Multer.File
    ): Promise<ResponseEvidenceDto> {
         if(!file){
            throw new BadRequestException("A file is required");
        }

        if(file.size > MAX_FILE_SIZE){
            throw new BadRequestException("The file exceeds the maximum allowed size, 10 MB.")
        }

        const extension = extname(file.originalname).toLowerCase();
        const filename = `${randomUUID()}${extension}`;


        if(!ALLOWED_FILE_TYPES.has(file.mimetype)) {
            throw new BadRequestException(
                "The file type is not supported."
            );
        }

        const expires_at = new Date(
            Date.now() + EXPIRATION_TTL
        );

        const uploadDirectory = join(
            process.cwd(),
            "uploads",
        );

        const storagePath = join(
            uploadDirectory, filename
        );

        await mkdir(uploadDirectory, {
            recursive: true,
        });

        await writeFile(
            storagePath,
            file.buffer,
        );

        const evidence_type = 1;

        const evidence = await this.repository.create(
            owner_id,
            filename,
            evidence_type,
            expires_at,
        );

        return ResponseEvidenceDto.fromEntity(evidence);
    }

    async getFile(
        evidenceId: number,
    ): Promise<StreamableFile> {
        const evidence = await this.repository.findById(evidenceId);

        if(!evidence) {
            throw new NotFoundException(
                `Evidence ${evidenceId} not found`
            );
        }

        const filePath = join(
            process.cwd(),
           "uploads",
           evidence.storage_path
        );

        const fileStream = createReadStream(filePath);

        const contentType = lookup(evidence.storage_path) || "application/octet-stream";

        return new StreamableFile(fileStream, {
            type: contentType,
        });
        }
}
