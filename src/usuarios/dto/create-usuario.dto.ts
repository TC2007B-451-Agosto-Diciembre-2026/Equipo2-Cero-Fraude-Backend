import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    nombre: string | undefined;

    @IsEmail()
    correo: string | undefined;
}
