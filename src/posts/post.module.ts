import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { PostRepository } from "./post.repository";

@Module({
    imports: [DatabaseModule],
    controllers: [PostController],
    providers: [PostService, PostRepository],
})
export class PostModule {}
