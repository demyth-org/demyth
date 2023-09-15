import { Model } from "mongoose";
import { ConflictException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Mythology } from "./mythologies.schema";
import { CreateMythologyDto } from "./dto/create-mythology.dto";
import { upperFirstCharLowerOthers } from "../../utils/string.utils";
import { mythologies } from "./enum";

@Injectable()
export class MythologyService {
    constructor(@InjectModel(Mythology.name) private mythologyModel: Model<Mythology>) {}

    async create(createMythologyDto: CreateMythologyDto): Promise<Mythology> {
        const existingMythology = await this.mythologyModel.findOne({ name: createMythologyDto.name }, "name");
        if (existingMythology) {
            console.error(`${existingMythology.name} already exists.`);
            throw new ConflictException(`${existingMythology.name} already exists.`);
        }
        const createdMythology = new this.mythologyModel(createMythologyDto);
        return await createdMythology.save();
    }

    async findOneByName(name: string): Promise<Mythology> {
        const finalName = upperFirstCharLowerOthers(name);
        if (Object.values(mythologies).includes(finalName as mythologies))
            return this.mythologyModel.findOne({ name: finalName }).exec();
        console.error(`No mythology with name ${finalName} found.`);
        throw new UnprocessableEntityException(`No mythology with name ${finalName} found.`);
    }

    async findOneById(id: string): Promise<Mythology> {
        const aMyth = await this.mythologyModel.findById(id).exec();
        if (!aMyth) throw new UnprocessableEntityException(`No mythology with id ${id} found.`);
        return aMyth;
    }

    async findAll(): Promise<Mythology[]> {
        return this.mythologyModel.find().exec();
    }
}
