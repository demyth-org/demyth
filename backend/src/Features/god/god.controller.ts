import { Body, Controller, Get, Post } from "@nestjs/common";
import { GodService } from "./god.service";
import { CreateGodDto } from "./dto/create-god.dto";
import { God } from "./gods.schema";

@Controller("v0/god")
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

    @Get()
    async findAll(): Promise<God[]> {
        console.log("GodController > findAll > get all Gods");
        return await this.godService.findAll();
    }
}
