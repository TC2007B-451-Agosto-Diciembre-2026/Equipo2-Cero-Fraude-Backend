import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterUsuarioDto {
  @IsString()
  @IsNotEmpty()
  name: string | undefined;

  @IsEmail()
  email: string | undefined;

  @IsString()
  @MinLength(10)
  password: string | undefined;
}
