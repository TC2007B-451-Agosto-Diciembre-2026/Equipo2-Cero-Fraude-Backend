import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsOptional} from "class-validator";
import { CreatePostDto } from "./create-post.dto";

export class UpdatePostDto extends PartialType(CreatePostDto){
    @ApiPropertyOptional({
        description: "Indica si el fraude reportado en la publicación es fraude o no.",
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    is_fraud?: boolean;
}
