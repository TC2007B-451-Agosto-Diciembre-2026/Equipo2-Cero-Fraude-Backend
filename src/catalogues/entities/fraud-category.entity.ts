import { ApiProperty } from "@nestjs/swagger";

export class FraudCategoryEntity {
    @ApiProperty()
    id!: number;
    @ApiProperty()
    name!: string;
    @ApiProperty()
    code!: string;
}
