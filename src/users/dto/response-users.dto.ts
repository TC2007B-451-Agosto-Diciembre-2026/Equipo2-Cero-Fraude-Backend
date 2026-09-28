import { ResponseUserDto } from "./response-user.dto";

export class ResponseUsersDto {
    data: ResponseUserDto[];
    page: number;
    total_pages: number;
    total: number;
}
