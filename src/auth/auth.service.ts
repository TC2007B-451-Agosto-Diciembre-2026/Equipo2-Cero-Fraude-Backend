import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { sign, verify } from "./jwt";
import { RefreshDto } from "./dto/refresh.dto";
import { ValidAccessDto } from "./dto/valid-access.dto";
import { AuthRepository } from "./auth.repository";
import { AuthUserEntity } from "./entities/auth-user.entity";
import { ACCESS_TTL, REFRESH_TTL } from "../constants";

const bcrypt = require("bcrypt");

@Injectable()
export class AuthService {
    constructor(private readonly repository: AuthRepository) {}

    async register(dto: RegisterDto): Promise<ValidAccessDto> {
        if(await this.repository.findByEmail(dto.email!)){
            throw new ConflictException("El email ya está registrado!");
        }
        if(await this.repository.findByUsername(dto.username!)){
            throw new ConflictException("El usuario ya está registrado!");
        }
        const user = new AuthUserEntity();
        user.username = dto.username;
        user.email = dto.email;
        user.password_hash = await bcrypt.hash(dto.password!, 10);
        user.role_id = 1;
        await this.repository.save(user);

        const claims = { sub: user.id!, email: user.email!, role_id: user.role_id! };
        const access_token = sign({ ...claims, type: "access" }, ACCESS_TTL);
        const refresh_token = sign({ ...claims, type: "refresh" }, REFRESH_TTL);
        return ValidAccessDto.create(access_token, refresh_token);
    }

    async login(dto: LoginDto):Promise<ValidAccessDto> {

        let user;

        if(this.isValidEmail(dto.identifier!)){
            user = await this.repository.findByEmail(dto.identifier!);

        } else{
            user = await this.repository.findByUsername(dto.identifier!);
        }
        if(!user) {
            throw new UnauthorizedException("Credenciales inválidas!");
        }

        const valid_password = await bcrypt.compare(dto.password, user.password_hash);

        if (!valid_password || !user.is_active) {
            throw new UnauthorizedException("Credenciales inválidas!");
        }

        const claims = { sub: user.id!, email: user.email! };
        const access_token = sign({ ...claims, role_id: user.role_id, type: "access" }, ACCESS_TTL);
        const refresh_token = sign({ ...claims, role_id: user.role_id, type: "refresh" }, REFRESH_TTL);
        return ValidAccessDto.create(access_token, refresh_token);
    }

    refresh(dto: RefreshDto ): { accessToken: string }{
        const payload = verify(dto.refresh_token!);
        if(!payload || payload.type !== "refresh") {
            throw new UnauthorizedException("Refresh token inválido!");
        }
        const accessToken = sign(
            { sub: payload.sub, email: payload.email, role_id: payload.role_id, type: "access" },
            ACCESS_TTL,
        );
        return { accessToken };
    }

    isValidEmail(email : string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
}
