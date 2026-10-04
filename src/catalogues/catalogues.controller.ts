import {
    Controller,
    Get,
    Post,
    Patch,
    UseGuards,
    Param,
    Body,
    ParseIntPipe,
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { ADMIN_ROLE_ID } from "../common/constants";
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiUnauthorizedResponse,
} from "../common/api-responses";

import { CataloguesService } from "./catalogues.service";

import { CreateReactionTypeDto } from "./dto/requests/create-reaction-type.dto";
import { CreateFraudCategoryDto } from "./dto/requests/create-fraud-category.dto";
import { CreateReportReasonDto } from "./dto/requests/create-report-reason.dto";
import { CreateFraudTypeDto } from "./dto/requests/create-fraud-type.dto";
import { CreateEvidenceTypeDto } from "./dto/requests/create-evidence-type.dto";
import { CreateAuthorityDto } from "./dto/requests/create-authority.dto";
import { UpdateAuthorityDto } from "./dto/requests/update-authority.dto";

import { ResponseFraudCategoryDto } from "./dto/responses/response-fraud-category.dto";
import { ResponsePostStatusDto } from "./dto/responses/response-post-status.dto";
import { ResponseUserRoleDto } from "./dto/responses/response-user-role.dto";
import { ResponseReactionTypeDto } from "./dto/responses/response-reaction-type.dto";
import { ResponseAuditActionDto } from "./dto/responses/response-audit-action.dto";
import { ResponseReportReasonDto } from "./dto/responses/response-report-reason.dto";
import { ResponseFraudTypeDto } from "./dto/responses/response-fraud-type.dto";
import { ResponseModifiedFieldDto } from "./dto/responses/response-modified-field.dto";
import { ResponseEvidenceTypeDto } from "./dto/responses/response-evidence-type.dto";
import { ResponseAuthorityDto } from "./dto/responses/response-authority.dto";

@ApiTags("catalogues")
@ApiBearerAuth()
@Controller("")
@UseGuards(AuthGuard)
export class CataloguesController {
    constructor(private readonly service: CataloguesService) {}

    @Get("roles")
    @ApiOperation({
        summary: "Obtener roles",
        description: "Obtiene la lista de roles disponibles."
    })
    @ApiResponse({
        status: 200,
        description: "Lista de roles.",
        type: ResponseUserRoleDto,
        isArray: true
    })
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    findRoles(): Promise<ResponseUserRoleDto[]> {
        return this.service.findRoles();
    }

    @Get("reactions")
    @ApiOperation({
        summary: "Obtener tipos de reacción",
        description: "Obtiene la lista de tipos de reacción disponibles."
    })
    @ApiResponse({
        status: 200,
        description: "Lista de tipos de reacción.",
        type: ResponseReactionTypeDto,
        isArray: true
    })
    @ApiUnauthorizedResponse()
    findReactions(): Promise<ResponseReactionTypeDto[]> {
        return this.service.findReactions();
    }

