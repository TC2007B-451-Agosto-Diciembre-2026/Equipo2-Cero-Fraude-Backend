import { ApiPropertyOptional } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
} from "class-validator";

export class UpdateMeDto {
    @ApiPropertyOptional({
        description: "Nombre de usuario.",
        example: "Andres123",
        maxLength: 100,
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    username : string;
}
