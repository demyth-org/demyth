import { Type, Transform } from "class-transformer";
import { eHeroGender } from "../../../enums";
import { ObjectId } from "mongoose";
import { ImagesDto } from "./images-hero.dto";
import { MythologyInfoDto } from "./mythologyInfo-hero.dto";
import { GodInfoDto } from "./godInfo-hero.dto";

export class ResponseHeroDto {
    @Transform((value) => value.obj._id.toString())
    _id: ObjectId;
    @Transform((value) => value.obj.user.toString())
    user: ObjectId;
    name: string;
    sex: eHeroGender;
    role: string;
    @Type(() => ImagesDto)
    images: ImagesDto[];
    @Type(() => MythologyInfoDto)
    mythologyInfo: MythologyInfoDto;
    @Type(() => GodInfoDto)
    godInfo: GodInfoDto;
}
