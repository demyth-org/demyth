import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mythology } from './mythologies.schema';
import { CreateMythologyDto } from './dto/create-mythology.dto';

@Injectable()
export class MythologyService {
	constructor(@InjectModel(Mythology.name) private mythologyModel: Model<Mythology>) {}

	async create(createMythologyDto: CreateMythologyDto): Promise<Mythology> {
		const existingMythology = await this.mythologyModel.findOne({ name: createMythologyDto.name });
		if (existingMythology) {
			throw new Error('Name already exists.');
		}
		const createdMythology = new this.mythologyModel(createMythologyDto);
		return await createdMythology.save();
	}

	async findAll(): Promise<Mythology[]> {
		return this.mythologyModel.find().exec();
	}
}
