import { Model } from "mongoose";
import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Creature, CreatureDocument } from "./creatures.schema";
import { CreateCreatureDto } from "./dto/create-creature.dto";
import { ResponseCreatureDto } from "./dto/response-creature.dto";
import { plainToClass } from "class-transformer";
import { FindCreatureParams, CreatureDbService } from "./creature.db.service";
import { UpdateCreatureDto } from "./dto/update-creature.dto";

@Injectable()
export class CreatureService {
    constructor(
        @InjectModel(Creature.name) private creatureModel: Model<Creature>,
        private readonly creatureDbService: CreatureDbService,
    ) {}

    getResponseDtoFrom(aCreature: CreatureDocument): ResponseCreatureDto {
        return plainToClass(ResponseCreatureDto, aCreature.toJSON());
    }

    async create(createCreatureDto: CreateCreatureDto): Promise<ResponseCreatureDto> {
        const existingCreature = await this.creatureModel.findOne({ name: createCreatureDto.name });
        if (existingCreature) {
            throw new ConflictException(`${existingCreature.name} already exists.`);
        }
        const createdCreature = await this.creatureDbService.save(new this.creatureModel(createCreatureDto));
        return this.getResponseDtoFrom(createdCreature);
    }

    async updateById(creatureId: string, updateCreatureDto: UpdateCreatureDto): Promise<ResponseCreatureDto> {
        const aCreatureDoc = await this.creatureDbService.findOneById(creatureId);
        if (!aCreatureDoc) throw new NotFoundException(`No creature with id ${creatureId} found.`);

        Object.assign(aCreatureDoc, updateCreatureDto);

        const updatedCreatureDoc = await this.creatureDbService.save(aCreatureDoc);
        return this.getResponseDtoFrom(updatedCreatureDoc);
    }

    async deleteById(creatureId: string): Promise<void> {
        const aCreatureDoc = await this.creatureDbService.delete(creatureId);
        if (!aCreatureDoc) throw new NotFoundException(`No creature with id ${creatureId} found.`);
    }

    async findAll(filter: FindCreatureParams): Promise<ResponseCreatureDto[]> {
        const creaturesDoc = await this.creatureDbService.findAll(filter);
        if (creaturesDoc.length == 0) throw new NotFoundException(`Wrong params provided.`);
        return creaturesDoc.map((creature) => this.getResponseDtoFrom(creature));
    }
}
