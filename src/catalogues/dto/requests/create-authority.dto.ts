import {
    IsNotEmpty,
    IsString,
    MaxLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthorityDto {
    @ApiProperty({
        description: "Nombre de la autoridad.",
        example: "CONDUSEF",
        maxLength: 100,
    })
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: "Código de la autoridad.",
        example: "CONDUSEF",
        maxLength: 11,
    })
    @IsString()
    @MaxLength(11)
    @IsNotEmpty()
    code: string;

    @ApiProperty({
        description: "Descripción de la autoridad.",
        example: "Brinda orientación y apoyo en asuntos relacionados con productos, servicios e instituciones financieras.",
        maxLength: 255,
    })
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    description: string;
}
