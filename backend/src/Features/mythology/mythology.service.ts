import { Model } from "mongoose";
import { ConflictException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Mythology } from "./mythologies.schema";
import { CreateMythologyDto } from "./dto/create-mythology.dto";
import { mythologies } from "./enum";
import { ResponseMythologyDto } from "./dto/response-mythology.dto";
import { plainToClass } from "class-transformer";

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

    async findOneByName(myth: mythologies): Promise<ResponseMythologyDto> {
        const aMyth = await this.mythologyModel.findOne({ name: myth }).exec();
        return plainToClass(ResponseMythologyDto, aMyth.toJSON());
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
