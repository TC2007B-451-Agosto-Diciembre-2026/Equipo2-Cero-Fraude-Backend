import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginUsuarioDto {
    @IsEmail()
    email: string | undefined;

    @IsString()
    @MinLength(8)
    password: string | undefined;
}
