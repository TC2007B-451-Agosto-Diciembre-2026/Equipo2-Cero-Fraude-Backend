import { IsBoolean } from "class-validator";

export class UpdatePostEvidenceDto {
    @IsBoolean()
    is_visible: boolean;
}
