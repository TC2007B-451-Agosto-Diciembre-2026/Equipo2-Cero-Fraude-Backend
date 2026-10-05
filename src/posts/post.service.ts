import { ADMIN_ROLE_ID, DRAFT_STATUS_ID, PAGE_SIZE, UPLOADED_STATUS_ID, USER_ROLE_ID } from "../common/constants";
import { FindPostsDto } from "./dto/requests/find-posts.dto";
import { ResponsePostsDto } from "./dto/responses/response-posts.dto";
import { PostRepository } from "./post.repository";
import { ResponsePostDto } from "./dto/responses/response-post.dto";
import { ResponseDetailedPostDto } from "./dto/responses/response-detailed-post.dto";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto } from "./dto/requests/create-post.dto";
import { handleDuplicateError } from "../common/error-handler";
import { FindPostsResult } from "./dto/responses/find-posts-result.dto";
import { FindMyPostsDto } from "./dto/requests/find-my-posts.dto";
import { PostEntity } from "./entities/post.entity";
import { getLanUrl } from "../common/network";

@Injectable()
export class PostService {
    constructor(private readonly repository : PostRepository) {}

    async findAll(
        query: FindPostsDto,
        role_id: number
    ): Promise <ResponsePostsDto> {
        let result: FindPostsResult;

        if(role_id === USER_ROLE_ID){
            result = await this.repository.findAll(query, "status_id IN (4, 5)");

        } else if(role_id === ADMIN_ROLE_ID){
            result = await this.repository.findAll(query, "status_id IN (2, 3, 4, 5)");

        } else{
            throw new Error("Rol inexistente.");
        }

        const posts = new ResponsePostsDto();
        posts.data = result.posts.map(
            post => ResponsePostDto.fromEntity(
                post,
                this.getBaseUrl()
            )
        );
        const page = query.page ?? 1;
        const total_pages = Math.ceil(result.total / PAGE_SIZE);
        posts.page = page;
        posts.total_pages = total_pages;
        posts.total = result.total;
        return posts;
    }

    async findMyPosts(
        query: FindMyPostsDto,
        user_id: string
    ): Promise <ResponsePostsDto> {
        let status_condition;
        if(query.is_draft === true){
            status_condition = "status_id IN (1)";
        } else{
            status_condition = "status_id IN (2, 3, 4, 5)";
        }

        const derived_query = new FindPostsDto();
        derived_query.page = query.page ?? 1;
        const result = await this.repository.findAll(derived_query, status_condition, user_id);

        const posts = new ResponsePostsDto();
        posts.data = result.posts.map(
            post => ResponsePostDto.fromEntity(
                post,
                this.getBaseUrl()
            )
        );

        posts.page = query.page ?? 1;
        posts.total_pages = Math.ceil(result.total / PAGE_SIZE);
        posts.total = result.total;
        return posts;
    }

    async findById(
       post_id: number,
       user_id: string,
       user_role: number
    ): Promise<ResponseDetailedPostDto> {
        let post: PostEntity | null;
        let status_condition;
        if(user_role === ADMIN_ROLE_ID){
            status_condition = "status_id IN (1)";
        } else{
            status_condition = "status_id IN (2, 3, 4, 5)";
        }
        if(user_role === ADMIN_ROLE_ID){
            post = await this.repository.findAdminById(post_id);
        } else if(user_role === USER_ROLE_ID){
            post = await this.repository.findVisibleToUser(post_id, user_id);
        } else{
            throw new Error("Rol inexistente.");
        }
        if(!post){
            throw new NotFoundException("Publicación no encontrada.");
        }
        return ResponseDetailedPostDto.fromEntity(
            post,
            this.getBaseUrl()
        );
    }

    async findOne(): Promise<ResponsePostDto> {
        let post: PostEntity | null;
        post = await this.repository.findOne();
        if(!post){
            throw new NotFoundException("Publicación no encontrada.");
        }
        return ResponseDetailedPostDto.fromEntity(
            post,
            this.getBaseUrl()
        );
    }

    async createPost(
        dto: CreatePostDto,
        user_id: string
    ): Promise<ResponseDetailedPostDto> {
        if(dto.status_id === undefined){
            throw new BadRequestException("Una publicación subida debe tener un estado.");
        }
        if(dto.status_id === UPLOADED_STATUS_ID){
            if(!dto.title || (!dto.description && (!dto.evidences || dto.evidences.length === 0))){
                throw new BadRequestException("Una publicación subida debe tener un título y una descripción o al menos una evidencia.");
            }
        } else if(dto.status_id !== DRAFT_STATUS_ID){
            throw new BadRequestException("El estado inicial de la publicación no es válido.");
        }

        try {
            const post = await this.repository.create(dto, user_id);
            return ResponseDetailedPostDto.fromEntity(
                post,
                this.getBaseUrl()
            );
        } catch (error) {
            handleDuplicateError(error);
            throw error;
        }
    }

    private getBaseUrl(): string {
        const port = Number(process.env.PORT ?? 3000);
        return getLanUrl(port);
    }
}
