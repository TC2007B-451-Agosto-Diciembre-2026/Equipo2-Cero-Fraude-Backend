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
import { RegisterUsuarioDto } from './dto/register.dto';
import { UsuarioResponseDto } from '../users/dto/user-response.dto';
import { AutenticacionService } from './auth.service';
import { LoginUsuarioDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';

@Controller("autentication")
export class AutenticacionController {
    constructor(private readonly service: AutenticacionService) {}

    @Post("register")
    register(@Body() dto: RegisterUsuarioDto): Promise<UsuarioResponseDto> {
        return this.service.register(dto);
    }

    @Post("login")
    @HttpCode(200)
    login(@Body() dto: LoginUsuarioDto) {
        return this.service.login(dto);
    }

    @Post("refresh")
    @HttpCode(200)
    refresh(@Body() dto: RefreshDto) {
        return this.service.refresh(dto);
    }
}
