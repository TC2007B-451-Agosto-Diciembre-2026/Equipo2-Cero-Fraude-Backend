import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuariosRepository } from './usuarios.repository';
import { UsuarioResponseDto } from './dto/usuario-response.dto';
import { Usuario } from './entities/usuario.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class UsuariosService {
    constructor(private readonly repository : UsuariosRepository) {}

    async findAll(): Promise<UsuarioResponseDto []> {
        const usuarios = await this.repository.findAll();
        return usuarios.map((u) => UsuarioResponseDto.fromEntity(u));
    }

    async findOne(id: string): Promise<UsuarioResponseDto> {
        const usuario = (await this.repository.findAll()).find((u) => u.id == id);
        if (!usuario) {
        throw new NotFoundException("Usuario " + id + " no encontrado");
        }
        return UsuarioResponseDto.fromEntity(usuario);
    }

    private checkUsuario(data: any): boolean {
        if(!data){
            throw new Error("sin datos");
        }
         if(!data.name){
            throw new Error("sin nombre");
        }
         if(!data.email){
            throw new Error("sin email");
        }
        return true;
    }
}
