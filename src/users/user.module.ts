import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { AutenticacionModule } from '../auth/auth.module';

@Module({
    imports: [DatabaseModule, AutenticacionModule],
    controllers: [UserController],
    providers: [UserService, UserRepository]
})
export class UsuarioModule {}
