import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { MythologyService } from "./mythology.service";
import { CreateMythologyDto } from "./dto/create-mythology.dto";
import { Mythology } from "./mythologies.schema";
import { mythologies } from "./enum";
import { InitializationGuard } from "../../guards/initialization.guard";

@UseGuards(InitializationGuard)
@Controller("v0/mythologies")
export class MythologyController {
    constructor(private readonly mythologyService: MythologyService) {}

    // TODO: add a bulkinsert + superadmin API for creation

    // TODO: add superadmin guard
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

    //http://localhost:3001/v0/mythologies/name/Greek
    @Get("name/:mythName")
    async findOneByName(@Param("mythName") mythName: string): Promise<Mythology> {
        console.log("MythologyController > findOneByName> get a Mythology");
        return await this.mythologyService.findOneByName(mythName);
    }

    //http://localhost:3001/v0/mythologies/id/6502dae38405160c14729db4
    @Get("id/:mythId")
    async findOneById(@Param("mythId") mythId: string): Promise<Mythology> {
        console.log("MythologyController > findOneById > get a Mythology");
        return await this.mythologyService.findOneById(mythId);
    }

    /* //other options:
	@Get()
    async findOne(@Query("name") mythName: string, @Query("id") mythId: string): Promise<Mythology> {
        if (mythName) {
            console.log("Find by name:", mythName);
            return await this.mythologyService.findOneByName(mythName);
        } else if (mythId) {
            console.log("Find by id:", mythId);
            return await this.mythologyService.findOneById(mythId);
        }
        throw new BadRequestException('Invalid parameters. Provide either "name" or "id".');
    }*/
}
