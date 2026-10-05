import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";

import { CatalogueRepository } from "./catalogues.repository";

import { CreateReactionTypeDto } from "./dto/requests/create-reaction-type.dto";
import { CreateFraudCategoryDto } from "./dto/requests/create-fraud-category.dto";
import { CreateReportReasonDto } from "./dto/requests/create-report-reason.dto";
import { CreateFraudTypeDto } from "./dto/requests/create-fraud-type.dto";
import { CreateEvidenceTypeDto } from "./dto/requests/create-evidence-type.dto";
import { CreateAuthorityDto } from "./dto/requests/create-authority.dto";
import { UpdateAuthorityDto } from "./dto/requests/update-authority.dto";

import { ResponseUserRoleDto } from "./dto/responses/response-user-role.dto";
import { ResponseReactionTypeDto } from "./dto/responses/response-reaction-type.dto";
import { ResponsePostStatusDto } from "./dto/responses/response-post-status.dto";
import { ResponseFraudCategoryDto } from "./dto/responses/response-fraud-category.dto";
import { ResponseAuditActionDto } from "./dto/responses/response-audit-action.dto";
import { ResponseReportReasonDto } from "./dto/responses/response-report-reason.dto";
import { ResponseFraudTypeDto } from "./dto/responses/response-fraud-type.dto";
import { ResponseModifiedFieldDto } from "./dto/responses/response-modified-field.dto";
import { ResponseEvidenceTypeDto } from "./dto/responses/response-evidence-type.dto";
import { ResponseAuthorityDto } from "./dto/responses/response-authority.dto";
import { handleDuplicateError } from "../common/error-handler";

@Injectable()
export class CataloguesService {
    constructor(private readonly repository: CatalogueRepository) {}

    async findRoles(): Promise<ResponseUserRoleDto[]> {
        const roles = await this.repository.findRoles();
        return roles.map(ResponseUserRoleDto.fromEntity);
    }

    async findReactions(): Promise<ResponseReactionTypeDto[]> {
        const reactions = await this.repository.findReactions();
        return reactions.map(ResponseReactionTypeDto.fromEntity);
    }

    async createReaction(
        dto: CreateReactionTypeDto
    ): Promise<ResponseReactionTypeDto> {
        try {
            const reaction = await this.repository.createReaction(dto);
            return ResponseReactionTypeDto.fromEntity(reaction);
        } catch (error) {
            handleDuplicateError(error);
            throw error;
        }
    }

    async findStates(): Promise<ResponsePostStatusDto[]> {
        const states = await this.repository.findStates();
        return states.map(ResponsePostStatusDto.fromEntity);
    }

    async findCategories(): Promise<ResponseFraudCategoryDto[]> {
        const categories = await this.repository.findCategories();
        return categories.map(ResponseFraudCategoryDto.fromEntity);
    }

    async createCategory(
        dto: CreateFraudCategoryDto
    ): Promise<ResponseFraudCategoryDto> {
        try {
            const category = await this.repository.createCategory(dto);
            return ResponseFraudCategoryDto.fromEntity(category);
        } catch (error) {
            handleDuplicateError(error);
            throw error;
        }
    }

    async findAuditActions(): Promise<ResponseAuditActionDto[]> {
        const actions = await this.repository.findAuditActions();
        return actions.map(ResponseAuditActionDto.fromEntity);
    }

    async findReportReasons(): Promise<ResponseReportReasonDto[]> {
        const reasons = await this.repository.findReportReasons();
        return reasons.map(ResponseReportReasonDto.fromEntity);
    }

    async createReportReason(
        dto: CreateReportReasonDto
    ): Promise<ResponseReportReasonDto> {
        try {
            const reason = await this.repository.createReportReason(dto);
            return ResponseReportReasonDto.fromEntity(reason);
        } catch (error) {
            handleDuplicateError(error);
            throw error;
        }
    }

    async findTypes(): Promise<ResponseFraudTypeDto[]> {
        const types = await this.repository.findTypes();
        return types.map(ResponseFraudTypeDto.fromEntity);
    }

    async createType(
        dto: CreateFraudTypeDto
    ): Promise<ResponseFraudTypeDto> {
        try {
            const type = await this.repository.createType(dto);
            return ResponseFraudTypeDto.fromEntity(type);
        } catch (error) {
            handleDuplicateError(error);
            throw error;
        }
    }

    async findModifiedFields(): Promise<ResponseModifiedFieldDto[]> {
        const fields = await this.repository.findModifiedFields();
        return fields.map(ResponseModifiedFieldDto.fromEntity);
    }

    async findEvidenceTypes(): Promise<ResponseEvidenceTypeDto[]> {
        const types = await this.repository.findEvidenceTypes();
        return types.map(ResponseEvidenceTypeDto.fromEntity);
    }

    async createEvidenceType(
        dto: CreateEvidenceTypeDto
    ): Promise<ResponseEvidenceTypeDto> {
        try {
            const type = await this.repository.createEvidenceType(dto);
            return ResponseEvidenceTypeDto.fromEntity(type);
        } catch (error) {
            handleDuplicateError(error);
            throw error;
        }
    }

    async findAuthorities(): Promise<ResponseAuthorityDto[]> {
        const authorities = await this.repository.findAuthorities();
        return authorities.map(ResponseAuthorityDto.fromEntity);
    }

    async createAuthority(
        dto: CreateAuthorityDto
    ): Promise<ResponseAuthorityDto> {
        try {
            const authority = await this.repository.createAuthority(dto);
            return ResponseAuthorityDto.fromEntity(authority);
        } catch (error) {
            handleDuplicateError(error);
            throw error;
        }
    }

    async updateAuthority(
        id: number,
        dto: UpdateAuthorityDto
    ): Promise<ResponseAuthorityDto> {
        if(dto.name === undefined && dto.description === undefined){
            throw new BadRequestException("Al menos un campo requerido.");
        }

        try {
            const authority = await this.repository.updateAuthority(id, dto);

            if (!authority) {
                throw new NotFoundException("Autoridad no encontrada.");
            }

            return ResponseAuthorityDto.fromEntity(authority);
        } catch (error) {
            handleDuplicateError(error);
            throw error;
        }
    }
}
