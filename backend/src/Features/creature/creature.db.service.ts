import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Creature, CreatureDocument } from "./creatures.schema";
import { eClassSubType, eClassType } from "../../enums";

export interface FindCreatureParams {
    _Id?: string;
    name?: string;
    creatureType?: eClassType;
    creatureSubType?: eClassSubType;
    mythology?: string;
    god?: string;
}

@Injectable()
export class CreatureDbService {
    constructor(@InjectModel(Creature.name) private creatureModel: Model<CreatureDocument>) {}

    async save(aCreature: CreatureDocument): Promise<CreatureDocument> {
        return await aCreature.save();
    }

    async delete(id: string): Promise<CreatureDocument> {
        return await this.creatureModel.findByIdAndDelete(id).exec();
    }

    async findOneByName(role: string): Promise<CreatureDocument | null> {
        return await this.creatureModel.findOne({ name: role }).exec();
    }

    async findOneById(id: string): Promise<CreatureDocument | null> {
        return await this.creatureModel.findById(id).exec();
    }

    async findOne(filter: FindCreatureParams): Promise<CreatureDocument | null> {
        return await this.creatureModel.findOne(filter).exec();
    }

    async findAll(filter: FindCreatureParams): Promise<CreatureDocument[]> {
        //return await this.creatureModel.find().populate("mythology");
        return await this.creatureModel.find(filter).exec();
    }

    async findAllForMythId(mythId: string): Promise<CreatureDocument[]> {
        //return await this.creatureModel.find().populate("mythology");
        return await this.creatureModel.find({ mythology: mythId }).exec();
    }
}
