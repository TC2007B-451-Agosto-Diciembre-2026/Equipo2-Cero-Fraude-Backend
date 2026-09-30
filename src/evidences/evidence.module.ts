import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { EvidenceController } from './evidence.controller';
import { EvidenceService } from './evidence.service';
import { EvidenceRepository } from './evidence.repository';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [EvidenceController],
    providers: [EvidenceService, EvidenceRepository]
})
export class EvidenceModule {}
