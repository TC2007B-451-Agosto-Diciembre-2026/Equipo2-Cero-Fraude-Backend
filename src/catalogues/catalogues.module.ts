import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CataloguesController } from "./catalogues.controller";
import { CataloguesService } from "./catalogues.service";
import { CatalogueRepository } from "./catalogues.repository";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [CataloguesController],
    providers: [CataloguesService, CatalogueRepository]
})
export class CataloguesModule {}
