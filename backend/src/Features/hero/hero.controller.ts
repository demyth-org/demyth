import { Controller, Get, Post } from '@nestjs/common';

@Controller('v0/hero')
export class HeroController {
	@Post()
	create(): string {
		console.log("HeroController > create > creating a hero");
		return 'This action adds a new hero';
	}

	@Get()
	findAll(): string {
		console.log("HeroController > findAll > get all heroes");
		return 'This action returns all heroes';
	}
}