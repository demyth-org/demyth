import { Body, Controller, Get, Param, Post, Put, Delete, HttpCode, ParseEnumPipe } from "@nestjs/common";
import { MythologyService } from "./mythology.service";
import { CreateMythologyDto } from "./dto/create-mythology.dto";
import { Mythology } from "./mythologies.schema";
import { log } from "../../utils/debug.utils";
import { mythologies } from "./enum";
import { ResponseMythologyDto } from "./dto/response-mythology.dto";

@Controller("v0/mythologies")
export class MythologyController {
    constructor(private readonly mythologyService: MythologyService) {}

    // TODO: add superadmin guard
    @Post()
    async create(@Body() createMythologyDto: CreateMythologyDto): Promise<ResponseMythologyDto> {
        log("MythologyController > create > creating a Mythology");
        return await this.mythologyService.create(createMythologyDto);
    }

    // TODO: add superadmin guard
    // TODO: update
    @Put(":id")
    async update(): Promise<Mythology> {
        log("MythologyController > update > updating a Mythology");
        return await null;
    }

    // TODO: delete
    // TODO: add superadmin guard
    @HttpCode(204)
    @Delete(":id")
    async delete(): Promise<void> {
        log("MythologyController > delete > deleting a Mythology");
    }

    //http://localhost:3001/v0/mythologies
    @Get()
    async findAll(): Promise<ResponseMythologyDto[]> {
        log("MythologyController > findAll > get all Mythologies");
        return await this.mythologyService.findAll();
    }

    //http://localhost:3001/v0/mythologies/name/Greek
    @Get("name/:mythName")
    async findOneByName(
        @Param("mythName", new ParseEnumPipe(mythologies)) mythName: mythologies,
    ): Promise<ResponseMythologyDto> {
        log("MythologyController > findOneByName> get a Mythology");
        return await this.mythologyService.findOneByName(mythName);
    }

    // TODO: valid param ID and remove checkID from service
    //http://localhost:3001/v0/mythologies/id/65087082ddfa68d67e333841
    @Get("id/:mythId")
    async findOneById(@Param("mythId") mythId: string): Promise<ResponseMythologyDto> {
        log("MythologyController > findOneById > get a Mythology");
        return await this.mythologyService.findOneById(mythId);
    }

    /* //other options:
	@Get()
    async findOne(@Query("name") mythName: string, @Query("id") mythId: string): Promise<Mythology> {
        if (mythName) {
            log("Find by name:", mythName);
            return await this.mythologyService.findOneByName(mythName);
        } else if (mythId) {
            log("Find by id:", mythId);
            return await this.mythologyService.findOneById(mythId);
        }
        throw new BadRequestException('Invalid parameters. Provide either "name" or "id".');
    }*/
}
