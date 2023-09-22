import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { eHeroSex } from "./enum";
import { God } from "../god/gods.schema";
import { Mythology } from "../mythology/mythologies.schema";
import { User } from "../user/users.schema";

export type HeroDocument = HydratedDocument<Hero>;

@Schema()
export class Hero {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    user: User;

    @Prop({ required: true, unique: true, trim: true })
    name: string;

    @Prop({ required: true, type: String, enum: eHeroSex, default: eHeroSex.N })
    sex: eHeroSex;

    @Prop()
    role: string;

    @Prop(
        raw({
            main: { type: String },
            active: { type: Boolean },
        }),
    )
    images: [Record<string, any>];

    @Prop({ type: Mythology, required: true })
    mythologyInfo: {
        _id: { type: mongoose.Schema.Types.ObjectId; ref: "Mythology" };
        name: Mythology["name"];
    };

    @Prop({ type: God, required: true })
    godInfo: {
        _id: { type: mongoose.Schema.Types.ObjectId; ref: "God" };
        name: God["name"];
    };
}

export const HeroSchema = SchemaFactory.createForClass(Hero);
