import { Module } from "@nestjs/common";
import { UsuariosRepository } from "../users/user.repository";
import { AutenticacionController } from "./auth.controller";
import { AutenticacionService } from "./auth.service";
import { AutenticacionGuard } from "./auth.guard";
import { DatabaseModule } from "../database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [AutenticacionController],
    providers: [AutenticacionService, UsuariosRepository, AutenticacionGuard],
    exports: [AutenticacionGuard]
})
export class AutenticacionModule {}
