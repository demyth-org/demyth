import { IsString, IsMongoId } from "class-validator";

export class GodInfoDto {
    @IsMongoId()
    _id: string;

    @IsString()
    name: string;
}
