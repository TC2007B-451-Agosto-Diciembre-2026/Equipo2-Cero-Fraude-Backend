import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { ApiBadRequestResponse, ApiConflictResponse, ApiForbiddenResponse, ApiUnauthorizedResponse, ApiNotFoundResponse } from "../common/api-responses";
import { FindPostsDto } from "./dto/requests/find-posts.dto";
import { CurrentUser } from "../auth/current-user.decorator";
import type { JwtPayload } from "../auth/jwt";
import { ResponsePostsDto } from "./dto/responses/response-posts.dto";
import { PostService } from "./post.service";
import { ResponseDetailedPostDto } from "./dto/responses/response-detailed-post.dto";
import { FindMyPostsDto } from "./dto/requests/find-my-posts.dto";
import { CreatePostDto } from "./dto/requests/create-post.dto";
import { ResponsePostDto } from "./dto/responses/response-post.dto";

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
    @ApiForbiddenResponse()
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

    @Get("homeview")
    @ApiOperation({
        summary: "Obtener una publicación para inicio",
        description: "Obtiene una publicación de fraude para la pantalla de inicio de la aplicación."
    })
    @ApiResponse({
        status: 200,
        description: "Información de la publicación.",
        type: ResponsePostDto
    })
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    findOne(
    ): Promise<ResponsePostDto> {
        return this.service.findOne();
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
    ): Promise<ResponseDetailedPostDto> {
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
    @ApiNotFoundResponse()
    @ApiConflictResponse()
    createPost(
        @CurrentUser() user: JwtPayload,
        @Body() dto: CreatePostDto
    ): Promise<ResponseDetailedPostDto>{
        return this.service.createPost(dto, user.sub);
    }

    /*@Patch()
    @ApiOperation({

    })
    updatePost(
        @CurrentUser() user: JwtPayload,
        @Body() dto: UpdatePostDto
    )*/
}
