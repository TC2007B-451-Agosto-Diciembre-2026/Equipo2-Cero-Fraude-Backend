import { EvidenceEntity } from "../../evidences/entities/evidence.entity";
import { AuthorityEntity } from "../../catalogues/entities/authority.entity";
import { CommentEntity } from "./comment.entity";
import { ReactionSummaryEntity } from "../../reactions/entities/reaction-summary.entity";

export class PostEntity {
    id!: number;
    title: string | null;
    description: string | null;
    seller_name: string | null;
    product: string | null;
    phone_number: string | null;
    url: string | null;
    platform: string | null;
    fraudulent_email: string | null;
    status_id!: number;
    is_fraud: boolean | null;
    is_anonymous!: boolean;
    published_at: Date | null;
    deleted_at: Date | null;
    author: string | null;
    category_id: number | null;

    types: number[] = [];
    reactions: ReactionSummaryEntity = new ReactionSummaryEntity();
    evidences: EvidenceEntity[] = [];
    comments: CommentEntity[] = [];
    authorities: AuthorityEntity[] = [];
}
