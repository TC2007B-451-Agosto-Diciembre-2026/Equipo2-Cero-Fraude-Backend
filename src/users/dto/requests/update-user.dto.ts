import { ApiPropertyOptional } from "@nestjs/swagger";
import {
    IsBoolean,
    IsInt,
    IsOptional,
    Min,
} from "class-validator";

export class UpdateUserDto {
    @ApiPropertyOptional({
        description: "Estado del usuario.",
        example: false,
    })
    @IsOptional()
    @IsBoolean()
    is_active: boolean;

    @ApiPropertyOptional({
        description: "Rol del usuario.",
        example: 2,
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    role_id: number;
}
