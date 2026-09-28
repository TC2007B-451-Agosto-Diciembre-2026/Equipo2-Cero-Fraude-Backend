import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { DatabaseModule } from "../database/database.module";
import { AuthRepository } from "./auth.repository";

@Module({
    imports: [DatabaseModule],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository, AuthGuard],
    exports: [AuthGuard]
})
export class AuthModule {}
