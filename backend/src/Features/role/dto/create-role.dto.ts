import {
    IsString,
    IsEnum,
    ValidateNested,
    IsArray,
    IsMongoId,
    IsNumber,
    IsPositive,
    IsNotEmpty,
} from "class-validator";
import { Type } from "class-transformer";
import { ImagesDto } from "./images-role.dto";
import { eClassSubType, eClassType, eGods, eMythologies } from "../../../enums";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(eClassType)
    roleType: eClassType;

    @IsEnum(eClassSubType)
    roleSubType: eClassSubType;

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

    @IsEnum(eMythologies)
    mythology: eMythologies;

    @IsEnum(eGods)
    god: eGods;
}
