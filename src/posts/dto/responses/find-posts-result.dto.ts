import { PostEntity } from "../../entities/post.entity";

export interface FindPostsResult {
    posts: PostEntity [];
    total: number;
}
