import { ApiProperty } from "@nestjs/swagger";
import {
    IsBoolean,
    IsInt,
    IsOptional,
} from "class-validator";

export class UpdateUserDto {
    @ApiProperty({
        description: "Estado del usuario.",
        example: false,
    })
    @IsOptional()
    @IsBoolean()
    is_active: boolean;

    @ApiProperty({
        description: "Rol del usuario.",
        example: 2,
    })
    @IsOptional()
    @IsInt()
    role_id: number;
}
