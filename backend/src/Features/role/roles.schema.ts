import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Mythology } from "../mythology/mythologies.schema";
import { God } from "../god/gods.schema";
import { eUnitType, eSubUnitType } from "./enum";
import { eHeroSex } from "../hero/enum";

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
    @Prop()
    name: string;

    @Prop({ required: true, type: String, enum: eUnitType, default: eUnitType.Melee })
    unitType: eUnitType;

    @Prop({ required: true, type: String, enum: eSubUnitType, default: eSubUnitType.HeavyMelee })
    subUnitType: eSubUnitType;

    @Prop()
    shortDesc: string;

    @Prop()
    longDesc: string;

    @Prop([
        raw({
            main: { type: String },
            sex: { type: String, enum: eHeroSex, default: eHeroSex.M },
        }),
    ])
    images: [Record<string, any>];

    @Prop()
    strength: number;

    @Prop()
    dexterity: number;

    @Prop()
    intelligence: number;

    @Prop()
    constitution: number;

    @Prop()
    luck: number;

    @Prop()
    armor: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Mythology" })
    mythology: Mythology;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "God" })
    god: God;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
