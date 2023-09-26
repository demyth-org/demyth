import { IsString, IsEnum, ValidateNested, IsArray, IsMongoId, IsNumber, IsPositive } from "class-validator";
import { eSubUnitType, eUnitType } from "../enum";
import { Type } from "class-transformer";
import { ImagesDto } from "./images-role.dto";

export class CreateRoleDto {
    @IsString()
    name: string;

    @IsEnum(eUnitType)
    unitType: eUnitType;

    @IsEnum(eSubUnitType)
    subUnitType: eSubUnitType;

    @IsString()
    shortDesc: string;

    @IsString()
    longDesc: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ImagesDto)
    images: ImagesDto[];

    @IsPositive()
    @IsNumber()
    strength: number;
    @IsPositive()
    @IsNumber()
    dexterity: number;
    @IsPositive()
    @IsNumber()
    intelligence: number;
    @IsPositive()
    @IsNumber()
    constitution: number;
    @IsPositive()
    @IsNumber()
    luck: number;
    @IsPositive()
    @IsNumber()
    armor: number;

    @IsMongoId()
    mythology: string;

    @IsMongoId()
    god: string;
}
