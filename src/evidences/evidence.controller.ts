import {
    BadRequestException,
    Controller,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { diskStorage } from "multer";
import { EvidenceService } from "./evidence.service";
import { CurrentUser } from "../auth/current-user.decorator";
import type { JwtPayload } from "../auth/jwt";
import { ResponseDetailedEvidenceDto } from "./dto/response-detailed-evidence.dto";
import { ApiBadRequestResponse, ApiUnauthorizedResponse } from "../common/api-responses";

@ApiTags("evidences")
@Controller("evidences")
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class EvidenceController {
    constructor(private readonly service: EvidenceService) {}

    @Post()
    @ApiOperation({
        summary: "Crear una evidencia",
        description: "Crear una evidencia que inicialmente no está asociada a una publicación."
    })
    @UseInterceptors(
        FileInterceptor("file")
    )
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: { file: { type: "string", format: "binary" } },
            required: ["file"]
        }
    })
    @ApiResponse({
        status: 201,
        description: "Evidencia creada correctamente.",
        type: ResponseDetailedEvidenceDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    uploadEvidence(
        @UploadedFile() file: Express.Multer.File,
        @CurrentUser() user: JwtPayload
    ): Promise<ResponseDetailedEvidenceDto> {
        if(!file) {
            throw new BadRequestException("No se ha enviado un archivo")
        }
        return this.service.create(user.sub, file);
    }
}
