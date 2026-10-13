export class CommentEntity {
    id: number;
    is_visible: boolean;
    content: string;
    created_at: Date;
    updated_at: Date | null;
    author_id: string;
    author_name: string;
    post_id: number;
}
