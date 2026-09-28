import { ApiProperty } from "@nestjs/swagger";

export class User {
  @ApiProperty()
  id: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  is_active: boolean;
  @ApiProperty()
  role_id: number;
}
