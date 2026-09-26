import { User } from "../entities/user.entity";


export class UserResponseDto {
    id: string | undefined;
    nombre: string | undefined;
    email: string | undefined;
    fechaCreacion: Date | undefined;
    estado: Boolean | undefined;

    static fromEntity(user: User): UserResponseDto {
        const dto = new UserResponseDto();
        dto.id = user.id;
        dto.nombre = user.nombre;
        dto.email = user.email;
        dto.fechaCreacion = user.fechaCreacion;
        dto.estado = user.estado;
        return dto;
    }
}
