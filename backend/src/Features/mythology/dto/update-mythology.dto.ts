import { IsString, IsNotEmpty, IsOptional, IsEnum, ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { ImagesDto } from "./images-mythology.dto";
import { EffectsDto } from "./effects-mythology.dto";

export class UpdateMythologyDto {
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
    @Type(() => EffectsDto)
    effects?: EffectsDto[];
}
