import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CataloguesController } from './catalogues.controller';
import { CataloguesService } from './catalogues.service';
import { CatalogueRepository } from './catalogues.repository';
import { AutenticacionModule } from '../auth/auth.module';

@Module({
    imports: [DatabaseModule, AutenticacionModule],
    controllers: [CataloguesController],
    providers: [CataloguesService, CatalogueRepository]
})
export class CataloguesModule {}
