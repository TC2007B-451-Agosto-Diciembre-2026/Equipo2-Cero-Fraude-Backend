import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuariosRepository } from './usuarios.repository';
import { UsuarioResponseDto } from './dto/usuario-response.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
    constructor(private readonly repository : UsuariosRepository) {}

    create(data: any): UsuarioResponseDto {
        try{
            this.checkUsuario(data)
        } catch(e) {}
        const usuario = new Usuario();
        usuario.id = this.repository.nextId();
        usuario.nombre = data.nombre;
        usuario.email = data.email;
        usuario.fechaCreacion = new Date();
        this.repository.save(usuario);

        return UsuarioResponseDto.fromEntity(usuario);
    }

    findAll(): UsuarioResponseDto [] {
        return this.repository
        .findAll()
        .map((u) => UsuarioResponseDto.fromEntity(u));
    }

    findOne(id: string): UsuarioResponseDto {
        const usuario = this.repository.findAll().find((c) => c.id == id);
        if (!usuario) {
        throw new NotFoundException("Usuario " + id + " no encontrado");
        }
        return UsuarioResponseDto.fromEntity(usuario);
    }

    checkUsuario(data: any): boolean {
        if(!data){
            throw new Error("sin datos");
        }
         if(!data.nombre){
            throw new Error("sin nombre");
        }
         if(!data.email){
            throw new Error("sin email");
        }
        return true;
    }
}
