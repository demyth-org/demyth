import { Body, Controller, Get, Param, ParseEnumPipe, Post, Query } from "@nestjs/common";
import { GodService } from "./god.service";
import { ResponseGodDto } from "./dto/response-god.dto";
import { God } from "./gods.schema";
import { log } from "../../utils/debug.utils";
import { eMythologies } from "../mythology/enum";
import { ParseObjectIdPipe } from "../../Pipe/objectid.pipe";
import { eGods } from "./enum";

@Controller("v0/gods")
export class GodController {
    constructor(private readonly godService: GodService) {}

    //6:17 to get Gods from a Mythology

    //HERE A TEST PUIS AVEC UN BODY
    @Post()
    async create(): Promise<string> {
        console.log("GodController > create > creating a God");

        const anGod = await this.godService.create({
            name: "Zeusjo",
            images: ["ipfs://animage.png"],
            powers: ["spell thunder gives 5 ad bonus"],
        });

        return "This action adds a new God";
    }

    //http://localhost:3001/v0/gods
    // @Get()
    // async getAll(): Promise<ResponseGodDto[]> {
    //     log("GodController > getAll > get all Gods");
    //     return await this.godService.findAll();
    // }

    @Get()
    async getGodForParams(
        @Query("godId") _id?: string,
        @Query("godName") name?: eGods,
        @Query("mythId") mythology?: string,
    ): Promise<ResponseGodDto[]> {
        log("GodController > getGodForParams");

        const filters = {
            ...(_id && { _id }),
            ...(name && { name }),
            ...(mythology && { mythology }),
        };
        return await this.godService.findAll(filters);
    }
}
