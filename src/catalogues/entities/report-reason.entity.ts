import { ApiProperty } from "@nestjs/swagger";

export class ReportReasonEntity {
    @ApiProperty()
    id!: number;
    @ApiProperty()
    name!: string;
    @ApiProperty()
    code!: string;
}
