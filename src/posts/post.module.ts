import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { PostRepository } from "./post.repository";
import { EvidenceService } from "../evidences/evidence.service";
import { EvidenceModule } from "../evidences/evidence.module";
import { ReactionModule } from "../reactions/reaction.module";

@Module({
    imports: [DatabaseModule, EvidenceModule, ReactionModule],
    controllers: [PostController],
    providers: [PostService, PostRepository, EvidenceService],
})
export class PostModule {}
