import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { CataloguesModule } from "./catalogues/catalogues.module";
import { UserModule } from "./users/user.module";
import { EvidenceModule } from "./evidences/evidence.module";
import { PostModule } from "./posts/post.module";

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
    }),
    AuthModule, CataloguesModule ,UserModule, PostModule ,EvidenceModule]
})
export class AppModule {}
