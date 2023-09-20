import { Model } from "mongoose";
import { ConflictException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Mythology, MythologyDocument } from "./mythologies.schema";
import { mythologies } from "./enum";

@Injectable()
export class MythologyDbService {
    constructor(@InjectModel(Mythology.name) private mythologyModel: Model<MythologyDocument>) {}

    async save(aMyth: MythologyDocument): Promise<MythologyDocument> {
        return await aMyth.save();
    }

    async findOneByName(myth: mythologies): Promise<MythologyDocument | null> {
        return await this.mythologyModel.findOne({ name: myth }).exec();
    }

    async findOneById(id: string): Promise<MythologyDocument | null> {
        return await this.mythologyModel.findById(id).exec();
    }

    async findAll(): Promise<MythologyDocument[]> {
        return await this.mythologyModel.find().exec();
    }
}
