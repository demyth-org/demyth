import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Hero, HeroDocument } from "./Heros.schema";

export interface FindHeroParams {
    user?: string;
    _Id?: string;
    name?: string;
    role?: string;
    mythologyInfo?: {
        _id?: string;
        name?: string;
    };
    godInfo?: {
        _id?: string;
        name?: string;
    };
}

@Injectable()
export class HeroDbService {
    constructor(@InjectModel(Hero.name) private heroModel: Model<HeroDocument>) {}

    async save(anHero: HeroDocument): Promise<HeroDocument> {
        return await anHero.save();
    }

    async delete(id: string): Promise<HeroDocument> {
        return await this.heroModel.findByIdAndDelete(id).exec();
    }

    async findOneByName(god: string): Promise<HeroDocument | null> {
        return await this.heroModel.findOne({ name: god }).exec();
    }

    async findOneById(id: string): Promise<HeroDocument | null> {
        return await this.heroModel.findById(id).exec();
    }

    async findOne(filter: FindHeroParams): Promise<HeroDocument | null> {
        return await this.heroModel.findOne(filter).exec();
    }

    async findAll(filter: FindHeroParams): Promise<HeroDocument[]> {
        //return await this.heroModel.find().populate("mythology");
        return await this.heroModel.find(filter).exec();
    }

    async findAllForMythId(mythId: string): Promise<HeroDocument[]> {
        //return await this.heroModel.find().populate("mythology");
        return await this.heroModel.find({ mythology: mythId }).exec();
    }
}
