import { ApiProperty } from "@nestjs/swagger";

export class AuthorityEntity {
    @ApiProperty()
    id!: number;
    @ApiProperty()
    name!: string;
    @ApiProperty()
    code!: string;
    @ApiProperty()
    description!: string;
}
