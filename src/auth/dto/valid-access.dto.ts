import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ValidAccessDto {
    @ApiProperty({
        description: 'El accessToken',
        example: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIuLi4ifQ.firma',
    })
    @IsString()
    access_token: string;

    @ApiProperty({
        description: 'El refreshToken',
        example: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIuLi4ifQ.firma',
    })
    @IsString()
    refresh_token: string;

    static create(access_token: string, refresh_token: string):  ValidAccessDto {
        const dto = new ValidAccessDto();
        dto.access_token = access_token;
        dto.refresh_token = refresh_token;
        return dto;
    }
}
