export interface FindPostRow {
    id: number;
    title: string | null;
    description: string | null;
    status_id: number | null;
    is_fraud: boolean | null;
    published_at: Date | null;
    author: string;
    category_id: number | null;
    types: number[];
}
