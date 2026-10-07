import {
    Body,
    Controller,
    HttpCode,
    Patch,
    Post,
    UseGuards
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags
} from "@nestjs/swagger";
import { RegisterDto } from "./dto/requests/register.dto";
import { ValidAccessDto } from "./dto/responses/valid-access.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/requests/login.dto";
import { RefreshDto } from "./dto/requests/refresh.dto";
import { UpdatePasswordDto } from "./dto/requests/update-password.dto";
import { CurrentUser } from "./current-user.decorator";
import type { JwtPayload } from "./jwt";
import { AuthGuard } from "./auth.guard";
import {
    ApiNoContentResponse,
    ApiBadRequestResponse,
    ApiUnauthorizedResponse,
    ApiConflictResponse
} from "../common/api-responses";
import { AccessTokenDto } from "./dto/responses/access-token.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @Post("register")
    @HttpCode(201)
     @ApiOperation({
        summary: "Registrar usuario",
        description: "Registra un nuevo usuario."
    })
    @ApiResponse({
        status: 201,
        description: "Usuario registrado correctamente.",
        type: ValidAccessDto,
    })
    @ApiBadRequestResponse()
    @ApiConflictResponse()
    register(
        @Body() dto: RegisterDto
    ): Promise<ValidAccessDto> {
        return this.service.register(dto);
    }

    @Post("login")
    @HttpCode(200)
    @ApiOperation({
        summary: "Iniciar sesión",
        description: "Autentica a un usuario."
    })
    @ApiResponse({
        status: 200,
        description: "Autenticación realizada correctamente.",
        type: ValidAccessDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    login(
        @Body() dto: LoginDto
    ): Promise<ValidAccessDto> {
        return this.service.login(dto);
    }
    @Post("refresh")
    @HttpCode(200)
    @ApiOperation({
        summary: "Actualizar token de acceso",
        description: "Genera un nuevo token de acceso utilizando un token de actualización válido.",
    })
    @ApiResponse({
        status: 200,
        description: "Token de acceso renovado correctamente.",
        type: AccessTokenDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    refresh(
        @Body() dto: RefreshDto
    ) : Promise<AccessTokenDto> {
        return this.service.refresh(dto);
    }

    @Patch("update-password")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @HttpCode(204)
    @ApiOperation({
        summary: "Actualizar contraseña",
        description: "Actualiza la contraseña del usuario autenticado."
    })
    @ApiNoContentResponse()
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    updatePassword(
        @CurrentUser() user: JwtPayload,
        @Body() dto: UpdatePasswordDto
    ): Promise<void> {
        return this.service.updatePassword(user.sub, dto);
    }
}
