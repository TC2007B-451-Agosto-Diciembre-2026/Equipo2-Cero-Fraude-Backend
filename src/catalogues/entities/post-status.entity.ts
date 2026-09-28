import { ApiProperty } from "@nestjs/swagger";

export class PostStatusEntity {
    @ApiProperty()
    id!: number;
    @ApiProperty()
    name!: string;
    @ApiProperty()
    code!: string;
}
