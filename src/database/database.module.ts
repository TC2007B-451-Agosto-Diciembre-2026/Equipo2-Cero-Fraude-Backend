import { Module, OnModuleDestroy, Inject } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createPool } from 'mysql2/promise';
import type { Pool } from 'mysql2/promise';

export const DB_POOL = "DB_POOL";

@Module({
    imports: [ConfigModule.forRoot()],
    providers: [{
        provide: DB_POOL,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
            return createPool({
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                user: configService.get<string>('DB_USER'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
            });
        },
    },],
    exports: [DB_POOL],
})
export class DatabaseModule implements OnModuleDestroy {

    constructor(@Inject(DB_POOL) private readonly pool: Pool) {}
    onModuleDestroy() {
        return this.pool.end();
    }
}
