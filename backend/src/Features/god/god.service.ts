import { Model } from "mongoose";
import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { God, GodDocument } from "./gods.schema";
import { CreateGodDto } from "./dto/create-god.dto";
import { ResponseGodDto } from "./dto/response-god.dto";
import { plainToClass } from "class-transformer";
import { FindGodParams, GodDbService } from "./god.db.service";
import { UpdateGodDto } from "./dto/update-god.dto";

@Injectable()
export class GodService {
    constructor(
        @InjectModel(God.name) private godModel: Model<God>,
        private readonly godDbService: GodDbService,
    ) {}

    getResponseDtoFrom(aGod: GodDocument): ResponseGodDto {
        return plainToClass(ResponseGodDto, aGod.toJSON());
    }

    async create(createGodDto: CreateGodDto): Promise<ResponseGodDto> {
        const existingGod = await this.godModel.findOne({ name: createGodDto.name });
        if (existingGod) {
            throw new ConflictException(`${existingGod.name} already exists.`);
        }
        const createdGod = await this.godDbService.save(new this.godModel(createGodDto));
        return this.getResponseDtoFrom(createdGod);
    }

    async updateById(godId: string, updateGodDto: UpdateGodDto): Promise<ResponseGodDto> {
        const aGodDoc = await this.godDbService.findOneById(godId);
        if (!aGodDoc) throw new NotFoundException(`No god with id ${godId} found.`);

        Object.assign(aGodDoc, updateGodDto);

        const updatedGodDoc = await this.godDbService.save(aGodDoc);
        return this.getResponseDtoFrom(updatedGodDoc);
    }

    async deleteById(godId: string): Promise<void> {
        const aGodDoc = await this.godDbService.delete(godId);
        if (!aGodDoc) throw new NotFoundException(`No god with id ${godId} found.`);
    }

    async findAll(filter: FindGodParams): Promise<ResponseGodDto[]> {
        const godsDoc = await this.godDbService.findAll(filter);
        if (godsDoc.length == 0) throw new NotFoundException(`Wrong params provided.`);
        return godsDoc.map((god) => this.getResponseDtoFrom(god));
    }

    async findAtLeastOne(filter: FindGodParams): Promise<ResponseGodDto> {
        const aGod = await this.godDbService.findOne(filter);
        console.log(aGod);
        return this.getResponseDtoFrom(aGod);
    }
}
