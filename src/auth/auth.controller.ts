import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { ValidAccessDto } from './dto/valid-access.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';

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
    login(@Body() dto: LoginDto) {
        return this.service.login(dto);
    }

    @Post("refresh")
    @HttpCode(200)
    @ApiResponse({ status: 400, description: "" })
    @ApiResponse({ status: 401, description: "" })
    refresh(@Body() dto: RefreshDto) {
        return this.service.refresh(dto);
    }
}
