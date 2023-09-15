import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MythologyService } from "./mythology.service";
import { CreateMythologyDto } from "./dto/create-mythology.dto";
import { Mythology } from "./mythologies.schema";
import { mythologies } from "./enum";

@Controller("v0/mythologies")
export class MythologyController {
    constructor(private readonly mythologyService: MythologyService) {}

    @Post()
    async create(@Body() createMythologyDto: CreateMythologyDto): Promise<Mythology> {
        console.log("MythologyController > create > creating a Mythology");
        return await this.mythologyService.create(createMythologyDto);
    }

    //http://localhost:3001/v0/mythologies
    @Get()
    async findAll(): Promise<Mythology[]> {
        console.log("MythologyController > findAll > get all Mythologies");
        return await this.mythologyService.findAll();
    }

    //http://localhost:3001/v0/mythologies/Greek
    @Get(":myth")
    async findOneByName(@Param("myth") myth: string): Promise<Mythology> {
        console.log("MythologyController > findOne > get a Mythology");
        return await this.mythologyService.findOneByName(myth);
    }
}
