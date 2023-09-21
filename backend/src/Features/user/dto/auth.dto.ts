import {
    IsString,
    IsOptional,
    IsEnum,
    IsEmail,
    IsHexadecimal,
    MinLength,
    IsEthereumAddress,
    IsNotEmpty,
} from "class-validator";
import { UserType } from "../enum";
import { Type, Transform } from "class-transformer";
import { ObjectId } from "mongoose";

export class SignupDto {
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsNotEmpty()
    @IsEthereumAddress()
    address: string;

    @IsEnum(UserType)
    userType: string;
}

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
