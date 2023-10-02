import { Transform } from "class-transformer";
import { ObjectId } from "mongoose";

export class LambdaDto {
    @Transform((value) => value.obj._id.toString())
    _id: ObjectId;
}
