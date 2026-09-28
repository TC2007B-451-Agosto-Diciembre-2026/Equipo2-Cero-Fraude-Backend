import { ApiProperty } from "@nestjs/swagger";

export class ModifiedFieldEntity {
    @ApiProperty()
    id!: number;
    @ApiProperty()
    name!: string;
    @ApiProperty()
    code!: string;
}
