import { Body, Controller, Get, Param, Post, Put, Delete, HttpCode, Query } from "@nestjs/common";
import { GodService } from "./god.service";
import { ResponseGodDto } from "./dto/response-god.dto";
import { God } from "./gods.schema";
import { log } from "../../utils/debug.utils";
import { eMythologies } from "../mythology/enum";
import { ParseObjectIdPipe } from "../../Pipe/objectid.pipe";
import { eGods } from "./enum";
import { CreateGodDto } from "./dto/create-god.dto";
import { UpdateGodDto } from "./dto/update-god.dto";

@Controller("v0/gods")
export class GodController {
    constructor(private readonly godService: GodService) {}

    // TODO: add superadmin guard
    @Post()
    async create(@Body() createGodDto: CreateGodDto): Promise<ResponseGodDto> {
        log("MythologyController > create");
        return await this.godService.create(createGodDto);
    }

    // TODO: add superadmin guard
    @Put(":mythId")
    async update(
        @Param("mythId", new ParseObjectIdPipe()) mythId: string,
        @Body() updateGodDto: UpdateGodDto,
    ): Promise<ResponseGodDto> {
        log("MythologyController > update");
        return await this.godService.updateById(mythId, updateGodDto);
    }

    // TODO: add superadmin guard
    // TODO: add control if id used elsewhere?
    //http://localhost:3001/v0/mythologies/650afe28c21967be98f35100
    @HttpCode(204)
    @Delete(":mythId")
    async delete(@Param("mythId", new ParseObjectIdPipe()) mythId: string): Promise<void> {
        log("MythologyController > delete");
        return await this.godService.deleteById(mythId);
    }

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
