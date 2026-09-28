import {
    IsNotEmpty,
    IsString,
    MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportReasonDto {
    @ApiProperty({
        description: "Nombre de la razón de reporte",
        example: "Información personal",
        maxLength: 100,
    })
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: "Código de la razón de reporte",
        example: "PERS_INFO",
        maxLength: 11,
    })
    @IsString()
    @MaxLength(11)
    @IsNotEmpty()
    code: string;
}
