import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { diskStorage } from "multer";
import { ResponseEvidenceDto } from "./dto/response-evidence.dto";
import { EvidenceService } from "./evidence.service";
import { CurrentUser } from "../auth/current-user.decorator";
import type { JwtPayload } from "../auth/jwt";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { ADMIN_ROLE_ID } from "../constants";

@ApiTags("evidence")
@Controller("evidence")
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class EvidenceController {
    constructor(private readonly service: EvidenceService) {}

    @Post()
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
    @ApiResponse({ status: 201, type: ResponseEvidenceDto })
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    uploadEvidence(
        @UploadedFile() file: Express.Multer.File,
        @CurrentUser() user: JwtPayload
    ): Promise<ResponseEvidenceDto> {
        if(!file) {
            throw new BadRequestException("No se ha enviado un archivo")
        }
        return this.service.create(user.sub, file);
    }

    @Get(":evidenceId/file")
    @ApiOperation({
        summary: "Obtener archivo de evidencia",
    })
    @ApiResponse({
        status: 200,
        description: "Archivo de evidencia.",
    })
    @ApiResponse({
        status: 404,
        description: "Evidencia no encontrada.",
    })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    getFile(
        @Param("evidenceId", ParseIntPipe) evidenceId: number,
    ) {
        return this.service.getFile(evidenceId);
    }
}
