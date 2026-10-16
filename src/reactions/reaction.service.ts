import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException
} from "@nestjs/common";
import { ReactionRepository } from "./reaction.repository";
import { ResponseReactionDto } from "./dto/responses/response-reaction.dto";
import { ResponseReactionSummaryDto } from "./dto/responses/response-reaction-summary.dto";

@Injectable()
export class ReactionService {
    constructor(private readonly repository: ReactionRepository) {}

    async findByPost(
        post_id: number,
        user_id: string
    ): Promise<ResponseReactionSummaryDto> {
        const post = await this.repository.findPostForReaction(post_id);
        if (!post) {
            throw new NotFoundException("Publicación no encontrada.");
        }

        const summary = await this.repository.findSummary(post_id, user_id);

        return ResponseReactionSummaryDto.fromEntity(summary);
    }

    async react(
        post_id: number,
        reaction_type_id: number,
        user_id: string
    ): Promise<ResponseReactionDto> {
        const post = await this.repository.findPostForReaction(post_id);
        if (!post) {
            throw new NotFoundException("Publicación no encontrada.");
        }

        if (post.author_id === user_id) {
            throw new ForbiddenException(
                "No puedes reaccionar a tu propia publicación."
            );
        }

        const reactionExists =
            await this.repository.reactionTypeExists(reaction_type_id);
        if (!reactionExists) {
            throw new BadRequestException("La reacción no existe.");
        }

        const reaction = await this.repository.upsert(
            user_id,
            post_id,
            reaction_type_id
        );

        return ResponseReactionDto.fromEntity(reaction);
    }

    async delete(post_id: number, user_id: string): Promise<void> {
        const post = await this.repository.findPostForReaction(post_id);
        if (!post) {
            throw new NotFoundException("Publicación no encontrada.");
        }

        const deleted = await this.repository.delete(user_id, post_id);
        if (!deleted) {
            throw new NotFoundException("La reacción a eliminar no existe.");
        }
    }
}
