import { FindPostsDto } from "./find-posts.dto";

export class DerivedFindPostsDto extends FindPostsDto {
    user_id?: string;
    role_id?: number;
}
