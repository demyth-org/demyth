import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Mythology } from "../mythology/mythologies.schema";

export type GodDocument = HydratedDocument<God>;

@Schema()
export class God {
    @Prop()
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
    powers: [Record<string, any>];

    // TODO : a god can have several roles associated possible to choose
    /*@Prop([
        raw({
            name: { type: String },
            shortDesc: { type: String },
            icon: { type: String },
        }),
    ])
    roles: [Record<string, any>];*/

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Mythology" })
    mythology: Mythology;
}

export const GodSchema = SchemaFactory.createForClass(God);
