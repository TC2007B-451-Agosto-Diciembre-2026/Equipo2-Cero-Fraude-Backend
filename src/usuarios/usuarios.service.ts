import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuariosRepository } from './usuarios.repository';
import { UsuarioResponseDto } from './dto/usuario-response.dto';
import { Usuario } from './entities/usuario.entity';
import { randomBytes } from 'crypto';
import { generate } from 'rxjs';

@Injectable()
export class UsuariosService {
    constructor(private readonly repository : UsuariosRepository) {}

    async create(data: any): Promise<UsuarioResponseDto> {
        try{
            this.checkUsuario(data)
        } catch(e) {}
        const usuario = new Usuario();
        usuario.nombre = data.nombre;
        usuario.hash = "temp";
        usuario.sal = this.generateSalt();
        usuario.email = data.correo;
        usuario.estado = true;
        usuario.rol_id = 1;
        this.repository.save(usuario);

        return UsuarioResponseDto.fromEntity(usuario);
    }

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

    private generateSalt(): string {
        const salt = randomBytes(8).toString('hex');
        return salt;
    }

    private checkUsuario(data: any): boolean {
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
