
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { heroSex } from './enum';
import { Player } from '../player/players.schema';
import { God } from '../god/gods.schema';

export type HeroDocument = HydratedDocument<Hero>;

@Schema()
export class Hero {
	@Prop({required:true, unique:true})
  	name: string;
	
	@Prop({ required:true, type: String, enum: heroSex, default: heroSex.N })
    sex: heroSex
	
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Player' })
	player: Player;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'God' })
	god:God

	@Prop()
	mythology:string;
}

export const HeroSchema = SchemaFactory.createForClass(Hero);