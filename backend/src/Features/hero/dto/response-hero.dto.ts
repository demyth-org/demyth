import { Type, Transform } from "class-transformer";
import { eHeroSex } from "../enum";
import { ObjectId } from "mongoose";
import { ImagesDto } from "./images-hero.dto";
import { ResponsePowersDto } from "./powers-hero.dto";

export class ResponseHeroDto {
    @Transform((value) => value.obj._id.toString())
    _id: ObjectId;
    name: eHeroSex;
    shortDesc?: string;
    longDesc?: string;
    @Type(() => ImagesDto)
    images?: ImagesDto;
    @Type(() => ResponsePowersDto)
    powers?: ResponsePowersDto[];
    @Transform((value) => value.obj.mythology.toString())
    mythology: ObjectId;
}
