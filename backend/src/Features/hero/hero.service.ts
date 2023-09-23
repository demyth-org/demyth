import { Model } from "mongoose";
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

    async updateById(godId: string, updateHero: UpdateHeroDto): Promise<ResponseHeroDto> {
        const aGodDoc = await this.heroDbService.findOneById(godId);
        if (!aGodDoc) throw new NotFoundException(`No god with id ${godId} found.`);

        Object.assign(aGodDoc, updateHero);

        const updatedGodDoc = await this.heroDbService.save(aGodDoc);
        return this.getResponseDtoFrom(updatedGodDoc);
    }

    async deleteById(godId: string): Promise<void> {
        const aGodDoc = await this.heroDbService.delete(godId);
        if (!aGodDoc) throw new NotFoundException(`No god with id ${godId} found.`);
    }

    async findAll(filter: FindHeroParams): Promise<ResponseHeroDto[]> {
        const godsDoc = await this.heroDbService.findAll(filter);
        if (godsDoc.length == 0) throw new NotFoundException(`Wrong params provided.`);
        return godsDoc.map((god) => this.getResponseDtoFrom(god));
    }
}
