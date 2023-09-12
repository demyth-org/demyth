import { Body, Controller, Get, Post } from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { Hero } from './heros.schema';
import { heroSex } from './enum';

@Controller('v0/hero')
export class HeroController {
	constructor(
        private readonly heroService: HeroService
	){}

	//HERE A TEST PUIS AVEC UN BODY
	@Post()
	async create(): Promise<string> {
		console.log("HeroController > create > creating a hero");

		/*const anHero = await this.heroService.create({
			player: {
				login: 'nemesis@gmail.com'
			},
			name: 'geralt jo',
			sex: 'M',
			images: ['ipfs://animage.png'],
			mythologyInfo: {
				_id: '',
				name: 'Greek',
			},
			godInfo: {
				_id: '',
				name: 'Zeus'
			}
		});*/

		return 'This action adds a new hero';
	}

	@Get()
	async findAll(): Promise<Hero[]> {
		console.log("HeroController > findAll > get all heroes");
		return await this.heroService.findAll();
	}
}