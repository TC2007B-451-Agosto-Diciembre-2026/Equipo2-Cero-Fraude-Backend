import {
    BadRequestException,
    Body,
    Controller,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { AuthGuard } from "../auth/auth.guard";
import { CreateEvidenceDto } from "./dto/create-evidence.dto";
import { ResponseEvidenceDto } from "./dto/response-evidence.dto";
import { EvidenceService } from "./evidence.service";

@ApiTags("evidence")
@Controller("evidence")
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class EvidenceController {
    constructor(private readonly service: EvidenceService) {}

    @Post("")
    @UseInterceptors(
        FileInterceptor("photo", {
            storage: diskStorage({
                destination: "uploads",
                filename: (_req, file, cb) => cb(null, file.originalname),
            }),
        })
    )
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: { photo: { type: "string", format: "binary" } },
            required: ["photo"]
        }
    })
    @ApiResponse({ status: 201, type: ResponseEvidenceDto })
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    uploadEvidence(
        @UploadedFile() file: Express.Multer.File,
    ) {
        if(!file) throw new BadRequestException("No se ha enviado un archivo")
            //return "/uploads/" + file.filename;
            return this.service.setEvidence(file);
    }
}
