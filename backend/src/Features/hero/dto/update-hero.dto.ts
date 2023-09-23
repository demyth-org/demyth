import { IsString, IsNotEmpty, IsOptional, ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { ImagesDto } from "./images-hero.dto";
import { PowersDto } from "./powers-hero.dto";

export class UpdateHeroDto {
    @IsOptional()
    @IsString()
    shortDesc?: string;

    @IsOptional()
    @IsString()
    longDesc?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => ImagesDto)
    images?: ImagesDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PowersDto)
    powers: PowersDto[];
}
