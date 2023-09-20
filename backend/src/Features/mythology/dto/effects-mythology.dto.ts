import { IsString, IsOptional } from "class-validator";
import { Transform, Exclude } from "class-transformer";
import { Types, ObjectId } from "mongoose";

export class EffectsDto {
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

export class ResponseEffectsDtoWithoutNestedId extends EffectsDto {
    @Exclude()
    _id: Types.ObjectId;

    constructor(dto: Partial<ResponseEffectsDtoWithoutNestedId>) {
        super();
        Object.assign(this, dto);
    }
}

export class ResponseEffectsDto extends EffectsDto {
    @Transform((value) => value.obj._id.toString())
    _id: ObjectId;
}
