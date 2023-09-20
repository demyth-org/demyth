import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { userType } from "./enum";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop({ unique: true })
    address: string;

    @Prop({ required: true, type: String, enum: userType, unique: true })
    userType: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
