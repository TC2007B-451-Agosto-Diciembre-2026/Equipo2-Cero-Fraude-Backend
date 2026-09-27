import { ApiProperty } from "@nestjs/swagger";
import { UserRoleEntity } from "../../entities/user-role.entity";

export class ResponseUserRoleDto {
    @ApiProperty({
        description: "Identificador del rol.",
        example: 1,
    })
    id!: number;

    @ApiProperty({
        description: "Nombre del rol.",
        example: "administrador",
    })
    name!: string;

    @ApiProperty({
        description: "Código del rol.",
        example: "ADMIN",
    })
    code!: string;

    static fromEntity(entity: UserRoleEntity): ResponseUserRoleDto {
        const dto = new ResponseUserRoleDto();

        dto.id = entity.id;
        dto.name = entity.name;
        dto.code = entity.code;

        return dto;
    }
}
