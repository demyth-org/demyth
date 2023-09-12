import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { mythologies } from '../mythology/enum';

export type MythologyDocument = HydratedDocument<Mythology>;

@Schema()
export class Mythology {
	@Prop({ required:true, type: String, enum: mythologies, unique: true})
  	name: string;
	
	@Prop([String])
	images: string[];

	@Prop([String,{required:true}])
  	effects: string[];
}

export const MythologySchema = SchemaFactory.createForClass(Mythology);