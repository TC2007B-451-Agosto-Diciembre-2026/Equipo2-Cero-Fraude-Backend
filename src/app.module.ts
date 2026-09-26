import { Module } from '@nestjs/common';
import { UsuarioModule } from './users/user.module';
import { AutenticacionModule } from './auth/auth.module';

@Module({
  imports: [AutenticacionModule, UsuarioModule],
})
export class AppModule {}
