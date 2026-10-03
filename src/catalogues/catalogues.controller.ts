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

    @Get("roles")
    @ApiResponse({ status: 200, type: ResponseUserRoleDto, isArray: true})
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    findRoles(): Promise<ResponseUserRoleDto[]> {
        return this.service.findRoles();
    }


    @Get("reactions")
    @ApiResponse({ status: 200, type: ResponseReactionTypeDto, isArray: true})
    @ApiResponse({ status: 401, description: "" })
    findReactions(): Promise<ResponseReactionTypeDto[]> {
        return this.service.findReactions();
    }

    @Post("reactions")
    @ApiResponse({status: 201, type: ResponseReactionTypeDto})
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @ApiResponse({ status: 409, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    createReaction(
        @Body() dto: CreateReactionTypeDto,
    ): Promise<ResponseReactionTypeDto> {
        return this.service.createReaction(dto);
    }


    @Get("states")
    @ApiResponse({ status: 200, type: ResponsePostStatusDto, isArray: true})
    @ApiResponse({ status: 401, description: "" })
    findStates(): Promise<ResponsePostStatusDto[]> {
        return this.service.findStates();
    }


    @Get("categories")
    @ApiResponse({ status: 200, type: ResponseFraudCategoryDto, isArray: true})
    @ApiResponse({ status: 401, description: "" })
    findCategories(): Promise<ResponseFraudCategoryDto[]> {
        return this.service.findCategories();
    }

    @Post("categories")
    @ApiResponse({status: 201, type: ResponseFraudCategoryDto})
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @ApiResponse({ status: 409, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    createCategory(
        @Body() dto: CreateFraudCategoryDto,
    ): Promise<ResponseFraudCategoryDto> {
        return this.service.createCategory(dto);
    }


    @Get("audit-actions")
    @ApiResponse({ status: 200, type: ResponseAuditActionDto, isArray: true})
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    findAuditActions(): Promise<ResponseAuditActionDto[]> {
        return this.service.findAuditActions();
    }


    @Get("report-reasons")
    @ApiResponse({ status: 200, type: ResponseReportReasonDto, isArray: true})
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    findReportReasons(): Promise<ResponseReportReasonDto[]> {
        return this.service.findReportReasons();
    }

    @Post("report-reasons")
    @ApiResponse({status: 201, type: ResponseReportReasonDto})
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @ApiResponse({ status: 409, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    createReportReason(
        @Body() dto: CreateReportReasonDto,
    ): Promise<ResponseReportReasonDto> {
        return this.service.createReportReason(dto);
    }


    @Get("types")
    @ApiResponse({ status: 200, type: ResponseFraudTypeDto, isArray: true})
    @ApiResponse({ status: 401, description: "" })
    findTypes(): Promise<ResponseFraudTypeDto[]> {
        return this.service.findTypes();
    }

    @Post("types")
    @ApiResponse({status: 201, type: ResponseFraudTypeDto})
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @ApiResponse({ status: 409, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    createType(
        @Body() dto: CreateFraudTypeDto,
    ): Promise<ResponseFraudTypeDto> {
        return this.service.createType(dto);
    }


    @Get("modified-fields")
    @ApiResponse({ status: 200, type: ResponseModifiedFieldDto, isArray: true})
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    findModifiedFields(): Promise<ResponseModifiedFieldDto[]> {
        return this.service.findModifiedFields();
    }


    @Get("evidence-types")
    @ApiResponse({ status: 200, type: ResponseEvidenceTypeDto, isArray: true})
    @ApiResponse({ status: 401, description: "" })
    findEvidenceTypes(): Promise<ResponseEvidenceTypeDto[]> {
        return this.service.findEvidenceTypes();
    }

    @Post("evidence-types")
    @ApiResponse({status: 201, type: ResponseEvidenceTypeDto})
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @ApiResponse({ status: 409, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    createEvidenceType(
        @Body() dto: CreateEvidenceTypeDto,
    ): Promise<ResponseEvidenceTypeDto> {
        return this.service.createEvidenceType(dto);
    }


    @Get("authorities")
    @ApiResponse({ status: 200, type: ResponseAuthorityDto, isArray: true})
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    findAuthorities(): Promise<ResponseAuthorityDto[]> {
        return this.service.findAuthorities();
    }

    @Post("authorities")
    @ApiResponse({status: 201, type: ResponseAuthorityDto})
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @ApiResponse({ status: 409, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    createAuthority(
        @Body() dto: CreateAuthorityDto,
    ): Promise<ResponseAuthorityDto> {
        return this.service.createAuthority(dto);
    }

    @Patch("authorities/:authorityId")
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @ApiResponse({ status: 404, description: "" })
    @ApiResponse({ status: 409, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    updateAuthority(
        @Param("authorityId", ParseIntPipe) authorityId: number,
        @Body() dto: UpdateAuthorityDto
    ): Promise<ResponseAuthorityDto> {
        return this.service.updateAuthority(authorityId, dto);
    }
}
