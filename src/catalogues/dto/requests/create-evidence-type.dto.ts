import {
    IsNotEmpty,
    IsString,
    MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEvidenceTypeDto {
    @ApiProperty({
        description: "Nombre del tipo de la evidencia.",
        example: "Video",
        maxLength: 11,
    })
    @IsString()
    @MaxLength(11)
    @IsNotEmpty()
    name: string;
}
