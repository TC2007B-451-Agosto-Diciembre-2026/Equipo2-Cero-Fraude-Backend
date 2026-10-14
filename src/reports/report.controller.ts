import {
    Body,
    Controller,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { ReportService } from "./report.service";
import { AuthGuard } from "../auth/auth.guard";
import { CurrentUser } from "../auth/current-user.decorator";
import type { JwtPayload } from "../auth/jwt";
import { CreateReportDto } from "./dto/requests/create-report.dto";
import { ResponseReportDto } from "./dto/responses/response-report.dto";
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiUnauthorizedResponse,
} from "../common/api-responses";

@ApiTags("reports")
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard)
export class ReportController {
    constructor(private readonly service: ReportService) {}

    @Post("posts/:postId/reports")
    @ApiOperation({
        summary: "Crear un reporte",
        description: "Crea un reporte sobre una publicación de fraude.",
    })
    @ApiParam({
        name: "postId",
        description: "ID de la publicación que se desea reportar.",
        type: Number,
        example: 4,
    })
    @ApiResponse({
        status: 201,
        description: "Reporte creado correctamente.",
        type: ResponseReportDto,
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiNotFoundResponse()
    @ApiConflictResponse()
    create(
        @Param("postId", ParseIntPipe) postId: number,
        @CurrentUser() user: JwtPayload,
        @Body() dto: CreateReportDto,
    ): Promise<ResponseReportDto> {
        return this.service.create(postId, user.sub, dto);
    }
}
