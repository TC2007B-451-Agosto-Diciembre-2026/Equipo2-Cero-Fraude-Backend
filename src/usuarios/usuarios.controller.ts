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
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioResponseDto } from './dto/usuario-response.dto';

@Controller("usuarios")
export class UsuariosController {
    constructor(private readonly service: UsuariosService) {}

    @Post()
    create(@Body() dto: CreateUsuarioDto): Promise<UsuarioResponseDto> {
        return this.service.create(dto);
    }

    @Get()
    findAll(): Promise<UsuarioResponseDto []> {
        return this.service.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string): Promise<UsuarioResponseDto> {
        return this.service.findOne(id);
    }
}
