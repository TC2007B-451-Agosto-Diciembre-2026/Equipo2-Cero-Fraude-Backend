import { ApiProperty } from "@nestjs/swagger";

export class FraudTypeEntity {
    @ApiProperty()
    id!: number;
    @ApiProperty()
    name!: string;
    @ApiProperty()
    code!: string;
}
