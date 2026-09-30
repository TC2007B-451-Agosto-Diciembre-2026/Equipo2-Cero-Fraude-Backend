import { ApiProperty } from "@nestjs/swagger";

export class Evidence {
    @ApiProperty()
    id: number;
    @ApiProperty()
    owner_id: string;
    @ApiProperty()
    is_visible: boolean;
    @ApiProperty()
    storage_path: string;
    @ApiProperty()
    created_at: Date;
    @ApiProperty()
    expires_at: Date | null;
    @ApiProperty()
    deleted_at: Date | null;
    evidence_type_id: number;
    @ApiProperty()
    post_id: number | null;
}
