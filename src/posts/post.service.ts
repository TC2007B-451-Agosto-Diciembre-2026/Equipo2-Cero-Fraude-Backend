import { ADMIN_ROLE_ID, DRAFT_STATUS_ID, PAGE_SIZE, PUBLISHED_STATUS_ID, REJECTED_STATUS_ID, UPLOADED_STATUS_ID, USER_ROLE_ID, VALIDATED_STATUS_ID } from "../common/constants";
import { FindPostsDto } from "./dto/requests/find-posts.dto";
import { ResponsePostsDto } from "./dto/responses/response-posts.dto";
import { PostRepository } from "./post.repository";
import { ResponsePostDto } from "./dto/responses/response-post.dto";
import { ResponseDetailedPostDto } from "./dto/responses/response-detailed-post.dto";
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto } from "./dto/requests/create-post.dto";
import { handleDuplicateError } from "../common/error-handler";
import { FindPostsResult } from "./dto/responses/find-posts-result.dto";
import { FindMyPostsDto } from "./dto/requests/find-my-posts.dto";
import { PostEntity } from "./entities/post.entity";
import { getBaseUrl } from "../common/network";
import { DerivedFindPostsDto } from "./dto/requests/derived-find-posts.dto";
import { ResponseAdminPostDto } from "./dto/responses/response-admin-post.dto";
import { ResponseEvidenceDto } from "../evidences/dto/response-evidence.dto";
import { UpdatePostDto } from "./dto/requests/update-post.dto";
import { EvidenceService } from "../evidences/evidence.service";
import { DeletedEvidenceResult } from "./dto/requests/deleted-evidence-result.dto";
import { DeletedPostResult } from "./dto/requests/deleted-post-results.dto";

@Injectable()
export class PostService {
    constructor(
        private readonly repository : PostRepository,
        private readonly evidence_service: EvidenceService
    ) {}

