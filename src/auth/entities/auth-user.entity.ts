export class AuthUserEntity {
  id!: string;
  username!: string;
  email!: string;
  password_hash!: string;
  is_active!: boolean;
  role_id!: number;
}
