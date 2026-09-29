import {
    IsNotEmpty,
    IsString,
    MaxLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFraudCategoryDto {
    @ApiProperty({
        description: "Nombre de la categoría de fraude.",
        example: "Mensajería",
        maxLength: 20,
    })
    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: "Código de la categoría de fraude.",
        example: "MESSAGE",
        maxLength: 11,
    })
    @IsString()
    @MaxLength(11)
    @IsNotEmpty()
    code: string;
}
