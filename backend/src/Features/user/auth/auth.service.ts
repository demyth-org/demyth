import { Model } from "mongoose";
import {
    ConflictException,
    Injectable,
    BadRequestException,
    NotFoundException,
    UnprocessableEntityException,
} from "@nestjs/common";
import { ResponseUserDto, SignupDto } from "../dto/auth.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../users.schema";
import { sign } from "crypto";
import { plainToClass } from "class-transformer";
import { log } from "../../../utils/debug.utils";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    getResponseDtoFrom(anUser: UserDocument): ResponseUserDto {
        return plainToClass(ResponseUserDto, anUser.toJSON());
    }

    async signup(signupdto: SignupDto): Promise<ResponseUserDto> {
        if (!signupdto.email && !signupdto.address) {
            console.error(`${signupdto.email} and ${signupdto.address} are empties.`);
            throw new BadRequestException("Email and address are empties.");
        }

        const userExist = await this.userModel.exists({
            $or: [
                {
                    email: signupdto.email ?? "",
                },
                { address: signupdto.address ?? "" },
            ],
        });

        if (userExist) {
            console.error(`${signupdto.email} or ${signupdto.address} already exists.`);
            throw new ConflictException("Email or address already exists.");
        }

        const hashedPwd = await bcrypt.hash(signupdto.password, 10);
        Object.assign(signupdto, { password: hashedPwd });

        const createdUser = new this.userModel(signupdto);
        return this.getResponseDtoFrom(await createdUser.save({ timestamps: true }));
    }
}
