import { IsString, IsOptional } from "class-validator";

export class EffectsDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    shortDesc: string;

    @IsOptional()
    @IsString()
    icon: string;
}
