import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { userType } from "./enum";

export type PlayerDocument = HydratedDocument<Player>;

@Schema({ timestamps: true })
export class Player {
    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop({ unique: true })
    address: string;

    @Prop({ required: true, type: String, enum: userType, unique: true })
    userType: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
