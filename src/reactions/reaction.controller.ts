import {
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { ReactionService } from "./reaction.service";
import { AuthGuard } from "../auth/auth.guard";
import { CurrentUser } from "../auth/current-user.decorator";
import type { JwtPayload } from "../auth/jwt";
import { ResponseReactionDto } from "./dto/responses/response-reaction.dto";
import { ResponseReactionSummaryDto } from "./dto/responses/response-reaction-summary.dto";
import {
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiUnauthorizedResponse,
} from "../common/api-responses";

@ApiTags("reactions")
@ApiBearerAuth()
@Controller("posts/:postId/reactions")
@UseGuards(AuthGuard)
export class ReactionController {
    constructor(private readonly service: ReactionService) {}

    @Get()
    @ApiOperation({
        summary: "Obtener reacciones de una publicación",
        description:
            "Obtiene la cantidad de reacciones por tipo de una publicación y la reacción del usuario autenticado.",
    })
    @ApiParam({
        name: "postId",
        description: "ID de la publicación.",
        type: Number,
        example: 4,
    })
    @ApiResponse({
        status: 200,
        description: "Reacciones de la publicación.",
        type: ResponseReactionSummaryDto,
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    findByPost(
        @Param("postId", ParseIntPipe) postId: number,
        @CurrentUser() user: JwtPayload,
    ): Promise<ResponseReactionSummaryDto> {
        return this.service.findByPost(postId, user.sub);
    }

    @Post(":reactionId")
    @ApiOperation({
        summary: "Crear o cambiar una reacción",
        description:
            "Crea una reacción a una publicación o reemplaza la reacción existente del usuario.",
    })
    @ApiParam({
        name: "postId",
        description: "ID de la publicación.",
        type: Number,
        example: 4,
    })
    @ApiParam({
        name: "reactionId",
        description: "ID del tipo de reacción.",
        type: Number,
        example: 1,
    })
    @ApiResponse({
        status: 201,
        description: "Reacción registrada correctamente.",
        type: ResponseReactionDto,
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiNotFoundResponse()
    react(
        @Param("postId", ParseIntPipe) postId: number,
        @Param("reactionId", ParseIntPipe) reactionId: number,
        @CurrentUser() user: JwtPayload,
    ): Promise<ResponseReactionDto> {
        return this.service.react(postId, reactionId, user.sub);
    }

    @Delete()
    @HttpCode(204)
    @ApiOperation({
        summary: "Eliminar una reacción",
        description: "Elimina la reacción del usuario a una publicación.",
    })
    @ApiParam({
        name: "postId",
        description: "ID de la publicación.",
        type: Number,
        example: 4,
    })
    @ApiNoContentResponse()
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    delete(
        @Param("postId", ParseIntPipe) postId: number,
        @CurrentUser() user: JwtPayload,
    ): Promise<void> {
        return this.service.delete(postId, user.sub);
    }
}
