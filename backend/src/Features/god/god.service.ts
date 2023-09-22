import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { God, GodDocument } from "./gods.schema";
import { CreateGodDto } from "./dto/create-god.dto";
import { ResponseGodDto } from "./dto/response-god.dto";
import { plainToClass } from "class-transformer";
import { FindGodParams, GodDbService } from "./god.db.service";
import { log } from "../../utils/debug.utils";
import { eGods } from "./enum";

@Injectable()
export class GodService {
    constructor(
        @InjectModel(God.name) private godModel: Model<God>,
        private readonly godDbService: GodDbService,
    ) {}

    getResponseDtoFrom(aGod: GodDocument): ResponseGodDto {
        return plainToClass(ResponseGodDto, aGod.toJSON());
    }

    async create(createGodDto: CreateGodDto): Promise<God> {
        const existingGod = await this.godModel.findOne({ name: createGodDto.name });
        if (existingGod) {
            throw new Error("Name already exists.");
        }
        const createdGod = new this.godModel(createGodDto);
        return await createdGod.save();
    }

    async findAll(filter: FindGodParams): Promise<ResponseGodDto[]> {
        const godsDoc = await this.godDbService.findAll(filter);
        return godsDoc.map((god) => this.getResponseDtoFrom(god));
    }
}
