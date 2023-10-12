import { Type, Transform } from "class-transformer";
import { eMythologies } from "../../../enums";
import { ObjectId } from "mongoose";
import { ImagesDto } from "./images-mythology.dto";
import { ResponseEffectsDto } from "./effects-mythology.dto";

export class ResponseMythologyDto {
    @Transform((value) => value.obj._id.toString())
    _id: ObjectId;
    name: eMythologies;
    shortDesc?: string;
    longDesc?: string;
    @Type(() => ImagesDto)
    images?: ImagesDto;
    @Type(() => ResponseEffectsDto)
    effects: ResponseEffectsDto[];
}
