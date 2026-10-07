import { ApiProperty } from "@nestjs/swagger";
import { ResponsePostDto } from "./response-post.dto";

export class ResponsePostsDto {
    @ApiProperty({
        description: "Lista de publicaciones.",
        type: [ResponsePostDto],
    })
    data: ResponsePostDto[];
    @ApiProperty({
        description: "Página actual de resultados.",
        example: 1,
    })
    page: number;
    @ApiProperty({
        description: "Número total de páginas disponibles.",
        example: 3,
    })
    total_pages: number;
    @ApiProperty({
        description: "Número total de publicaciones encontradas.",
        example: 47,
    })
    total: number;
}
