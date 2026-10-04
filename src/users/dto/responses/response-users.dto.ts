import { ApiProperty } from "@nestjs/swagger";
import { ResponseUserDto } from "./response-user.dto";

export class ResponseUsersDto {
    @ApiProperty({
        description: "Lista de usuarios.",
        type: [ResponseUserDto],
    })
    data: ResponseUserDto[];
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
        description: "Número total de usuarios encontrados.",
        example: 47,
    })
    total: number;
}
