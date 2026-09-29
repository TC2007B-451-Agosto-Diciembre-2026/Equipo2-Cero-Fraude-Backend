import {
    IsNotEmpty,
    IsString,
    MaxLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFraudTypeDto {
    @ApiProperty({
        description: "Nombre del tipo de fraude",
        example: "Promoción falsa",
        maxLength: 50,
    })
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: "Código del tipo de fraude",
        example: "FAKE_PROMO",
        maxLength: 11,
    })
    @IsString()
    @MaxLength(11)
    @IsNotEmpty()
    code: string;
}
