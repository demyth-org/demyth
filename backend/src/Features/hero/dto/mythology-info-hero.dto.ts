import { IsString, IsMongoId } from "class-validator";

export class MythologyInfoDto {
    @IsMongoId()
    _id: string;

    @IsString()
    name: string;
}
