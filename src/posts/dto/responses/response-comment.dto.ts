import { ApiProperty } from "@nestjs/swagger";
import { CommentEntity } from "../../entities/comment.entity";

export class ResponseCommentDto {
    @ApiProperty({
        example: 1,
        description: "ID del commentario."
    })
    id: number;

    @ApiProperty({
        example: "Equipo de Cero Fraude",
        description: "Nombre público del autor del comentario."
    })
    user: string;

    @ApiProperty({
        example: 15,
        description: "ID de la publicación a la que se asociará el comentario."
    })
    post: number;

    @ApiProperty({
        example: "Se recomienda verificar la identidad del vendedor.",
        description:
            "Contenido del comentario público realizado por un administrador."
    })
    text: string;

    @ApiProperty({
        example: "2026-10-12T09:00:00.000Z",
        description: "Hora en la que se creó el comentario."
    })
    created_at: Date;

    static fromEntity(
        comment: CommentEntity,
        _baseUrl: string
    ): ResponseCommentDto {
        const dto = new ResponseCommentDto();

        dto.id = comment.id;
        dto.user = comment.author_name;
        dto.post = comment.post_id;
        dto.text = comment.content;
        dto.created_at = comment.created_at;

        return dto;
    }
}
