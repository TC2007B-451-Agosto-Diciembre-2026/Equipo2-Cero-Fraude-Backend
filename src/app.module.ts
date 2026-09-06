import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuarios/usuarios.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';

@Module({
  imports: [AutenticacionModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
