import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { CataloguesModule } from './catalogues/catalogues.module';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
    }),
    AuthModule, CataloguesModule ,UserModule],
})
export class AppModule {}
