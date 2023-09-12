import mongoose from "mongoose";

export class CreateHeroDto {
	player: {
		login?: string;
		address?: string;
	};
    name: string;
	sex: string;
	images: string[];
	mythologyInfo: {
		_id: mongoose.Types.ObjectId;
		name: string;
	}
	godInfo: {
		_id: mongoose.Types.ObjectId;
		name: string;
	}
}