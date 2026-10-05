import { BadRequestException, Injectable } from "@nestjs/common";
import { EvidenceRepository } from "./evidence.repository";
import { ResponseEvidenceDto } from "./dto/response-evidence.dto";
import { ALLOWED_FILE_TYPES, EXPIRATION_TTL, MAX_FILE_SIZE } from "../common/constants";
import { extname, join } from "node:path";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";

@Injectable()
export class EvidenceService {
    constructor(private readonly repository: EvidenceRepository) {}

    async create(
        owner_id: string,
        file: Express.Multer.File
    ): Promise<ResponseEvidenceDto> {
        if(file.size > MAX_FILE_SIZE){
            throw new BadRequestException("El archivo excede el límite permitido de 10 MB.")
        }

        const extension = extname(file.originalname).toLowerCase();
        const filename = `${randomUUID()}${extension}`;

        if(!ALLOWED_FILE_TYPES.has(file.mimetype)) {
            throw new BadRequestException(
                "El tipo de archivo no está permitido."
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

        return ResponseEvidenceDto.fromEntity(
            evidence,
            ""
        );
    }
}
