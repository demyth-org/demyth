import { IsString, IsOptional, IsEnum, IsEmail, MinLength, IsEthereumAddress, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";
import { ObjectId } from "mongoose";

export class SignUpDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    /*@IsOptional()
    @IsNotEmpty()
    @IsEthereumAddress()
    address: string;*/
}

export class SignInDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    /*@IsOptional()
    @IsNotEmpty()
    @IsEthereumAddress()
    address: string;*/
}
