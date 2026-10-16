import { ApiProperty } from "@nestjs/swagger";
import { ResponseCommentDto } from "./response-comment.dto";
import { CommentEntity } from "../../entities/comment.entity";

export class ResponseAdminCommentDto extends ResponseCommentDto {
    @ApiProperty({
        example: "2026-09-29T20:30:00.000Z",
        description: "Fecha de creación del comentario."
    })
    is_visible: boolean;

    static fromEntity(
        comment: CommentEntity,
        _baseUrl: string
    ): ResponseAdminCommentDto {
        const dto = new ResponseAdminCommentDto();

        dto.id = comment.id;
        dto.user = comment.author_name;
        dto.post = comment.post_id;
        dto.text = comment.content;
        dto.created_at = comment.created_at;
        dto.is_visible = comment.is_visible;
        return dto;
    }
}
