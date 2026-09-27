import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshDto {
    @ApiProperty({
        description: 'El refreshToken',
        example: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIuLi4ifQ.firma',
    })
    @IsNotEmpty()
    @IsString()
    refresh_token: string;
}
