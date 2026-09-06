import { Module } from "@nestjs/common";
import { UsuariosRepository } from "../usuarios/usuarios.repository";
import { AutenticacionController } from "./autenticacion.controller";
import { AutenticacionService } from "./autenticacion.service";
import { AutenticacionGuard } from "./autenticacion.guard";
import { DatabaseModule } from "../database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [AutenticacionController],
    providers: [AutenticacionService, UsuariosRepository, AutenticacionGuard],
    exports: [AutenticacionGuard]
})
export class AutenticacionModule {}
