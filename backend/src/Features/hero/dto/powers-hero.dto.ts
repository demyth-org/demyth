import { IsString, IsOptional } from "class-validator";
import { Transform, Exclude } from "class-transformer";
import { Types, ObjectId } from "mongoose";

export class PowersDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    shortDesc: string;

    @IsString()
    @IsOptional()
    icon: string;
}

export class ResponsePowersDtoWithoutNestedId extends PowersDto {
    @Exclude()
    _id: Types.ObjectId;

    constructor(dto: Partial<ResponsePowersDtoWithoutNestedId>) {
        super();
        Object.assign(this, dto);
    }
}

export class ResponsePowersDto extends PowersDto {
    @Transform((value) => value.obj._id.toString())
    _id: ObjectId;
}
