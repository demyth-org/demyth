import { IsString, IsNotEmpty, IsEnum, IsOptional, ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { ImagesDto } from "./images-hero.dto";
import { PowersDto } from "./powers-hero.dto";
import { GodInfoDto } from "./godInfo-hero.dto";
import { MythologyInfoDto } from "./mythologyInfo-hero.dto";
import { eHeroSex } from "../enum";

export class UpdateHeroDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(eHeroSex)
    sex: eHeroSex;

    @IsString()
    role: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ImagesDto)
    images: ImagesDto[];

    @ValidateNested()
    @Type(() => MythologyInfoDto)
    mythologyInfo: {
        _id: string;
        name: string;
    };

    @ValidateNested()
    @Type(() => GodInfoDto)
    godInfo: {
        _id: string;
        name: string;
    };
}
