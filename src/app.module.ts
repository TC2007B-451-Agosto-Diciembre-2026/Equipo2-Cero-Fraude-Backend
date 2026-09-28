import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AutenticacionModule } from './auth/auth.module';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
    }),
    AutenticacionModule],
})
export class AppModule {}
