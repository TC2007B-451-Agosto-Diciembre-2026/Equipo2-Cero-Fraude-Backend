import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { ResponseUserDto } from "./dto/responses/response-user.dto";
import { UpdateUserDto } from "./dto/requests/update-user.dto";
import { UpdateMeDto } from "./dto/requests/update-me.dto";
import { FindUsersDto } from "./dto/requests/find-users.dto";
import { ResponseUsersDto } from "./dto/responses/response-users.dto";
import { PAGE_SIZE } from "../common/constants";

@Injectable()
export class UserService {
    constructor(private readonly repository : UserRepository) {}

    async findAll(
        query: FindUsersDto
    ): Promise<ResponseUsersDto> {
        const result = await this.repository.findAll(query);

        const page = query.page ?? 1;
        const total_pages = Math.ceil(result.total / PAGE_SIZE);

        return {
            data: result.users.map(
                user => ResponseUserDto.fromEntity(user)
            ),
            page: page,
            total_pages: total_pages,
            total: result.total
        };
    }

    async findById(
        id: string
    ): Promise<ResponseUserDto> {
        const user = await this.repository.findById(id);
        if(!user){
            throw new NotFoundException("Usuario no encontrado");
        }

        return ResponseUserDto.fromEntity(user);
    }

    async updateMe(
        id: string,
        dto: UpdateMeDto
    ): Promise<ResponseUserDto> {
        if(dto.username === undefined){
            throw new BadRequestException("Al menos un campo requerido.");
        }

        const user = await this.repository.updateById(
            id,
            { username: dto.username }
        );

        if(!user) {
            throw new NotFoundException("Usuario no encontrado");
        }

        return ResponseUserDto.fromEntity(user);
    }

    async updateById(
        id: string,
        dto: UpdateUserDto
    ): Promise<ResponseUserDto> {
        if(dto.is_active === undefined && dto.role_id === undefined){
            throw new BadRequestException("Al menos un campo requerido.");
        }

        const user = await this.repository.updateById(id, {
            role_id: dto.role_id,
            is_active: dto.is_active
        });

        if(!user) {
            throw new NotFoundException("Usuario no encontrado");
        }

        return ResponseUserDto.fromEntity(user);
    }
}
