import { IsString, IsNotEmpty, IsEnum, ValidateNested, IsArray } from "class-validator";
import { eHeroGender } from "../../../enums";
import { ImagesDto } from "./images-hero.dto";
import { Type } from "class-transformer";
import { MythologyInfoDto } from "./mythologyInfo-hero.dto";
import { GodInfoDto } from "./godInfo-hero.dto";

export class CreateHeroDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(eHeroGender)
    sex: eHeroGender;

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
