import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type FellowshipDocument = HydratedDocument<Fellowship>;

@Schema()
export class Fellowship {
    @Prop()
    name: string;
}

export const FellowshipSchema = SchemaFactory.createForClass(Fellowship);
