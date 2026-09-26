import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { RegisterUsuarioDto } from '../auth/dto/register.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { AutenticacionGuard } from '../auth/auth.guard';

@Controller("users")
@UseGuards(AutenticacionGuard)
export class UsuarioController {
    constructor(private readonly service: UserService) {}

    @Get()
    findAll(): Promise<UserResponseDto []> {
        return this.service.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string): Promise<UserResponseDto> {
        return this.service.findOne(id);
    }
}
