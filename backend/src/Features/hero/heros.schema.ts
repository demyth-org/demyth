
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { heroSex } from './enum';
import { Player } from '../player/players.schema';
import { God } from '../god/gods.schema';
import { mythologies } from '../god/enum';

export type HeroDocument = HydratedDocument<Hero>;

@Schema()
export class Hero {
	@Prop({required:true, unique:true})
  	name: string;
	
	@Prop({ required:true, type: String, enum: heroSex, default: heroSex.N })
    sex: heroSex

	@Prop(raw({
		login: { type: String },
		address: { type: String }
	}))
	player: Record<string,any>

	@Prop({ required:true, type: String, enum: mythologies, default: mythologies.Greek })
	mythology:string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'God' })
	god:God
}

export const HeroSchema = SchemaFactory.createForClass(Hero);