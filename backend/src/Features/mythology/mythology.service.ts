import { Model } from "mongoose";
import { ConflictException, Injectable, NotFoundException, PreconditionFailedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Mythology, MythologyDocument } from "./mythologies.schema";
import { CreateMythologyDto } from "./dto/create-mythology.dto";
import { ResponseMythologyDto } from "./dto/response-mythology.dto";
import { plainToClass } from "class-transformer";
import { FindMythParams, MythologyDbService } from "./mythology.db.service";
import { UpdateMythologyDto } from "./dto/update-mythology.dto";
import { GodService } from "../god/god.service";

@Injectable()
export class MythologyService {
    constructor(
        @InjectModel(Mythology.name) private mythologyModel: Model<MythologyDocument>,
        private readonly godService: GodService,
        private readonly mythologyDbService: MythologyDbService,
    ) {}

    getResponseDtoFrom(aMyth: MythologyDocument): ResponseMythologyDto {
        return plainToClass(ResponseMythologyDto, aMyth.toJSON());
    }

    async create(createMythologyDto: CreateMythologyDto): Promise<ResponseMythologyDto> {
        const existingMythology = await this.mythologyDbService.findOneByName(createMythologyDto.name);
        if (existingMythology) {
            throw new ConflictException(`${existingMythology.name} already exists.`);
        }

        const createdMythologyDoc = await this.mythologyDbService.save(new this.mythologyModel(createMythologyDto));
        return this.getResponseDtoFrom(createdMythologyDoc);
    }

    async updateById(mythId: string, updateMythologyDto: UpdateMythologyDto): Promise<ResponseMythologyDto> {
        const aMythDoc = await this.mythologyDbService.findOneById(mythId);
        if (!aMythDoc) throw new NotFoundException(`No mythology with id ${mythId} found.`);

        Object.assign(aMythDoc, updateMythologyDto);

        const updatedMythologyDoc = await this.mythologyDbService.save(aMythDoc);
        return this.getResponseDtoFrom(updatedMythologyDoc);
    }

    async deleteById(mythId: string): Promise<void> {
        if (await this.godService.findAll({ mythology: mythId }))
            throw new PreconditionFailedException(`${mythId} is used in gods.`);
        const aMythDoc = await this.mythologyDbService.delete(mythId);
        if (!aMythDoc) throw new NotFoundException(`No mythology with id ${mythId} found.`);
    }

    async findAll(filter: FindMythParams): Promise<ResponseMythologyDto[]> {
        const mythologiesDoc = await this.mythologyDbService.findAll(filter);
        if (mythologiesDoc.length == 0) throw new NotFoundException(`Wrong params provided.`);
        return mythologiesDoc.map((myth) => this.getResponseDtoFrom(myth));
    }
}
