import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateMeDto {
    @ApiProperty({
        description: "Nombre de usuario.",
        example: "Andres123",
        maxLength: 100,
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    username : string;
}
