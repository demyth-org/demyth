import { IsString, IsOptional, IsEnum, IsEmail, MinLength, IsEthereumAddress, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";
import { ObjectId } from "mongoose";

export class SignUpDto {
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
}

export class SignInDto {
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
}
