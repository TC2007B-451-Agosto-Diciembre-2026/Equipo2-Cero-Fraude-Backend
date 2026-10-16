import { ApiProperty } from "@nestjs/swagger";
import { ResponseReportDto } from "./response-report.dto";

export class ResponseReportsDto {
    @ApiProperty({
        description: "Lista de reportes.",
        type: [ResponseReportDto]
    })
    data: ResponseReportDto[];
    @ApiProperty({
        description: "Página actual de resultados.",
        example: 1
    })
    page: number;
    @ApiProperty({
        description: "Número total de páginas disponibles.",
        example: 3
    })
    total_pages: number;
    @ApiProperty({
        description: "Número total de reportes encontrados.",
        example: 47
    })
    total: number;
}