    async findAll(
        query: FindPostsDto,
        role_id: number
    ): Promise <ResponsePostsDto> {
        let result: FindPostsResult;

        const derived_query = new DerivedFindPostsDto();
        Object.assign(derived_query, query);
        derived_query.role_id = role_id;

        if(role_id === USER_ROLE_ID){
            result = await this.repository.findAll(derived_query, `fp.status_id IN (${PUBLISHED_STATUS_ID}, ${VALIDATED_STATUS_ID})`);

        } else if(role_id === ADMIN_ROLE_ID){
            result = await this.repository.findAll(derived_query,
                `fp.status_id IN (
                    ${UPLOADED_STATUS_ID},
                    ${REJECTED_STATUS_ID},
                    ${PUBLISHED_STATUS_ID},
                    ${VALIDATED_STATUS_ID}
                )`);
        } else{
            throw new ForbiddenException("Rol no permitido.");
        }

        const posts = new ResponsePostsDto();
        posts.data = result.posts.map(
            post => ResponsePostDto.fromEntity(
                post,
                getBaseUrl()
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
            status_condition = `fp.status_id IN (${DRAFT_STATUS_ID})`;
        } else{
            status_condition = `fp.status_id IN (
                ${UPLOADED_STATUS_ID},
                ${REJECTED_STATUS_ID},
                ${PUBLISHED_STATUS_ID},
                ${VALIDATED_STATUS_ID}
            )`;
        }

        const derived_query = new DerivedFindPostsDto();
        derived_query.role_id = USER_ROLE_ID;
        Object.assign(derived_query, query);
        derived_query.page = query.page ?? 1;
        derived_query.user_id = user_id;

        const result = await this.repository.findAll(derived_query, status_condition);

        const posts = new ResponsePostsDto();
        posts.data = result.posts.map(
            post => ResponsePostDto.fromEntity(
                post,
                getBaseUrl()
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
    ): Promise<ResponseDetailedPostDto | ResponseAdminPostDto> {
        let post: PostEntity | null;
        if(user_role === ADMIN_ROLE_ID){
            post = await this.repository.findAdminById(post_id);
        } else if(user_role === USER_ROLE_ID){
            post = await this.repository.findVisibleToUser(post_id, user_id);
        } else{
            throw new ForbiddenException("Rol no permitido.");
        }
        if(!post){
            throw new NotFoundException("Publicación no encontrada.");
        }


        if(user_role === ADMIN_ROLE_ID){
            return ResponseAdminPostDto.fromEntity(
                post,
                getBaseUrl()
            );
        } else {
            return ResponseDetailedPostDto.fromEntity(
                post,
                getBaseUrl()
            );
        }
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
                getBaseUrl()
            );
        } catch (error) {
            handleDuplicateError(error);
            throw error;
        }
    }

    async updatePost(
        post_id: number,
        dto: UpdatePostDto,
        user_id: string,
        user_role: number
    ): Promise<ResponseDetailedPostDto> {

        if (Object.keys(dto).length === 0) {
            throw new BadRequestException(
                "Debe proporcionar al menos un campo para actualizar."
            );
        }

        if(user_role === USER_ROLE_ID){
            if(dto.is_fraud !== undefined || dto.status_id === PUBLISHED_STATUS_ID || dto.status_id === REJECTED_STATUS_ID || dto.status_id === VALIDATED_STATUS_ID){
                throw new ForbiddenException("Campo inválido.");
            }
        }

        let post_to_update : PostEntity | null;
        if(user_role === ADMIN_ROLE_ID){
            post_to_update = await this.repository.findAdminById(post_id);
        } else if(user_role === USER_ROLE_ID){
            post_to_update = await this.repository.findVisibleToUser(post_id, user_id);
        } else{
            throw new ForbiddenException("Rol no permitido.");
        }

        if(post_to_update === null) {
            throw new NotFoundException("La publicación a modificar no existe, o no es accesible para modificar.");
        }

        if(user_role === USER_ROLE_ID){
            if(
                post_to_update.status_id !== DRAFT_STATUS_ID){
                throw new ForbiddenException("La publicación solicitada ya no se puede modificar.");
            }
        }
        if(user_role === ADMIN_ROLE_ID){
            if(post_to_update.status_id === DRAFT_STATUS_ID){
                throw new ForbiddenException("La publicación solicitada no se puede modificar.");
            }
        }

        if(user_role === USER_ROLE_ID && dto.status_id !== undefined && dto.status_id !== UPLOADED_STATUS_ID){
            throw new ForbiddenException("Campo inválido.");
        }
        if(user_role === ADMIN_ROLE_ID){
            if(dto.status_id === DRAFT_STATUS_ID || dto.status_id === UPLOADED_STATUS_ID){
                throw new ForbiddenException("Campo inválido.");
            }
            if(dto.status_id === PUBLISHED_STATUS_ID && post_to_update.status_id !== UPLOADED_STATUS_ID){
                throw new ForbiddenException("Campo inválido.");
            }
            if(dto.status_id === REJECTED_STATUS_ID && (post_to_update.status_id !== UPLOADED_STATUS_ID && post_to_update.status_id !== PUBLISHED_STATUS_ID)){
                throw new ForbiddenException("Campo inválido.");
            }
            if(dto.status_id === VALIDATED_STATUS_ID && post_to_update.status_id !== PUBLISHED_STATUS_ID){
                throw new ForbiddenException("Campo inválido.");
            }
            if(dto.is_fraud !== undefined && !(post_to_update.status_id === PUBLISHED_STATUS_ID && dto.status_id === VALIDATED_STATUS_ID)){
                throw new ForbiddenException("Campo inválido.");
            }
             if(dto.is_fraud === undefined && post_to_update.status_id === PUBLISHED_STATUS_ID && dto.status_id === VALIDATED_STATUS_ID){
                throw new ForbiddenException("Campo inválido.");
            }
            if(dto.description?.trim() === ""){
                throw new BadRequestException("Campo inválido.");
            }
        }
        if(user_role === USER_ROLE_ID){
            if(dto.status_id === UPLOADED_STATUS_ID){
                if((dto.description === undefined || dto.description.trim() === "") && (post_to_update.description === null || post_to_update.description.trim() === "")) {
                    throw new BadRequestException("Es requerido al menos una descripción para publicar una publicación.");
                }
            }
        }

        const post = await this.repository.updatePost(post_id, dto, user_id, user_role);
        if(!post){
            throw new NotFoundException("La publicación a actualizar no existe");
        }
        return ResponseDetailedPostDto.fromEntity(
            post,
            getBaseUrl()
        );
    }

    async deletePost(
        post_id: number,
        user_id: string,
        user_role: number
    ): Promise<void> {
        let result: DeletedPostResult | null;
        if(user_role === ADMIN_ROLE_ID){
            result = await this.repository.deleteByAdmin(post_id);
        } else{
            result = await this.repository.deleteByUser(post_id, user_id);
        }
        if(result === null){
            throw new NotFoundException("La publicación a eliminar no existe.")
        }
        for(const storage_path of result.evidence_paths) {
            await this.evidence_service.deleteFile(storage_path);
        }
    }

    async updatePostEvidence(
        post_id: number,
        evidence_id: number,
        is_visible: boolean
    ): Promise<ResponseEvidenceDto | null>{
        const evidence = await this.repository.updatePostEvidence(post_id, evidence_id, is_visible);
        if(evidence === null){
            return null;
        }
        return ResponseEvidenceDto.fromEntity(
            evidence,
            getBaseUrl()
        );
    }

    async deletePostEvidence(
        post_id: number,
        evidence_id: number,
        user_id: string,
        user_role: number
    ): Promise<void> {
        let evidence: DeletedEvidenceResult | null;

        if(user_role === ADMIN_ROLE_ID){
            evidence = await this.repository.deleteEvidenceByAdmin(post_id, evidence_id);
        } else{
            evidence = await this.repository.deleteEvidenceByUser(post_id, evidence_id, user_id);
        }

        if(evidence === null){
            throw new NotFoundException("La evidencia a eliminar no existe.")
        }

        await this.evidence_service.deleteFile(evidence.storage_path);
    }
}
