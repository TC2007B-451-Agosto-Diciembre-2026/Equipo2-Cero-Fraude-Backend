import { User } from "./user.entity";

export class AuthUser extends User{
    password_hash: string;
}
