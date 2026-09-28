import { Transform, Type } from 'class-transformer';
import {
    IsBoolean,
    IsDateString,
    IsInt,
    IsOptional,
    Min,
} from 'class-validator';

export class FindUsersDto {

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;

    @IsOptional()
    @Transform(({ value }) => {
        if (value === "true") return true;
        if (value === "false") return false;
        return value;
    })
    @IsBoolean()
    is_active?: boolean;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    role_id?: number;

    @IsOptional()
    @IsDateString()
    initial_date?: string;

    @IsOptional()
    @IsDateString()
    final_date?: string;
}
