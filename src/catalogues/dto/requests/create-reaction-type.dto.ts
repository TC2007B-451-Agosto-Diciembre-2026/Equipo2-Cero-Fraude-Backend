import {
    IsNotEmpty,
    IsString,
    MaxLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReactionTypeDto {
    @ApiProperty({
        description: "Nombre de la reacción",
        example: "sorpresa",
        maxLength: 30,
    })
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: "Código de la reacción",
        example: "SURPRISE",
        maxLength: 11,
    })
    @IsString()
    @MaxLength(11)
    @IsNotEmpty()
    code: string;
}
