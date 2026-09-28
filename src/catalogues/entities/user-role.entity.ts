import { ApiProperty } from "@nestjs/swagger";

export class UserRoleEntity {
    @ApiProperty()
    id!: number;
    @ApiProperty()
    name!: string;
    @ApiProperty()
    code!: string;
}
