import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from "class-validator";

export class RegisterDto {
  @ApiProperty({
    description: "Nombre de usuario",
    example: "andres123"
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9_]+$/, { message: "Nombre de usuario inválido" })
  username: string;

  @ApiProperty({
    description: "Correo del usuario",
    example: "andres123@correo.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

   @ApiProperty({
    description: "Contraseña",
    example: "secret1234",
    minLength: 10
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  password: string;
}
