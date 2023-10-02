import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Mythology, MythologyDocument } from "./mythologies.schema";
import { eMythologies } from "../../enums";

export interface FindMythParams {
    name?: eMythologies;
    _id?: string;
}

@Injectable()
export class MythologyDbService {
    constructor(@InjectModel(Mythology.name) private mythologyModel: Model<MythologyDocument>) {}

    async save(aMyth: MythologyDocument): Promise<MythologyDocument> {
        return await aMyth.save();
    }

    async delete(id: string): Promise<MythologyDocument> {
        return await this.mythologyModel.findByIdAndDelete(id).exec();
    }

    async findOneByName(myth: eMythologies): Promise<MythologyDocument | null> {
        return await this.mythologyModel.findOne({ name: myth }).exec();
    }

    async findOneById(id: string): Promise<MythologyDocument | null> {
        return await this.mythologyModel.findById(id).exec();
    }

    async findAll(filter: FindMythParams): Promise<MythologyDocument[]> {
        return await this.mythologyModel.find(filter).exec();
    }
}
