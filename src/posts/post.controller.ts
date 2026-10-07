import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { ApiBadRequestResponse, ApiConflictResponse, ApiForbiddenResponse, ApiUnauthorizedResponse, ApiNotFoundResponse, ApiNoContentResponse } from "../common/api-responses";
import { FindPostsDto } from "./dto/requests/find-posts.dto";
import { CurrentUser } from "../auth/current-user.decorator";
import type { JwtPayload } from "../auth/jwt";
import { ResponsePostsDto } from "./dto/responses/response-posts.dto";
import { PostService } from "./post.service";
import { ResponseDetailedPostDto } from "./dto/responses/response-detailed-post.dto";
import { FindMyPostsDto } from "./dto/requests/find-my-posts.dto";
import { CreatePostDto } from "./dto/requests/create-post.dto";
import { ResponsePostDto } from "./dto/responses/response-post.dto";
import { ResponseAdminPostDto } from "./dto/responses/response-admin-post.dto";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { ADMIN_ROLE_ID } from "../common/constants";
import { ResponseEvidenceDto } from "../evidences/dto/response-evidence.dto";
import { UpdatePostDto } from "./dto/requests/update-post.dto";
import { UpdatePostEvidenceDto } from "./dto/requests/update-post-evidence.dto";

@ApiTags("posts")
@ApiBearerAuth()
@Controller("posts")
@UseGuards(AuthGuard)
export class PostController {
    constructor(private readonly service: PostService) {}

    @Get()
    @ApiOperation({
        summary: "Obtener publicaciones",
        description: "Obtiene una página de publicaciones de fraude."
    })
    @ApiResponse({
        status: 200,
        description: "Página de publicaciones.",
        type: ResponsePostsDto,
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    findAll(
        @Query() query: FindPostsDto,
        @CurrentUser() user: JwtPayload
    ): Promise<ResponsePostsDto>{
        return this.service.findAll(query, user.role_id);
    }

    @Get("me")
    @ApiOperation({
        summary: "Obtener mis publicaciones",
        description: "Obtener una página de publicaciones de fraude del usuario solicitante."
    })
    @ApiResponse({
        status: 200,
        description: "Página de publicaciones del usuario.",
        type: ResponsePostsDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    findMyPosts(
        @Query() query: FindMyPostsDto,
        @CurrentUser() user: JwtPayload
    ): Promise<ResponsePostsDto> {
        return this.service.findMyPosts(query, user.sub);
    }

    @Get(":postId")
    @ApiOperation({
        summary: "Obtener una publicación",
        description: "Obtiene una publicación de fraude mediante su ID."
    })
    @ApiParam({
        name: "postId",
        description: "ID de la publicación.",
        type: Number,
        example: 4
    })
    @ApiResponse({
        status: 200,
        description: "Información de la publicación.",
        type: ResponseDetailedPostDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiNotFoundResponse()
    findById(
        @Param("postId", ParseIntPipe) postId: number,
        @CurrentUser() user: JwtPayload
    ): Promise<ResponseDetailedPostDto | ResponseAdminPostDto> {
        return this.service.findById(postId, user.sub, user.role_id);
    }

    @Post()
    @ApiOperation({
        summary: "Crear una publicación",
        description: "Crea una nueva publicación de fraude."
    })
    @ApiResponse({
        status: 201,
        description: "Publicación de fraude creada correctamente.",
        type: ResponseDetailedPostDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiConflictResponse()
    createPost(
        @CurrentUser() user: JwtPayload,
        @Body() dto: CreatePostDto
    ): Promise<ResponseDetailedPostDto>{
        return this.service.createPost(dto, user.sub);
    }

    @Patch(":postId")
    @ApiOperation({
        summary: "Actualizar una publicación",
        description: "Actualizar una publicación de fraude."
    })
    @ApiParam({
        name: "postId",
        description: "ID de la publicación.",
        type: Number,
        example: 4
    })
    @ApiResponse({
        status: 200,
        description: "Publicación de fraude actualizada correctamente.",
        type: ResponseDetailedPostDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiNotFoundResponse()
    @ApiConflictResponse()
    updatePost(
        @Param("postId", ParseIntPipe) postId: number,
        @CurrentUser() user: JwtPayload,
        @Body() dto: UpdatePostDto
    ): Promise<ResponseDetailedPostDto>{
        return this.service.updatePost(postId, dto, user.sub, user.role_id);
    }

    @Delete(":postId")
    @ApiOperation({
        summary: "Borrar una publicación",
        description: "Borrar una publicación de fraude."
    })
    @ApiNoContentResponse()
    @ApiParam({
        name: "postId",
        description: "ID de la publicación.",
        type: Number,
        example: 4
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiNotFoundResponse()
    deletePost(
        @Param("postId", ParseIntPipe) postId: number,
        @CurrentUser() user: JwtPayload
    ) {
        return this.service.deletePost(postId, user.sub, user.role_id);
    }

    @Patch(":postId/evidences/:evidenceId")
    @ApiOperation({
        summary: "Actualizar una evidencia de una publicación",
        description: "Actualizar el estado is_visible de una evidencia."
    })
    @ApiParam({
        name: "postId",
        description: "ID de la publicación.",
        type: Number,
        example: 4
    })
    @ApiParam({
        name: "evidenceId",
        description: "ID de la evidencia.",
        type: Number,
        example: 4
    })
    @ApiResponse({
        status: 200,
        description: "Evidencia actualizada correctamente.",
        type: ResponseEvidenceDto
    })
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiNotFoundResponse()
    @UseGuards(RolesGuard)
    @Roles(ADMIN_ROLE_ID)
    updatePostEvidence(
        @Param("postId", ParseIntPipe) postId: number,
        @Param("evidenceId", ParseIntPipe) evidence_id: number,
        @Body() dto: UpdatePostEvidenceDto
    ): Promise<ResponseEvidenceDto | null> {
        return this.service.updatePostEvidence(postId, evidence_id, dto.is_visible);
    }


    @Delete(":postId/evidences/:evidenceId")
    @ApiOperation({
        summary: "Eliminar una evidencia",
        description: "Eliminar una evidencia de una publicación."
    })
    @ApiParam({
        name: "postId",
        description: "ID de la publicación.",
        type: Number,
        example: 4
    })
    @ApiParam({
        name: "evidenceId",
        description: "ID de la evidencia.",
        type: Number,
        example: 4
    })
    @ApiNoContentResponse()
    @ApiBadRequestResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiNotFoundResponse()
    deletePostEvidence(
        @Param("postId", ParseIntPipe) postId: number,
        @Param("evidenceId", ParseIntPipe) evidence_id: number,
        @CurrentUser() user: JwtPayload
    ): Promise<void> {
        return this.service.deletePostEvidence(postId, evidence_id, user.sub, user.role_id);
    }
}
