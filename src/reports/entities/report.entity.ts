export class ReportEntity {
    id: number;
    details: string | null;
    created_at: Date;
    report_reason_id: number;
    reporter_id: string;
    post_id: number;
}
