import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class UpdateAuthorityDto {
	@ApiProperty({
    	description: "Nombre de la autoridad.",
        example: "CONDUSEF",
        maxLength: 100,
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    name: string;

	@ApiProperty({
        description: "Descripción de la autoridad.",
        example: "Brinda orientación y apoyo en asuntos relacionados con productos, servicios e instituciones financieras.",
        maxLength: 255,
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    description: string;
}
