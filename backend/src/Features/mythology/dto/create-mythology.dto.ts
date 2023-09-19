import { IsString, IsNotEmpty, IsOptional, IsEnum, ValidateNested } from "class-validator";
import { mythologies } from "../enum";
import { Type } from "class-transformer";
import { ImagesDto } from "./images-mythology.dto";
import { EffectsDto } from "./effects-mythology.dto";
import { Mythology, MythologyDocument } from "../mythologies.schema";

// TODO: validate dto + doc pour devs @IsString()... 6:29

export class CreateMythologyDto {
    @IsEnum(mythologies)
    name: mythologies;

    @IsOptional()
    @IsString()
    shortDesc: string;

    @IsOptional()
    @IsString()
    longDesc: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => ImagesDto)
    images: ImagesDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => EffectsDto)
    effects: EffectsDto[];
}
