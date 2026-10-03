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

    @Get("me")
    @ApiResponse({
        status: 200,
        description: "Información del usuario autenticado.",
        type: ResponseUserDto
    })
    @ApiResponse({ status: 401, description: "" })
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

    @Patch("me")
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    updateMe(
        @CurrentUser() user: JwtPayload,
        @Body() dto: UpdateMeDto
    ): Promise<ResponseUserDto>{
        return this.service.updateMe(user.sub, dto);
    }

    @Patch(":userId")
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    @ApiResponse({ status: 403, description: "" })
    @ApiResponse({ status: 404, description: "" })
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    updateById(
        @Param("userId", ParseUUIDPipe) userId: string,
        @Body() dto: UpdateUserDto
    ): Promise<ResponseUserDto> {
        return this.service.updateById(userId, dto);
    }
}
