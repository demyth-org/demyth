import { IsString, IsNotEmpty, IsOptional, IsEnum, ValidateNested, IsArray } from "class-validator";
import { mythologies } from "../enum";
import { Type } from "class-transformer";
import { ImagesDto } from "./images-mythology.dto";
import { EffectsDto } from "./effects-mythology.dto";

export class CreateMythologyDto {
    @IsEnum(mythologies)
    name: mythologies;

    @IsString()
    shortDesc: string;

    @IsString()
    longDesc: string;

    @ValidateNested()
    @Type(() => ImagesDto)
    images: ImagesDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EffectsDto)
    effects: EffectsDto[];
}
