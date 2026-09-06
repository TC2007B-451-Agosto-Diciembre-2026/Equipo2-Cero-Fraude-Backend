import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { UsuariosRepository } from './usuarios.repository';
import { AutenticacionModule } from '../autenticacion/autenticacion.module';

@Module({
    imports: [DatabaseModule, AutenticacionModule],
    controllers: [UsuariosController],
    providers: [UsuariosService, UsuariosRepository]
})
export class UsuarioModule {}
