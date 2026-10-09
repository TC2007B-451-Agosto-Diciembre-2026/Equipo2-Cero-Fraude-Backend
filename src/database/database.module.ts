import { Module, OnModuleDestroy, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createPool } from "mysql2/promise";
import type { Pool } from "mysql2/promise";

export const DB_POOL = "DB_POOL";

// temporal
const DATABASE_URL = 'mysql://root:root@localhost:3306/cero_fraude';


@Module({
    providers: [{
        provide: DB_POOL,
        inject: [ConfigService],
        /*useFactory: (configService: ConfigService) => {
            return createPool({
                host: configService.get<string>("DB_HOST"),
                port: configService.get<number>("DB_PORT"),
                user: configService.get<string>("DB_USER"),
                password: configService.get<string>("DB_PASSWORD"),
                database: configService.get<string>("DB_NAME")
            });

        },*/
        useFactory: () => {
        console.log('Conectando a ' + DATABASE_URL);
        return createPool({ uri: DATABASE_URL });
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
