import { Model, ObjectId, Types } from "mongoose";
import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./users.schema";
import { UserType } from "./enum";
import { plainToClass } from "class-transformer";
import { SignUpDto } from "../../auth/dto/auth.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async userExist(
        email: string,
        address: string,
    ): Promise<{
        _id: Types.ObjectId;
    } | null> {
        return await this.userModel.exists({
            $or: [
                {
                    email: email ?? "",
                },
                { address: address ?? "" },
            ],
        });
    }

    async findOneByEmail(email: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({ email }).exec();
    }

    async findOneById(id: string): Promise<UserDocument | null> {
        return await this.userModel.findById(id).exec();
    }

    async createUser(signUpDto: SignUpDto): Promise<UserDocument> {
        const newUser = new this.userModel({ ...signUpDto, userType: UserType.Player });
        return await newUser.save({ timestamps: true });
    }
}
