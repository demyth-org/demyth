
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GodDocument = HydratedDocument<God>;

@Schema()
export class God {
	@Prop()
  	name: string;
	
	@Prop([String])
	images: string[];
	
	@Prop([String])
	powers: string[];
}

export const GodSchema = SchemaFactory.createForClass(God);