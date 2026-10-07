import { ApiProperty } from "@nestjs/swagger";
import { PostEntity } from "../../entities/post.entity";
import { FindPostRow } from "./find-post-row.dto";

export class ResponsePostDto {

    @ApiProperty({
        description: "Identificador de la publicación.",
        example: 3
    })
    id: number;

    @ApiProperty({
        description: "Título de la publicación.",
        example: "Estafa de celular iPhone."
    })
    title: string | null;

     @ApiProperty({
        description: "Descripción de la publicación.",
        example: "Los estafadores me vendieron un celular falso a 500 MXN."
    })
    description: string | null;

    @ApiProperty({
        description: "Identificador del estado de la publicación.",
        example: 3
    })
    status_id: number | null;

    @ApiProperty({
        description: "Sí el incidente reportado es fraude.",
        example: true
    })
    is_fraud: boolean | null;

    @ApiProperty({
        description: "Fecha de posteo de la publicación.",
        example: "2026-09-22T09:58:43.123Z"
    })
    published_at: string | null;

    @ApiProperty({
        description: "Nombre del autor.",
        example: "Roberto"
    })
    author: string | null;

    @ApiProperty({
        description: "Identificador de la categoría de la publicación.",
        example: 3
    })
    category: number | null;

    @ApiProperty({
        description: "Lista de tipos de la publicación.",
        example: [1, 2]
    })
    types: number[];

    static fromEntity(
        post: PostEntity,
        baseUrl: string
    ): ResponsePostDto {
        const dto = new ResponsePostDto();

        dto.id = post.id;
        dto.title = post.title;
        dto.description = post.description;
        dto.status_id = post.status_id;
        dto.is_fraud = post.is_fraud;
        dto.published_at = post.published_at?.toISOString() ?? null;
        dto.author = post.author;
        dto.category = post.category_id;
        dto.types = post.types;

        return dto;
    }
}
