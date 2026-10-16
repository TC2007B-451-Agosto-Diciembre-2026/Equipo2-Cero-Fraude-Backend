import { Inject, Injectable } from "@nestjs/common";
import type { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { DB_POOL } from "../database/database.module";
import { ReactionEntity } from "./entities/reaction.entity";
import { ReactionSummaryEntity } from "./entities/reaction-summary.entity";
import {
    DISLIKE_REACTION_ID,
    LIKE_REACTION_ID,
    PUBLISHED_STATUS_ID,
    VALIDATED_STATUS_ID
} from "../common/constants";

const COLUMNS = "user_id, post_id, reaction_type_id";

interface ReactionRow extends RowDataPacket {
    user_id: string;
    post_id: number;
    reaction_type_id: number;
}

interface ReactionSummaryRow extends RowDataPacket {
    likes: number;
    dislikes: number;
    user_reaction: number | null;
}

interface PostAuthorRow extends RowDataPacket {
    author_id: string;
}

interface IdRow extends RowDataPacket {
    id: number;
}

@Injectable()
export class ReactionRepository {
    constructor(@Inject(DB_POOL) private readonly pool: Pool) {}

    async findPostForReaction(
        post_id: number
    ): Promise<{ author_id: string } | null> {
        const [rows] = await this.pool.query<PostAuthorRow[]>(
            `
            SELECT author_id
            FROM fraud_post
            WHERE id = ?
            AND status_id IN (${PUBLISHED_STATUS_ID}, ${VALIDATED_STATUS_ID})
            AND deleted_at IS NULL
            `,
            [post_id]
        );

        return rows.length > 0 ? { author_id: rows[0].author_id } : null;
    }

    async reactionTypeExists(reaction_type_id: number): Promise<boolean> {
        const [rows] = await this.pool.query<IdRow[]>(
            `
            SELECT id
            FROM reaction_type
            WHERE id = ?
            `,
            [reaction_type_id]
        );

        return rows.length > 0;
    }

    async findSummary(
        post_id: number,
        user_id: string | null
    ): Promise<ReactionSummaryEntity> {
        const [rows] = await this.pool.query<ReactionSummaryRow[]>(
            `
            SELECT
                COUNT(CASE WHEN reaction_type_id = ? THEN 1 END) AS likes,
                COUNT(CASE WHEN reaction_type_id = ? THEN 1 END) AS dislikes,
                MAX(CASE WHEN user_id = ? THEN reaction_type_id END) AS user_reaction
            FROM post_reaction
            WHERE post_id = ?
            `,
            [LIKE_REACTION_ID, DISLIKE_REACTION_ID, user_id, post_id]
        );

        const summary = new ReactionSummaryEntity();
        summary.like = Number(rows[0].likes);
        summary.dislike = Number(rows[0].dislikes);
        summary.user_reaction = rows[0].user_reaction;

        return summary;
    }

    async upsert(
        user_id: string,
        post_id: number,
        reaction_type_id: number
    ): Promise<ReactionEntity> {
        await this.pool.execute<ResultSetHeader>(
            `
            INSERT INTO post_reaction (${COLUMNS})
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE reaction_type_id = ?
            `,
            [user_id, post_id, reaction_type_id, reaction_type_id]
        );

        const reaction = await this.findByUserAndPost(user_id, post_id);

        return reaction!;
    }

    async findByUserAndPost(
        user_id: string,
        post_id: number
    ): Promise<ReactionEntity | null> {
        const [rows] = await this.pool.query<ReactionRow[]>(
            `
            SELECT ${COLUMNS}
            FROM post_reaction
            WHERE user_id = ?
            AND post_id = ?
            `,
            [user_id, post_id]
        );

        return rows.length > 0 ? toEntity(rows[0]) : null;
    }

    async delete(user_id: string, post_id: number): Promise<boolean> {
        const [result] = await this.pool.execute<ResultSetHeader>(
            `
            DELETE FROM post_reaction
            WHERE user_id = ?
            AND post_id = ?
            `,
            [user_id, post_id]
        );

        return result.affectedRows > 0;
    }
}

function toEntity(row: ReactionRow): ReactionEntity {
    const reaction = new ReactionEntity();
    reaction.user_id = row.user_id;
    reaction.post_id = row.post_id;
    reaction.reaction_type_id = row.reaction_type_id;

    return reaction;
}
