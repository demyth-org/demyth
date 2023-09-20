import { Body, Controller, Get, Param, Post, Put, Delete, HttpCode, ParseEnumPipe } from "@nestjs/common";
import { MythologyService } from "./mythology.service";
import { CreateMythologyDto } from "./dto/create-mythology.dto";
import { Mythology } from "./mythologies.schema";
import { log } from "../../utils/debug.utils";
import { mythologies } from "./enum";
import { ResponseMythologyDto } from "./dto/response-mythology.dto";
import { ParseObjectIdPipe } from "../../Pipe/objectid.pipe";
import { UpdateMythologyDto } from "./dto/update-mythology.dto";

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
    // TODO: control if the array of effects is updated, what do we want: erase all array, or update in a separate endpoint, or?
    @Put(":mythId")
    async update(
        @Param("mythId", new ParseObjectIdPipe()) mythId: string,
        @Body() updateMythologyDto: UpdateMythologyDto,
    ): Promise<ResponseMythologyDto> {
        log("MythologyController > update > updating a Mythology");
        return await this.mythologyService.updateById(mythId, updateMythologyDto);
    }

    // TODO: add superadmin guard
    @HttpCode(204)
    @Delete(":mythId")
    async delete(@Param("mythId", new ParseObjectIdPipe()) mythId: string): Promise<void> {
        log("MythologyController > delete > deleting a Mythology");
        return await this.mythologyService.deleteById(mythId);
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

    //http://localhost:3001/v0/mythologies/id/65087082ddfa68d67e333841
    @Get("id/:mythId")
    async findOneById(@Param("mythId", new ParseObjectIdPipe()) mythId: string): Promise<ResponseMythologyDto> {
        log("MythologyController > findOneById > get a Mythology");
        return await this.mythologyService.findOneById(mythId);
    }

    /* //other options:
	//6:30:04 to get a screen of prices + filters in Query
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
