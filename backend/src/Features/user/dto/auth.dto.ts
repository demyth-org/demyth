import { IsString, IsOptional, IsEnum, IsEmail, IsHexadecimal, MinLength, IsEthereumAddress } from "class-validator";
import { userType } from "../enum";

export class SignupDto {
    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsEthereumAddress()
    address: string;

    @IsEnum(userType)
    userType: string;
}
