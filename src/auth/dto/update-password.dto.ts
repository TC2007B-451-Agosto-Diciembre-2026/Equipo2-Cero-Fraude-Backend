import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdatePasswordDto {
    @ApiProperty({
        description: "Contraseña del usuario.",
        example: "supersecret123",
        minLength: 10,
    })
    @IsString()
    @MinLength(10)
    @IsNotEmpty()
    old_password: string;
    @ApiProperty({
        description: "Contraseña del usuario.",
        example: "IWillNotBeHackedsaoinOI12oiub",
        minLength: 10,
    })
    @IsString()
    @MinLength(10)
    @IsNotEmpty()
    new_password: string;
}
