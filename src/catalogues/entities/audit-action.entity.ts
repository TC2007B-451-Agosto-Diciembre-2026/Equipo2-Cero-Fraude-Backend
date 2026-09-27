import { ApiProperty } from "@nestjs/swagger";

export class AuditActionEntity {
    @ApiProperty()
    id!: number;
    @ApiProperty()
    name!: string;
    @ApiProperty()
    code!: string;
}
