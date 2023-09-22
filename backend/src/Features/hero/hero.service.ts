import { Model } from "mongoose";
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Hero, HeroDocument } from "./heros.schema";
import { CreateHeroDto } from "./dto/create-hero.dto";
import { plainToClass } from "class-transformer";
import { ResponseHeroDto } from "./dto/response-hero.dto";

@Injectable()
export class HeroService {
    constructor(@InjectModel(Hero.name) private heroModel: Model<Hero>) {}

    getResponseDtoFrom(anHero: HeroDocument): ResponseHeroDto {
        return plainToClass(ResponseHeroDto, anHero.toJSON());
    }

    async create(createHeroDto: CreateHeroDto): Promise<ResponseHeroDto> {
        const existingHero = await this.heroModel.findOne({ name: createHeroDto.name });
        if (existingHero) {
            throw new ConflictException(`${existingHero.name} already exists.`);
        }
        const createdHero = await this.heroDbService.save(new this.heroModel(createHeroDto));
        return this.getResponseDtoFrom(createdHero);
    }

    async findAll(): Promise<Hero[]> {
        return this.heroModel.find().exec();
    }
}
