import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, Matches } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({
        example: "Se recomienda verificar la identidad del vendedor.",
        description: "Contenido del comentario público realizado por un administrador.",
        maxLength: 1000,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    @Matches(/\S/)
    text: string;
}
