import { Body, Controller, Get, Post } from '@nestjs/common';
import { MythologyService } from './mythology.service';
import { CreateMythologyDto } from './dto/create-mythology.dto';
import { Mythology } from './mythologies.schema';
import { mythologies } from './enum';

@Controller('v0/mythology')
export class MythologyController {
	constructor(
        private readonly mythologyService: MythologyService
	){}

	//HERE A TEST PUIS AVEC UN BODY
	@Post()
	async create(): Promise<string> {
		console.log("MythologyController > create > creating a Mythology");

		const anMythology = await this.mythologyService.create({
			name: mythologies.Greek,
			images: ['ipfs://animage.png'],
			effects: ['spell 1 does X damage', 'spell 2 does Y bonus of favor']
		});
		
		return 'This action adds a new Mythology';
	}

	@Get()
	async findAll(): Promise<Mythology[]> {
		console.log("MythologyController > findAll > get all Mythologies");
		return await this.mythologyService.findAll();
	}
}