    @Post("reactions")
    @ApiOperation({
        summary: "Crear tipo de reacción",
        description: "Crea un nuevo tipo de reacción."
    })
    @ApiResponse({
        status: 201,
        description: "Tipo de reacción creado correctamente.",
        type: ResponseReactionTypeDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiConflictResponse()
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    createReaction(
        @Body() dto: CreateReactionTypeDto,
    ): Promise<ResponseReactionTypeDto> {
        return this.service.createReaction(dto);
    }

    @Get("states")
    @ApiOperation({
        summary: "Obtener estados de publicación",
        description: "Obtiene la lista de estados disponibles para las publicaciones."
    })
    @ApiResponse({
        status: 200,
        description: "Lista de estados de publicación.",
        type: ResponsePostStatusDto,
        isArray: true
    })
    @ApiUnauthorizedResponse()
    findStates(): Promise<ResponsePostStatusDto[]> {
        return this.service.findStates();
    }

    @Get("categories")
    @ApiOperation({
        summary: "Obtener categorías de fraude",
        description: "Obtiene la lista de categorías de fraude disponibles."
    })
    @ApiResponse({
        status: 200,
        description: "Lista de categorías de fraude.",
        type: ResponseFraudCategoryDto,
        isArray: true
    })
    @ApiUnauthorizedResponse()
    findCategories(): Promise<ResponseFraudCategoryDto[]> {
        return this.service.findCategories();
    }

    @Post("categories")
    @ApiOperation({
        summary: "Crear categoría de fraude",
        description: "Crea una nueva categoría de fraude."
    })
    @ApiResponse({
        status: 201,
        description: "Categoría de fraude creada correctamente.",
        type: ResponseFraudCategoryDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiConflictResponse()
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    createCategory(
        @Body() dto: CreateFraudCategoryDto,
    ): Promise<ResponseFraudCategoryDto> {
        return this.service.createCategory(dto);
    }

    @Get("audit-actions")
    @ApiOperation({
        summary: "Obtener acciones de auditoría",
        description: "Obtiene la lista de acciones disponibles para los registros de auditoría."
    })
    @ApiResponse({
        status: 200,
        description: "Lista de acciones de auditoría.",
        type: ResponseAuditActionDto,
        isArray: true
    })
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    findAuditActions(): Promise<ResponseAuditActionDto[]> {
        return this.service.findAuditActions();
    }

    @Get("report-reasons")
    @ApiOperation({
        summary: "Obtener motivos de reporte",
        description: "Obtiene la lista de motivos disponibles para reportar publicaciones."
    })
    @ApiResponse({
        status: 200,
        description: "Lista de motivos de reporte.",
        type: ResponseReportReasonDto,
        isArray: true
    })
    @ApiUnauthorizedResponse()
    findReportReasons(): Promise<ResponseReportReasonDto[]> {
        return this.service.findReportReasons();
    }

    @Post("report-reasons")
    @ApiOperation({
        summary: "Crear motivo de reporte",
        description: "Crea un nuevo motivo para reportar publicaciones."
    })
    @ApiResponse({
        status: 201,
        description: "Motivo de reporte creado correctamente.",
        type: ResponseReportReasonDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiConflictResponse()
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    createReportReason(
        @Body() dto: CreateReportReasonDto,
    ): Promise<ResponseReportReasonDto> {
        return this.service.createReportReason(dto);
    }

    @Get("types")
    @ApiOperation({
        summary: "Obtener tipos de fraude",
        description: "Obtiene la lista de tipos de fraude disponibles."
    })
    @ApiResponse({
        status: 200,
        description: "Lista de tipos de fraude.",
        type: ResponseFraudTypeDto,
        isArray: true
    })
    @ApiUnauthorizedResponse()
    findTypes(): Promise<ResponseFraudTypeDto[]> {
        return this.service.findTypes();
    }

    @Post("types")
    @ApiOperation({
        summary: "Crear tipo de fraude",
        description: "Crea un nuevo tipo de fraude."
    })
    @ApiResponse({
        status: 201,
        description: "Tipo de fraude creado correctamente.",
        type: ResponseFraudTypeDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiConflictResponse()
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    createType(
        @Body() dto: CreateFraudTypeDto,
    ): Promise<ResponseFraudTypeDto> {
        return this.service.createType(dto);
    }

    @Get("modified-fields")
    @ApiOperation({
        summary: "Obtener campos modificables",
        description: "Obtiene la lista de campos disponibles para los registros de auditoría."
    })
    @ApiResponse({
        status: 200,
        description: "Lista de campos modificables.",
        type: ResponseModifiedFieldDto,
        isArray: true
    })
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    findModifiedFields(): Promise<ResponseModifiedFieldDto[]> {
        return this.service.findModifiedFields();
    }

    @Get("evidence-types")
    @ApiOperation({
        summary: "Obtener tipos de evidencia",
        description: "Obtiene la lista de tipos de evidencia disponibles."
    })
    @ApiResponse({
        status: 200,
        description: "Lista de tipos de evidencia.",
        type: ResponseEvidenceTypeDto,
        isArray: true
    })
    @ApiUnauthorizedResponse()
    findEvidenceTypes(): Promise<ResponseEvidenceTypeDto[]> {
        return this.service.findEvidenceTypes();
    }

    @Post("evidence-types")
    @ApiOperation({
        summary: "Crear tipo de evidencia",
        description: "Crea un nuevo tipo de evidencia."
    })
    @ApiResponse({
        status: 201,
        description: "Tipo de evidencia creado correctamente.",
        type: ResponseEvidenceTypeDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiConflictResponse()
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    createEvidenceType(
        @Body() dto: CreateEvidenceTypeDto,
    ): Promise<ResponseEvidenceTypeDto> {
        return this.service.createEvidenceType(dto);
    }

    @Get("authorities")
    @ApiOperation({
        summary: "Obtener autoridades",
        description: "Obtiene la lista de autoridades disponibles."
    })
    @ApiResponse({
        status: 200,
        description: "Lista de autoridades.",
        type: ResponseAuthorityDto,
        isArray: true
    })
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    findAuthorities(): Promise<ResponseAuthorityDto[]> {
        return this.service.findAuthorities();
    }

    @Post("authorities")
    @ApiOperation({
        summary: "Crear autoridad",
        description: "Crea una nueva autoridad."
    })
    @ApiResponse({
        status: 201,
        description: "Autoridad creada correctamente.",
        type: ResponseAuthorityDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiConflictResponse()
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    createAuthority(
        @Body() dto: CreateAuthorityDto,
    ): Promise<ResponseAuthorityDto> {
        return this.service.createAuthority(dto);
    }

    @Patch("authorities/:authorityId")
    @ApiOperation({
        summary: "Modificar autoridad",
        description: "Modifica una autoridad mediante su identificador."
    })
    @ApiParam({
        name: "authorityId",
        description: "Identificador de la autoridad.",
        type: Number,
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: "Autoridad actualizada correctamente.",
        type: ResponseAuthorityDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiNotFoundResponse()
    @ApiConflictResponse()
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    updateAuthority(
        @Param("authorityId", ParseIntPipe) authorityId: number,
        @Body() dto: UpdateAuthorityDto,
    ): Promise<ResponseAuthorityDto> {
        return this.service.updateAuthority(authorityId, dto);
    }
}
