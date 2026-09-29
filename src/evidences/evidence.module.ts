import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { EvidenceController } from './evidence.controller';
import { EvidenceService } from './evidence.service';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [EvidenceController],
    providers: [EvidenceService]
})
export class EvidenceModule {}
