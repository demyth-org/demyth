import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Mythology } from "../mythology/mythologies.schema";
import { God } from "../god/gods.schema";
import { eClassSubType, eClassType, eHeroGender } from "../../enums";

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, type: String, enum: eClassType, default: eClassType.Melee })
    roleType: eClassType;

    @Prop({ required: true, type: String, enum: eClassSubType, default: eClassSubType.HeavyMelee })
    roleSubType: eClassSubType;

    @Prop()
    shortDesc: string;

    @Prop()
    longDesc: string;

    @Prop([
        raw({
            main: { type: String },
            sex: { type: String, enum: eHeroGender, default: eHeroGender.M },
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
