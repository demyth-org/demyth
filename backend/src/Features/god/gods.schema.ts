
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { mythologies } from './enum';

export type GodDocument = HydratedDocument<God>;

@Schema()
export class God {
	@Prop()
  	name: string;

	@Prop({ required:true, type: String, enum: mythologies, default: mythologies.Greek })
	mythology: mythologies;

	@Prop()
	power: string;
}

export const GodSchema = SchemaFactory.createForClass(God);