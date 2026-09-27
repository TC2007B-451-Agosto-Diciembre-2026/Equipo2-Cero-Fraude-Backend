import { ApiProperty } from "@nestjs/swagger";

export class EvidenceTypeEntity {
    @ApiProperty()
    id!: number;
    @ApiProperty()
    name!: string;
}
