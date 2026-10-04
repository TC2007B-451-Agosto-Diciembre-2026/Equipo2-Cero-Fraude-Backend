import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AccessTokenDto {
    @ApiProperty({
        description: "El accessToken",
        example: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIuLi4ifQ.firma",
    })
    @IsString()
    access_token: string;

    static create(access_token: string):  AccessTokenDto {
        const dto = new AccessTokenDto();
        dto.access_token = access_token;
        return dto;
    }
}
