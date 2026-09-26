import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './entities/user.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class UserService {
    constructor(private readonly repository : UserRepository) {}

    async findAll(): Promise<UserResponseDto []> {
        const usuarios = await this.repository.findAll();
        return usuarios.map((u) => UserResponseDto.fromEntity(u));
    }

    async findOne(id: string): Promise<UserResponseDto> {
        const usuario = (await this.repository.findAll()).find((u) => u.id == id);
        if (!usuario) {
        throw new NotFoundException("Usuario " + id + " no encontrado");
        }
        return UserResponseDto.fromEntity(usuario);
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
