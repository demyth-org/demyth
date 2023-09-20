import { Model } from "mongoose";
import { ConflictException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Mythology, MythologyDocument } from "./mythologies.schema";
import { CreateMythologyDto } from "./dto/create-mythology.dto";
import { mythologies } from "./enum";
import { ResponseMythologyDto } from "./dto/response-mythology.dto";
import { plainToClass } from "class-transformer";
import { MythologyDbService } from "./mythology.db.service";

@Injectable()
export class MythologyService {
    constructor(
        @InjectModel(Mythology.name) private mythologyModel: Model<MythologyDocument>,
        private readonly mythologyDbService: MythologyDbService,
    ) {}

    getResponseDtoFrom(aMyth: MythologyDocument): ResponseMythologyDto {
        return plainToClass(ResponseMythologyDto, aMyth.toJSON());
    }

    async create(createMythologyDto: CreateMythologyDto): Promise<ResponseMythologyDto> {
        const existingMythology = await this.mythologyDbService.findOneByName(createMythologyDto.name);
        if (existingMythology) {
            console.error(`${existingMythology.name} already exists.`);
            throw new ConflictException(`${existingMythology.name} already exists.`);
        }

        const createdMythologyDoc = await this.mythologyDbService.save(new this.mythologyModel(createMythologyDto));
        return this.getResponseDtoFrom(createdMythologyDoc);
    }

    async findOneByName(myth: mythologies): Promise<ResponseMythologyDto> {
        const aMythDoc = await this.mythologyDbService.findOneByName(myth);
        return this.getResponseDtoFrom(aMythDoc);
    }

    async findOneById(id: string): Promise<ResponseMythologyDto> {
        const aMythDoc = await this.mythologyDbService.findOneById(id);
        if (!aMythDoc) throw new UnprocessableEntityException(`No mythology with id ${id} found.`);
        return this.getResponseDtoFrom(aMythDoc);
    }

    async findAll(): Promise<ResponseMythologyDto[]> {
        const mythologiesDoc = await this.mythologyDbService.findAll();
        return mythologiesDoc.map((myth) => this.getResponseDtoFrom(myth));
    }
}
