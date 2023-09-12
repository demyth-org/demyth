import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { God } from './gods.schema';
import { CreateGodDto } from './dto/create-god.dto';

@Injectable()
export class GodService {
	constructor(@InjectModel(God.name) private godModel: Model<God>) {}

	async create(createGodDto: CreateGodDto): Promise<God> {
		const existingGod = await this.godModel.findOne({ name: createGodDto.name });
		if (existingGod) {
			throw new Error('Name already exists.');
		}
		const createdGod = new this.godModel(createGodDto);
		return await createdGod.save();
	}

	async findAll(): Promise<God[]> {
		return this.godModel.find().exec();
	}
}
