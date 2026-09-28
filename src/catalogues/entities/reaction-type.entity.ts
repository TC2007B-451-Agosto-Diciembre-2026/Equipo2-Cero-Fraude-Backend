import { ApiProperty } from "@nestjs/swagger";

export class ReactionTypeEntity {
    @ApiProperty()
    id!: number;
    @ApiProperty()
    name!: string;
    @ApiProperty()
    code!: string;
}
