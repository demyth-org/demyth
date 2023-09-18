import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { mythologies } from "../mythology/enum";

export type MythologyDocument = HydratedDocument<Mythology>;

@Schema()
export class Mythology {
    @Prop({ required: true, type: String, enum: mythologies, unique: true })
    name: string;

    @Prop()
    shortDesc: string;

    @Prop()
    longDesc: string;

    @Prop(
        raw({
            main: { type: String },
            miniature: { type: String },
            icon: { type: String },
        }),
    )
    images: Record<string, any>;

    @Prop([
        raw({
            name: { type: String },
            shortDesc: { type: String },
            icon: { type: String },
        }),
    ])
    effects: [Record<string, any>];
}

export const MythologySchema = SchemaFactory.createForClass(Mythology);
