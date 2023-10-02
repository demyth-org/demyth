import { Type, Transform } from "class-transformer";
import { eGods } from "../../../enums";
import { ObjectId } from "mongoose";
import { ImagesDto } from "./images-god.dto";
import { ResponsePowersDto } from "./powers-god.dto";
import { LambdaDto } from "../../../utils/dto.utils";

export class ResponseRolesDto extends LambdaDto {}
export class ResponseCreaturesDto extends LambdaDto {}

export class ResponseGodDto {
    @Transform((value) => value.obj._id.toString())
    _id: ObjectId;
    name: eGods;
    shortDesc?: string;
    longDesc?: string;
    @Type(() => ImagesDto)
    images?: ImagesDto;
    @Type(() => ResponsePowersDto)
    powers?: ResponsePowersDto[];
    @Transform((value) => value.obj.mythology.toString())
    mythology: ObjectId;
    @Type(() => ResponseRolesDto)
    roles?: ObjectId[];
    @Type(() => ResponseCreaturesDto)
    creatures?: ObjectId[];
}
