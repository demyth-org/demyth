import { IsString, IsEnum, IsMongoId, IsNumber, IsPositive, IsNotEmpty } from "class-validator";

import { eClassSubType, eClassType } from "../../../enums";

export class CreateCreatureDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEnum(eClassType)
    unitType: eClassType;

    @IsEnum(eClassSubType)
    subUnitType: eClassSubType;

    @IsString()
    shortDesc: string;

    @IsString()
    longDesc: string;

    @IsString()
    image: string;

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

    @IsPositive()
    @IsNumber()
    fatigue: number;

    @IsMongoId()
    mythology: string;

    @IsMongoId()
    god: string;
}
