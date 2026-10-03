import {
  Body,
  Controller,
  HttpCode,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
    ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { RegisterDto } from "./dto/register.dto";
import { ValidAccessDto } from "./dto/valid-access.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RefreshDto } from "./dto/refresh.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { CurrentUser } from "./current-user.decorator";
import type { JwtPayload } from "./jwt";
import { AuthGuard } from "./auth.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @Post("register")
    @HttpCode(201)
    @ApiResponse({ status: 201, type: ValidAccessDto })
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 409, description: "" })
    register(@Body() dto: RegisterDto): Promise<ValidAccessDto> {
        return this.service.register(dto);
    }

    @Post("login")
    @HttpCode(200)
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    login(@Body() dto: LoginDto): Promise<ValidAccessDto> {
        return this.service.login(dto);
    }

    @Post("refresh")
    @HttpCode(200)
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    refresh(@Body() dto: RefreshDto) : { accessToken: string } {
        return this.service.refresh(dto);
    }

    @Patch("update-password")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @HttpCode(204)
    @ApiResponse({ status: 204, description: "" })
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    updatePassword(
        @CurrentUser() user: JwtPayload,
        @Body() dto: UpdatePasswordDto
    ): Promise<void> {
        return this.service.updatePassword(user.sub, dto);
    }
}
