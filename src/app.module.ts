import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { CataloguesModule } from "./catalogues/catalogues.module";
import { UserModule } from "./users/user.module";
import { EvidenceModule } from "./evidences/evidence.module";
import { PostModule } from "./posts/post.module";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
    }),
    AuthModule, CataloguesModule ,UserModule, PostModule ,EvidenceModule],
// temporal
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
