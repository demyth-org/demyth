import mongoose from "mongoose";
import { IsString, IsNotEmpty, IsOptional, IsEnum, ValidateNested, IsArray, IsMongoId } from "class-validator";
import { eHeroSex } from "../enum";
import { ImagesDto } from "./images-hero.dto";
import { Type } from "class-transformer";
import { MythologyInfoDto } from "./mythology-info-hero.dto";
import { GodInfoDto } from "./god-info-hero.dto";

export class CreateHeroDto {
    @IsMongoId()
    user: string;

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
