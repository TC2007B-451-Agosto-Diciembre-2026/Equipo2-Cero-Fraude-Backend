import { ApiProperty } from "@nestjs/swagger";
import { PostEntity } from "../../entities/post.entity";
import { ResponsePostDto } from "./response-post.dto";
import { ResponseEvidenceDto } from "../../../evidences/dto/response-evidence.dto";

export class ResponseDetailedPostDto extends ResponsePostDto {
    @ApiProperty({
        description: "Nombre del vendedor asociado a la publicación.",
        example: "Vendedor Ejemplo",
    })
    seller_name: string | null;

    @ApiProperty({
        description: "Producto asociado a la publicación.",
        example: "iPhone 17 Pro",
    })
    product: string | null;

    @ApiProperty({
        description: "Número telefónico asociado a la publicación.",
        example: "8111234567",
    })
    phone_number: string | null;

    @ApiProperty({
        description: "URL asociada a la publicación.",
        example: "https://ejemplo.com",
    })
    url: string | null;

    @ApiProperty({
        description: "Plataforma donde ocurrió el incidente.",
        example: "Marketplace",
    })
    platform: string | null;

    @ApiProperty({
        description: "Correo electrónico asociado al posible fraude.",
        example: "fraude@ejemplo.com",
    })
    fraudulent_email: string | null;

    @ApiProperty({
        description: "Cantidad de reacciones de la publicación.",
        example: {
            like: 45,
            dislike: 50,
        },
    })

    reactions: {
        like: number;
        dislike: number;
    };

    @ApiProperty({
        description: "Evidencias asociadas a la publicación.",
        type: [ResponseEvidenceDto]
    })
    evidences: ResponseEvidenceDto[];

    static fromEntity(
        post: PostEntity,
        baseUrl: string
    ): ResponseDetailedPostDto {
        const publicDto = ResponsePostDto.fromEntity(
            post,
            baseUrl
        );
        const dto = new ResponseDetailedPostDto();

        Object.assign(dto, publicDto);

        dto.seller_name = post.seller_name;
        dto.product = post.product;
        dto.phone_number = post.phone_number;
        dto.url = post.url;
        dto.platform = post.platform;
        dto.fraudulent_email = post.fraudulent_email;
        dto.reactions = {"like": 0, "dislike": 0};
        dto.evidences = post.evidences?.map(
            evidence => ResponseEvidenceDto.fromEntity(evidence, baseUrl)
        );

        return dto;
    }
}
