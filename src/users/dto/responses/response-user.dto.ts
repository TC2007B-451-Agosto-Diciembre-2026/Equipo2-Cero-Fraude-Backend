import { User } from "../../entities/user.entity"
import { ApiProperty } from "@nestjs/swagger";

export class ResponseUserDto {

    @ApiProperty({
        description: "Identificador del usuario.",
        example: "550e8400-e29b-41d4-a716-446655440000"
    })
    id: string;
    @ApiProperty({
        description: "Nombre del usuario.",
        example: "andres123"
    })
    username: string;
     @ApiProperty({
        description: "Correo del usuario.",
        example: "andres123@correo.com"
    })
    email: string;
    @ApiProperty({
        description: "Fecha de la creación de la cuenta de usuario.",
        example: "2026-09-22T09:58:43.123Z"
    })
    created_at: string;
    @ApiProperty({
        description: "Estado del usuario.",
        example: true
    })
    is_active: boolean;
    @ApiProperty({
        description: "Rol del usuario.",
        example: 2
    })
    role_id: number;

    static fromEntity(user : User){
        const dto = new ResponseUserDto();
        dto.id = user.id;
        dto.username = user.username;
        dto.email = user.email;
        dto.created_at = user.created_at.toISOString();
        dto.is_active = user.is_active;
        dto.role_id = user.role_id;
        return dto;
    }
}
