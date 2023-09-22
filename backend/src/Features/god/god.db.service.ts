import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { God, GodDocument } from "./Gods.schema";
import { eGods } from "./enum";

@Injectable()
export class GodDbService {
    constructor(@InjectModel(God.name) private godModel: Model<GodDocument>) {}

    async save(aGod: GodDocument): Promise<GodDocument> {
        return await aGod.save();
    }

    async delete(id: string): Promise<GodDocument> {
        return await this.godModel.findByIdAndDelete(id).exec();
    }

    async findOneByName(god: eGods): Promise<GodDocument | null> {
        return await this.godModel.findOne({ name: god }).exec();
    }

    async findOneById(id: string): Promise<GodDocument | null> {
        return await this.godModel.findById(id).exec();
    }

    async findAll(): Promise<GodDocument[]> {
        //return await this.godModel.find().populate("mythology");
        return await this.godModel.find().exec();
    }

    async findAllForMythId(mythId: string): Promise<GodDocument[]> {
        //return await this.godModel.find().populate("mythology");
        return await this.godModel.find({ mythology: mythId }).exec();
    }
}
