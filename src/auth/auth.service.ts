import {
    BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { RegisterDto } from "./dto/requests/register.dto";
import { LoginDto } from "./dto/requests/login.dto";
import { sign, verify } from "./jwt";
import { RefreshDto } from "./dto/requests/refresh.dto";
import { ValidAccessDto } from "./dto/responses/valid-access.dto";
import { AuthRepository } from "./auth.repository";
import { AuthUserEntity } from "./entities/auth-user.entity";
import { ACCESS_TTL, MINIMUM_PASSWORD_LENGTH, REFRESH_TTL } from "../common/constants";
import { UpdatePasswordDto } from "./dto/requests/update-password.dto";
import { UserRepository } from "../users/user.repository";
import { AccessTokenDto } from "./dto/responses/access-token.dto";

const bcrypt = require("bcrypt");

@Injectable()
export class AuthService {
    constructor(
        private readonly repository: AuthRepository,
        private readonly user_repository : UserRepository,
    ) {}

    async register(
        dto: RegisterDto
    ): Promise<ValidAccessDto> {
        if(dto.password.length < MINIMUM_PASSWORD_LENGTH){
            throw new BadRequestException("La contraseña debe ser de 8 o más carácteres.")
        }
        if(await this.repository.findByEmail(dto.email!)){
            throw new ConflictException("El usuario o correo ya están registrados.");
        }
        if(await this.repository.findByUsername(dto.username!)){
            throw new ConflictException("El usuario o correo ya están registrados.");
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

    async login(
        dto: LoginDto
    ):Promise<ValidAccessDto> {

        let user;

        if(this.isValidEmail(dto.identifier!)){
            user = await this.repository.findByEmail(dto.identifier!);

        } else{
            user = await this.repository.findByUsername(dto.identifier!);
        }
        if(!user) {
            throw new UnauthorizedException("Credenciales inválidas.");
        }

        const valid_password = await bcrypt.compare(dto.password, user.password_hash);

        if (!valid_password || !user.is_active) {
            throw new UnauthorizedException("Credenciales inválidas.");
        }

        const claims = { sub: user.id!, email: user.email! };
        const access_token = sign({ ...claims, role_id: user.role_id, type: "access" }, ACCESS_TTL);
        const refresh_token = sign({ ...claims, role_id: user.role_id, type: "refresh" }, REFRESH_TTL);
        return ValidAccessDto.create(access_token, refresh_token);
    }

    refresh(
        dto: RefreshDto
    ): AccessTokenDto {
        const payload = verify(dto.refresh_token!);
        if(!payload || payload.type !== "refresh") {
            throw new UnauthorizedException("Refresh token inválido.");
        }
        const access_token = sign(
            { sub: payload.sub, email: payload.email, role_id: payload.role_id, type: "access" },
            ACCESS_TTL,
        );
        return AccessTokenDto.create(access_token);
    }


    async updatePassword(
        id: string,
        dto: UpdatePasswordDto
    ): Promise<void> {
        if(dto.old_password == undefined){
            throw new BadRequestException(
                "Falta la contraseña actual."
            );
        }
        if(dto.new_password == undefined){
            throw new BadRequestException(
                "Falta la contraseña nueva."
            );
        }
        if(dto.new_password.length < MINIMUM_PASSWORD_LENGTH){
            throw new BadRequestException(
                "La contraseña debe ser de 8 o más carácteres."
            )
        }

        const user = await this.user_repository.findByIdWithPassword(id);
        if(!user){
            throw new NotFoundException("Usuario no encontrado.");
        }

        const validPassword = await bcrypt.compare(
            dto.old_password,
            user.password_hash,
        );

        if(!validPassword){
            throw new UnauthorizedException("Contraseña actual inválida.");
        }

        const password_hash = await bcrypt.hash(dto.new_password, 10);

        await this.user_repository.updatePasswordById(id, password_hash);
    }

    isValidEmail(
        email: string
    ): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
}
