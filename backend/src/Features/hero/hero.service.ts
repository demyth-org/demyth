import { Model, Types } from "mongoose";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Hero, HeroDocument } from "./heros.schema";
import { CreateHeroDto } from "./dto/create-hero.dto";
import { plainToClass } from "class-transformer";
import { ResponseHeroDto } from "./dto/response-hero.dto";
import { FindHeroParams, HeroDbService } from "./hero.db.service";
import { UpdateHeroDto } from "./dto/update-hero.dto";

@Injectable()
export class HeroService {
    constructor(
        @InjectModel(Hero.name) private heroModel: Model<Hero>,
        private readonly heroDbService: HeroDbService,
    ) {}

    getResponseDtoFrom(anHero: HeroDocument): ResponseHeroDto {
        return plainToClass(ResponseHeroDto, anHero.toJSON());
    }

    async create(createHeroDto: CreateHeroDto, userId: string): Promise<ResponseHeroDto> {
        const existingHero = await this.heroModel.findOne({ $or: [{ name: createHeroDto.name }, { user: userId }] });
        if (existingHero) {
            throw new ConflictException(`${existingHero.name} already exists or ${userId} has already an hero`);
        }
        const createdHero = await this.heroDbService.save(new this.heroModel(createHeroDto));
        return this.getResponseDtoFrom(createdHero);
    }

    async updateById(heroId: string, updateHero: UpdateHeroDto, userId: string): Promise<ResponseHeroDto> {
        const anHeroDoc = await this.heroDbService.findOne({ user: userId, _Id: heroId });
        if (!anHeroDoc) throw new NotFoundException(`No hero with id ${heroId} found.`);

        Object.assign(anHeroDoc, updateHero);

        const updatedHeroDoc = await this.heroDbService.save(anHeroDoc);
        return this.getResponseDtoFrom(updatedHeroDoc);
    }

    async deleteById(heroId: string, userId: string): Promise<void> {
        const anHeroDoc = await this.heroDbService.findOne({ user: userId, _Id: heroId });
        if (!anHeroDoc) throw new NotFoundException(`No hero with id ${heroId} found.`);
    }

    async findAll(filter: FindHeroParams): Promise<ResponseHeroDto[]> {
        const heroesDoc = await this.heroDbService.findAll(filter);
        if (heroesDoc.length == 0) throw new NotFoundException(`Wrong params provided.`);
        return heroesDoc.map((hero) => this.getResponseDtoFrom(hero));
    }

    async findHeroByUserId(userId: string): Promise<ResponseHeroDto> {
        return this.getResponseDtoFrom(await this.heroDbService.findOne({ user: userId }));
    }
}
