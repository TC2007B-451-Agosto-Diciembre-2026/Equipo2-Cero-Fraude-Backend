import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class LoginDto {
   @ApiProperty({
      description: "Nombre o correo del usuario.",
      example: "andres123",
    })
    @IsString()
    @IsNotEmpty()
    identifier: string;

    @ApiProperty({
      description: "Contraseña",
      example: "secret1234",
     })
    @IsString()
    @IsNotEmpty()
    password: string;
}
