import {
    ArrayUnique,
    IsArray,
    IsBoolean,
    IsEmail,
    IsInt,
    IsOptional,
    IsString,
    IsUrl,
    MaxLength,
    Min,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiPropertyOptional({
        description: "Título de la publicación.",
        example: "Estafa en venta de consola.",
        maxLength: 100,
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    title?: string;

    @ApiPropertyOptional({
        description: "Descripción del fraude.",
        example: "El vendedor recibió el pago pero nunca envió el producto.",
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        description: "Nombre del vendedor relacionado con el fraude.",
        example: "Juan Pérez",
        maxLength: 100,
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    seller_name?: string;

    @ApiPropertyOptional({
        description: "Producto relacionado con el fraude.",
        example: "PlayStation 5",
        maxLength: 100,
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    product?: string;

    @ApiPropertyOptional({
        description: "Teléfono relacionado con el fraude.",
        example: "5512345678",
        maxLength: 25,
    })
    @IsOptional()
    @IsString()
    @MaxLength(25)
    phone_number?: string;

    @ApiPropertyOptional({
        description: "URL relacionada con el fraude.",
        example: "https://example.com/producto",
        maxLength: 255,
    })
    @IsOptional()
    @IsUrl()
    @MaxLength(255)
    url?: string;

    @ApiPropertyOptional({
        description: "Plataforma donde ocurrió el posible fraude.",
        example: "Facebook Marketplace",
        maxLength: 100,
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    platform?: string;

    @ApiPropertyOptional({
        description: "Correo electrónico relacionado con el posible fraude.",
        example: "fraude@example.com",
        maxLength: 255,
    })
    @IsOptional()
    @IsEmail()
    @MaxLength(255)
    fraudulent_email?: string;

    @ApiPropertyOptional({
        description: "ID de la categoría de la publicación.",
        example: 1,
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    category?: number;

    @ApiPropertyOptional({
        description: "IDs de los tipos de fraude asociados a la publicación.",
        example: [1, 3],
        type: [Number],
    })
    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @IsInt({ each: true })
    @Min(1, { each: true })
    types?: number[];

    @ApiPropertyOptional({
        description: "IDs de las evidencias previamente creadas mediante /evidences.",
        example: [
            1,
            2,
        ],
        type: [Number],
    })
    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @IsInt({ each: true })
    @Min(1, { each: true })
    evidences?: number[];

    @ApiPropertyOptional({
        description: "Indica si la identidad del autor debe mantenerse anónima al publicar.",
        example: true,
        default: false,
    })
    @IsOptional()
    @IsBoolean()
    is_anonymous?: boolean;

    @ApiProperty({
        description: "ID del estado inicial de la publicación.",
        example: 1,
    })
    @IsInt()
    @Min(1)
    status_id: number;
}
