export class Evidence {
    id: number;
    owner_id: string;
    is_visible: boolean;
    storage_path: string;
    created_at: Date;
    expires_at: Date | null;
    deleted_at: Date | null;
    evidence_type_id: number;
    post_id: number | null;
}
