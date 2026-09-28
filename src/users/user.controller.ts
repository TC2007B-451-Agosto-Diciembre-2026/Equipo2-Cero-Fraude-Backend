import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  UseGuards,
} from "@nestjs/common";

import { UserService } from "./user.service";
import { AuthGuard } from "../auth/auth.guard";
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResponseUserDto } from "./dto/response-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateMeDto } from "./dto/update-me.dto";
import { ADMIN_ROLE_ID } from "../constants";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CurrentUser } from "../auth/current-user.decorator";
import type { JwtPayload } from "../auth/jwt";
import { FindUsersDto } from "./dto/find-users.dto";
import { ResponseUsersDto } from "./dto/response-users.dto";

@ApiTags("users")
@ApiBearerAuth()
@Controller("users")
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get()
    @ApiQuery({
        name: "page",
        required: false,
        type: Number,
        description: "Página de resultados. Comienza en 1.",
        example: 1,
    })
    @ApiQuery({
        name: "is_active",
        required: false,
        type: Boolean,
        description: "Filtra por estado de la cuenta.",
        example: true,
    })
    @ApiQuery({
        name: "role_id",
        required: false,
        type: Number,
        description: "Filtra por identificador de rol.",
        example: 1,
    })
    @ApiQuery({
        name: "initial_date",
        required: false,
        type: String,
        description: "Fecha inicial en formato ISO 8601.",
        example: "2026-09-01T00:00:00.000Z",
    })
    @ApiQuery({
        name: "final_date",
        required: false,
        type: String,
        description: "Fecha final en formato ISO 8601.",
        example: "2026-09-27T23:59:59.999Z",
    })
    @ApiResponse({
        status: 200,
        description: "Página de usuarios.",
        type: ResponseUsersDto,
    })
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    findAll(
        @Query() query: FindUsersDto
    ): Promise<ResponseUsersDto> {
        return this.service.findAll(query);
    }

    @ApiResponse({
        status: 200,
        description: "Información del usuario autenticado.",
        type: ResponseUserDto
    })
    @ApiResponse({ status: 401, description: "" })
    @Get("me")
    findMe(
        @CurrentUser() user: JwtPayload
    ): Promise<ResponseUserDto> {
        return this.service.findById(user.sub);
    }

    @Get(":userId")
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @ApiResponse({ status: 404, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    findById(@Param("userId", ParseUUIDPipe) userId: string): Promise<ResponseUserDto> {
        return this.service.findById(userId);
    }

    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    @Patch("me")
    updateMe(
        @CurrentUser() user: JwtPayload,
        @Body() dto: UpdateMeDto
    ): Promise<ResponseUserDto>{
        return this.service.updateMe(user.sub, dto);
    }

    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @ApiResponse({ status: 404, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    @Patch(":userId")
    updateById(
        @Param("userId", ParseUUIDPipe) userId: string,
        @Body() dto: UpdateUserDto
    ): Promise<ResponseUserDto> {
        return this.service.updateById(userId, dto);
    }
}
