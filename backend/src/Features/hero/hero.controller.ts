import { Controller, Get, Post } from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { Hero } from './heros.schema';

@Controller('v0/hero')
export class HeroController {
	constructor(
        private readonly heroService: HeroService
	){}

	@Post()
	async create(): Promise<string> {
		console.log("HeroController > create > creating a hero");

		const anHero = await this.heroService.create({name:"geralt"});
		return 'This action adds a new hero';
	}

	@Get()
	async findAll(): Promise<Hero[]> {
		console.log("HeroController > findAll > get all heroes");
		return await this.heroService.findAll();
	}
}