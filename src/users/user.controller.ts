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
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags
} from "@nestjs/swagger";
import { ResponseUserDto } from "./dto/responses/response-user.dto";
import { UpdateUserDto } from "./dto/requests/update-user.dto";
import { UpdateMeDto } from "./dto/requests/update-me.dto";
import { ADMIN_ROLE_ID } from "../common/constants";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CurrentUser } from "../auth/current-user.decorator";
import type { JwtPayload } from "../auth/jwt";
import { FindUsersDto } from "./dto/requests/find-users.dto";
import { ResponseUsersDto } from "./dto/responses/response-users.dto";
import {
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiUnauthorizedResponse
} from "../common/api-responses";

@ApiTags("users")
@ApiBearerAuth()
@Controller("users")
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get()
    @ApiOperation({
        summary: "Obtener usuarios",
        description: "Obtiene una página de usuarios."
    })
    @ApiResponse({
        status: 200,
        description: "Página de usuarios.",
        type: ResponseUsersDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    findAll(
        @Query() query: FindUsersDto
    ): Promise<ResponseUsersDto> {
        return this.service.findAll(query);
    }

    @Get("me")
    @ApiOperation({
        summary: "Obtener mi usuario",
        description: "Obtiene la información del usuario autenticado."
    })
    @ApiResponse({
        status: 200,
        description: "Información del usuario autenticado.",
        type: ResponseUserDto
    })
    @ApiUnauthorizedResponse()
    findMe(
        @CurrentUser() user: JwtPayload
    ): Promise<ResponseUserDto> {
        return this.service.findById(user.sub);
    }

    @Get(":userId")
    @ApiOperation({
        summary: "Obtener usuario",
        description: "Obtiene la información de un usuario mediante su UUID."
    })
    @ApiParam({
        name: "userId",
        description: "UUID del usuario.",
        type: String,
        format: "uuid",
        example: "550e8400-e29b-41d4-a716-446655440000"
    })
    @ApiResponse({
        status: 200,
        description: "Información del usuario.",
        type: ResponseUserDto
    })
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiNotFoundResponse()
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    findById(
        @Param("userId", ParseUUIDPipe) userId: string
    ): Promise<ResponseUserDto> {
        return this.service.findById(userId);
    }

    @Patch("me")
    @ApiOperation({
        summary: "Modificar mi usuario",
        description: "Modifica el nombre de usuario del usuario autenticado."
    })
    @ApiResponse({
        status: 200,
        description: "Modifica el nombre del usuario.",
        type: ResponseUserDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    updateMe(
        @CurrentUser() user: JwtPayload,
        @Body() dto: UpdateMeDto
    ): Promise<ResponseUserDto>{
        return this.service.updateMe(user.sub, dto);
    }

    @Patch(":userId")
    @ApiOperation({
        summary: "Modificar un usuario",
        description: "Modifica el estado de la cuenta o el rol de un usuario mediante su UUID."
    })
    @ApiResponse({
        status: 200,
        description: "Modifica el estado o rol de un usuario.",
        type: ResponseUserDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiNotFoundResponse()
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    updateById(
        @Param("userId", ParseUUIDPipe) userId: string,
        @Body() dto: UpdateUserDto
    ): Promise<ResponseUserDto> {
        return this.service.updateById(userId, dto);
    }
}
