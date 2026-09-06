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

import { UsuariosService } from './usuarios.service';
import { RegisterUsuarioDto } from '../autenticacion/dto/register.dto';
import { UsuarioResponseDto } from './dto/usuario-response.dto';
import { AutenticacionGuard } from '../autenticacion/autenticacion.guard';

@Controller("usuarios")
@UseGuards(AutenticacionGuard)
export class UsuariosController {
    constructor(private readonly service: UsuariosService) {}

    @Get()
    findAll(): Promise<UsuarioResponseDto []> {
        return this.service.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string): Promise<UsuarioResponseDto> {
        return this.service.findOne(id);
    }
}
