import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UseGuards
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags
} from "@nestjs/swagger";
import { ReportService } from "./report.service";
import { AuthGuard } from "../auth/auth.guard";
import { CurrentUser } from "../auth/current-user.decorator";
import type { JwtPayload } from "../auth/jwt";
import { CreateReportDto } from "./dto/requests/create-report.dto";
import { ResponseReportDto } from "./dto/responses/response-report.dto";
import { FindReportsDto } from "./dto/requests/find-reports.dto";
import { ResponseReportsDto } from "./dto/responses/response-reports.dto";
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiForbiddenResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiUnauthorizedResponse
} from "../common/api-responses";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { ADMIN_ROLE_ID } from "../common/constants";

@ApiTags("reports")
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard)
export class ReportController {
    constructor(private readonly service: ReportService) {}

    @Post("posts/:postId/reports")
    @ApiOperation({
        summary: "Crear un reporte",
        description: "Crea un reporte sobre una publicación de fraude."
    })
    @ApiParam({
        name: "postId",
        description: "ID de la publicación que se desea reportar.",
        type: Number,
        example: 4
    })
    @ApiResponse({
        status: 201,
        description: "Reporte creado correctamente.",
        type: ResponseReportDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiNotFoundResponse()
    @ApiConflictResponse()
    create(
        @Param("postId", ParseIntPipe) postId: number,
        @CurrentUser() user: JwtPayload,
        @Body() dto: CreateReportDto
    ): Promise<ResponseReportDto> {
        return this.service.create(postId, user.sub, dto);
    }

    @Get("reports")
    @ApiOperation({
        summary: "Obtener reportes",
        description:
            "Obtiene una página de los reportes realizados sobre publicaciones."
    })
    @ApiResponse({
        status: 200,
        description: "Página de reportes.",
        type: ResponseReportsDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    findAll(@Query() query: FindReportsDto): Promise<ResponseReportsDto> {
        return this.service.findAll(query);
    }

    @Get("posts/:postId/reports")
    @ApiOperation({
        summary: "Obtener reportes de una publicación",
        description:
            "Obtiene una página de los reportes realizados sobre una publicación."
    })
    @ApiParam({
        name: "postId",
        description: "ID de la publicación.",
        type: Number,
        example: 4
    })
    @ApiResponse({
        status: 200,
        description: "Página de reportes de la publicación.",
        type: ResponseReportsDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiNotFoundResponse()
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    findByPost(
        @Param("postId", ParseIntPipe) postId: number,
        @Query() query: FindReportsDto
    ): Promise<ResponseReportsDto> {
        return this.service.findByPost(postId, query);
    }

    @Delete("posts/:postId/reports/:reportId")
    @HttpCode(204)
    @ApiOperation({
        summary: "Eliminar un reporte",
        description: "Elimina un reporte de una publicación."
    })
    @ApiParam({
        name: "postId",
        description: "ID de la publicación.",
        type: Number,
        example: 4
    })
    @ApiParam({
        name: "reportId",
        description: "ID del reporte.",
        type: Number,
        example: 63
    })
    @ApiNoContentResponse()
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiNotFoundResponse()
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    delete(
        @Param("postId", ParseIntPipe) postId: number,
        @Param("reportId", ParseIntPipe) reportId: number
    ): Promise<void> {
        return this.service.delete(postId, reportId);
    }
}
