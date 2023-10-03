import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Mythology } from "../mythology/mythologies.schema";
import { Role } from "../role/roles.schema";
import { Creature } from "../creature/creatures.schema";

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

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Mythology" })
    mythology: Mythology;

    /*@Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }])
    roles: Role[];

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Creature" }])
    creatures: Creature[];*/
}

export const GodSchema = SchemaFactory.createForClass(God);
