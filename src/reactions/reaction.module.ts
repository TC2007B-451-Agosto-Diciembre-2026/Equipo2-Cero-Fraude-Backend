import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { ReactionController } from "./reaction.controller";
import { ReactionService } from "./reaction.service";
import { ReactionRepository } from "./reaction.repository";

@Module({
    imports: [DatabaseModule],
    controllers: [ReactionController],
    providers: [ReactionService, ReactionRepository],
    exports: [ReactionRepository],
})
export class ReactionModule {}
