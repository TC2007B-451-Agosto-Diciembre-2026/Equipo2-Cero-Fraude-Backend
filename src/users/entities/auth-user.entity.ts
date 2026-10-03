import { ApiProperty } from "@nestjs/swagger";
import { User } from "./user.entity";

export class AuthUser extends User{
  @ApiProperty()
  password_hash: string;
}
