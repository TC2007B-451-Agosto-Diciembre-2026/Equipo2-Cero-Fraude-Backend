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

import { AuthGuard } from "../auth/auth.guard";
import { CataloguesService } from "./catalogues.service";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateReactionTypeDto } from "./dto/requests/create-reaction-type.dto";
import { CreateFraudCategoryDto} from "./dto/requests/create-fraud-category.dto";
import { CreateReportReasonDto } from "./dto/requests/create-report-reason.dto";
import { CreateFraudTypeDto } from "./dto/requests/create-fraud-type.dto";
import { CreateEvidenceTypeDto } from "./dto/requests/create-evidence-type.dto";
import { CreateAuthorityDto } from "./dto/requests/create-authority.dto";
import { UpdateAuthorityDto } from "./dto/requests/update-authority.dto";

import { ADMIN_ROLE_ID } from "../constants";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
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
@Controller("")
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class CataloguesController {
    constructor(private readonly service: CataloguesService) {}

    @ApiResponse({ status: 200, type: ResponseUserRoleDto, isArray: true})
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    @Get("roles")
    findRoles(): Promise<ResponseUserRoleDto[]> {
        return this.service.findRoles();
    }


    @ApiResponse({ status: 200, type: ResponseReactionTypeDto, isArray: true})
    @ApiResponse({ status: 401, description: "" })
    @Get("reactions")
    findReactions(): Promise<ResponseReactionTypeDto[]> {
        return this.service.findReactions();
    }

    @ApiResponse({status: 201, type: ResponseReactionTypeDto})
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @ApiResponse({ status: 409, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    @Post("reactions")
    createReaction(
        @Body() dto: CreateReactionTypeDto,
    ): Promise<ResponseReactionTypeDto> {
        return this.service.createReaction(dto);
    }


    @ApiResponse({ status: 200, type: ResponsePostStatusDto, isArray: true})
    @ApiResponse({ status: 401, description: "" })
    @Get("states")
    findStates(): Promise<ResponsePostStatusDto[]> {
        return this.service.findStates();
    }


    @ApiResponse({ status: 200, type: ResponseFraudCategoryDto, isArray: true})
    @ApiResponse({ status: 401, description: "" })
    @Get("categories")
    findCategories(): Promise<ResponseFraudCategoryDto[]> {
        return this.service.findCategories();
    }

    @ApiResponse({status: 201, type: ResponseFraudCategoryDto})
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @ApiResponse({ status: 409, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    @Post("categories")
    createCategory(
        @Body() dto: CreateFraudCategoryDto,
    ): Promise<ResponseFraudCategoryDto> {
        return this.service.createCategory(dto);
    }

    @ApiResponse({ status: 200, type: ResponseAuditActionDto, isArray: true})
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    @Get("audit-actions")
    findAuditActions(): Promise<ResponseAuditActionDto[]> {
        return this.service.findAuditActions();
    }


    @ApiResponse({ status: 200, type: ResponseReportReasonDto, isArray: true})
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @Get("report-reasons")
    findReportReasons(): Promise<ResponseReportReasonDto[]> {
        return this.service.findReportReasons();
    }

    @ApiResponse({status: 201, type: ResponseReportReasonDto})
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @ApiResponse({ status: 409, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    @Post("report-reasons")
    createReportReason(
        @Body() dto: CreateReportReasonDto,
    ): Promise<ResponseReportReasonDto> {
        return this.service.createReportReason(dto);
    }


    @ApiResponse({ status: 200, type: ResponseFraudTypeDto, isArray: true})
    @ApiResponse({ status: 401, description: "" })
    @Get("types")
    findTypes(): Promise<ResponseFraudTypeDto[]> {
        return this.service.findTypes();
    }

    @ApiResponse({status: 201, type: ResponseFraudTypeDto})
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @ApiResponse({ status: 409, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    @Post("types")
    createType(
        @Body() dto: CreateFraudTypeDto,
    ): Promise<ResponseFraudTypeDto> {
        return this.service.createType(dto);
    }


    @ApiResponse({ status: 200, type: ResponseModifiedFieldDto, isArray: true})
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    @Get("modified-fields")
    findModifiedFields(): Promise<ResponseModifiedFieldDto[]> {
        return this.service.findModifiedFields();
    }


    @ApiResponse({ status: 200, type: ResponseEvidenceTypeDto, isArray: true})
    @ApiResponse({ status: 401, description: "" })
    @Get("evidence-types")
    findEvidenceTypes(): Promise<ResponseEvidenceTypeDto[]> {
        return this.service.findEvidenceTypes();
    }

    @ApiResponse({status: 201, type: ResponseEvidenceTypeDto})
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @ApiResponse({ status: 409, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    @Post("evidence-types")
    createEvidenceType(
        @Body() dto: CreateEvidenceTypeDto,
    ): Promise<ResponseEvidenceTypeDto> {
        return this.service.createEvidenceType(dto);
    }


    @ApiResponse({ status: 200, type: ResponseAuthorityDto, isArray: true})
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    @Get("authorities")
    findAuthorities(): Promise<ResponseAuthorityDto[]> {
        return this.service.findAuthorities();
    }

    @ApiResponse({status: 201, type: ResponseAuthorityDto})
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @ApiResponse({ status: 409, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    @Post("authorities")
    createAuthority(
        @Body() dto: CreateAuthorityDto,
    ): Promise<ResponseAuthorityDto> {
        return this.service.createAuthority(dto);
    }

    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @ApiResponse({ status: 404, description: "" })
    @ApiResponse({ status: 409, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    @Patch("authorities/:authorityId")
    updateAuthority(
        @Param("authorityId", ParseIntPipe) authorityId: number,
        @Body() dto: UpdateAuthorityDto
    ): Promise<ResponseAuthorityDto> {
        return this.service.updateAuthority(authorityId, dto);
    }
}
