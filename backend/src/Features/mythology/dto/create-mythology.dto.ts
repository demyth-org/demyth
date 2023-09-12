import { mythologies } from "../enum";

export class CreateMythologyDto {
	name: mythologies;
	images: string[];
	effects: string[];
}