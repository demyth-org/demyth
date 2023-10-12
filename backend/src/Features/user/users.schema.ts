import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserType } from "./enum";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ unique: true, trim: true, index: true, sparse: true })
    email: string;

    @Prop()
    password: string;

    @Prop({ unique: true, trim: true, index: true, sparse: true })
    address: string;

    @Prop({ required: true, type: String, enum: UserType })
    userType: UserType;
}

export const UserSchema = SchemaFactory.createForClass(User);
