
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { heroSex } from './enum';
import { God } from '../god/gods.schema';
import { Mythology } from '../mythology/mythologies.schema';

export type HeroDocument = HydratedDocument<Hero>;

@Schema()
export class Hero {
	@Prop(raw({
		login: { type: String, trim: true, unique:true },
		address: { type: String, trim: true, unique:true }
	}))
	player: Record<string,any>

	@Prop({required:true, unique:true, trim: true})
  	name: string;

	@Prop({ required:true, type: String, enum: heroSex, default: heroSex.N })
    sex: heroSex

	@Prop([String])
	images: string[];

	@Prop({type: Mythology, required:true})
	mythologyInfo: {
		_id: {type: mongoose.Schema.Types.ObjectId, ref:'Mythology'};
		name: Mythology['name'];
	}

	@Prop({ type: God, required:true })
	godInfo: {
		_id: {type: mongoose.Schema.Types.ObjectId, ref:'God'};
		name: God['name'];
	}
}

export const HeroSchema = SchemaFactory.createForClass(Hero);