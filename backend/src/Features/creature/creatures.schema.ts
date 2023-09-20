
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CreatureDocument = HydratedDocument<Creature>;

@Schema()
export class Creature {
	@Prop()
  	name: string;
}

export const CreatureSchema = SchemaFactory.createForClass(Creature);