import { ConflictException, Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { SignInDto, SignUpDto } from "./dto/auth.dto";
import * as bcrypt from "bcrypt";
import { UserService } from "../Features/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { log } from "../utils/debug.utils";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<string> {
        if (!signUpDto.email && !signUpDto.address) {
            console.error(`${signUpDto.email} and ${signUpDto.address} are empties.`);
            throw new BadRequestException("Email and address are empties.");
        }
        const userExist = await this.userService.userExist(signUpDto.email, signUpDto.address);
        if (userExist) {
            console.error(`${signUpDto.email} or ${signUpDto.address} already exists.`);
            throw new ConflictException("Email or address already exists.");
        }
        const hashedPwd = await bcrypt.hash(signUpDto.password, await bcrypt.genSalt(10));
        signUpDto.password = hashedPwd;

        const createdUserDoc = await this.userService.createUser(signUpDto);

        const payload = { sub: createdUserDoc._id, address: createdUserDoc.address ?? createdUserDoc.email };
        return await this.getAccessToken(payload);
    }

    async signIn(signInDto: SignInDto): Promise<string> {
        const user = await this.userService.findOneByEmailOrAddress(signInDto.email, signInDto.address);

        const isMatch = await bcrypt.compare(signInDto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user._id, address: user.address ?? user.email };
        return await this.getAccessToken(payload);
    }

    async getAccessToken(payload: any): Promise<string> {
        return await this.jwtService.signAsync(payload, {
            secret: process.env.JSON_TOKEN_KEY,
            expiresIn: process.env.JSON_TOKEN_EXPIRE,
        });
    }
}
