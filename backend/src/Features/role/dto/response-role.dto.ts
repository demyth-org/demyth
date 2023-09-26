import { Type, Transform } from "class-transformer";
import { eUnitType, eSubUnitType } from "../enum";
import { ObjectId } from "mongoose";
import { ImagesDto } from "./images-role.dto";

export class ResponseRoleDto {
    @Transform((value) => value.obj._id.toString())
    _id: ObjectId;
    name: string;
    unitType: eUnitType;
    subUnitType: eSubUnitType;
    shortDesc: string;
    longDesc: string;
    @Type(() => ImagesDto)
    images?: ImagesDto[];
    strength: number;
    dexterity: number;
    intelligence: number;
    constitution: number;
    luck: number;
    armor: number;
    @Transform((value) => value.obj.mythology.toString())
    mythology: ObjectId;
    @Transform((value) => value.obj.god.toString())
    god: ObjectId;
}
