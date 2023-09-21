import { UserType } from "../enum";
import { Transform } from "class-transformer";
import { ObjectId } from "mongoose";

export class ResponseUserDto {
    @Transform((value) => value.obj._id.toString())
    _id: ObjectId;
    email: string;
    password: string;
    address: string;
    userType: UserType;
    createdAt: Date;
    updatedAt: Date;
}
