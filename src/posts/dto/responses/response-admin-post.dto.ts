import { ApiProperty } from "@nestjs/swagger";
import { PostEntity } from "../../entities/post.entity";
import { ResponseDetailedPostDto } from "./response-detailed-post.dto";

export class ResponseAdminPostDto extends ResponseDetailedPostDto {
    @ApiProperty({
        description: "Sí el autor es anónimo.",
        example: true
    })
    is_anonymous: boolean;

    @ApiProperty({
        description: "Fecha de eliminación de la publicación.",
        example: "2026-09-22T09:58:43.123Z",
        nullable: true
    })
    deleted_at: string | null;

    /*static fromEntity(post: PostEntity): ResponseAdminPostDto {
        const publicDto = ResponseDetailedPostDto.fromEntity(post);
        const dto = new ResponseAdminPostDto();

        Object.assign(dto, publicDto);

        dto.is_anonymous = post.is_anonymous;
        dto.deleted_at = post.deleted_at?.toISOString() ?? null;
        return dto;
    }*/
}
