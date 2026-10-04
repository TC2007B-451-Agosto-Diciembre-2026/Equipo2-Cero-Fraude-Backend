import { UserEntity } from "./user.entity";

export class AuthUserEntity extends UserEntity {
    password_hash: string;
}
