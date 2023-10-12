import { ConflictException, Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { SignInDto, SignUpDto } from "./dto/auth.dto";
import * as bcrypt from "bcrypt";
import { UserService } from "../Features/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserType } from "../Features/user/enum";
import { Types } from "mongoose";
import { JWTPayload } from "./interface-auth";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<string> {
        const { email, password } = signUpDto;

        if (!email && !password) {
            throw new BadRequestException("Email or password are empties.");
        }
        if (await this.userService.userExist(email, "")) {
            throw new ConflictException("Email or address already exists.");
        }

        const createdUserDoc = await this.userService.createUser({
            email,
            password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
        });

        return await this.getAccessToken({ sub: createdUserDoc._id.toString(), email, role: createdUserDoc.userType });
    }

    async signIn(signInDto: SignInDto): Promise<string> {
        const { email, password } = signInDto;
        if (!email && !password) {
            throw new BadRequestException("Email or password are empties.");
        }
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new UnauthorizedException("Wrong credentials.");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException("Wrong credentials.");
        }

        return await this.getAccessToken({ sub: user._id.toString(), email, role: user.userType });
    }

    async getAccessToken(payload: JWTPayload): Promise<string> {
        return await this.jwtService.signAsync(payload, {
            secret: process.env.JSON_TOKEN_KEY,
            expiresIn: process.env.JSON_TOKEN_EXPIRE,
        });
    }
}
