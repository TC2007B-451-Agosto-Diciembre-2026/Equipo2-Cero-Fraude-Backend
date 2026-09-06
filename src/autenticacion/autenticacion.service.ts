import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createHash, randomBytes } from 'node:crypto';
import { UsuariosRepository } from '../usuarios/usuarios.repository';
import { RegisterUsuarioDto } from './dto/register.dto';
import { LoginUsuarioDto } from './dto/login.dto';
import { sign, verify } from './jwt';
import { RefreshDto } from './dto/refresh.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { UsuarioResponseDto } from '../usuarios/dto/usuario-response.dto';

const ACCESS_TTL = 15 * 60; // 15 minutos
const REFRESH_TTL = 7 * 24 * 60 * 60; // 7 dias

@Injectable()
export class AutenticacionService {
    constructor(private readonly repository: UsuariosRepository) {}

    async register(dto: RegisterUsuarioDto): Promise<UsuarioResponseDto> {
        if(await this.repository.findByEmail(dto.email!)){
            throw new ConflictException("El email ya está registrado!");
        }
        const usuario = new Usuario();
        usuario.nombre = dto.name;
        usuario.email = dto.email;
        usuario.sal = this.generateSalt();

        usuario.hash = this.hash(dto.password + usuario.sal);
        usuario.estado = true;
        usuario.rol_id = 1;
        const usuario_guardado = await this.repository.save(usuario);
        return UsuarioResponseDto.fromEntity(usuario_guardado);
    }

    async login(dto: LoginUsuarioDto): Promise<{accessToken: string, refreshToken: string}>{
        const usuario = await this.repository.findByEmail(dto.email!);
        if(!usuario) {
            throw new UnauthorizedException("Credenciales inválidas!");
        }
        if(usuario.hash != this.hash(dto.password + usuario.sal!)) {
            throw new UnauthorizedException("Credenciales inválidas!");
        }

        const claims = { sub: usuario.id!, email: usuario.email! };
        const accessToken = sign({ ...claims, type: "access" }, ACCESS_TTL);
        const refreshToken = sign({ ...claims, type: "refresh" }, REFRESH_TTL);
        return { accessToken, refreshToken };
    }

    refresh(dto: RefreshDto ): { accessToken: string }{
        const payload = verify(dto.refreshToken!);
        if(!payload || payload.type !== "refresh") {
            throw new UnauthorizedException("Refresh token inválido!");
        }
        const accessToken = sign(
            { sub: payload.sub, email: payload.email, type: "access" },
            ACCESS_TTL,
        );
        return { accessToken };
    }

    private generateSalt(): string {
        const salt = randomBytes(8).toString('hex');
        return salt;
    }

    private hash(password_salt: string): string {
        return createHash("sha256").update(password_salt).digest("hex");
    }
}
