import { Body, Controller, Get, Param, Post, Put, Delete, HttpCode, Query } from "@nestjs/common";

import { log } from "../../utils/debug.utils";
import { ParseObjectIdPipe } from "../../Pipe/objectid.pipe";
import { HeroService } from "./hero.service";
import { CreateHeroDto } from "./dto/create-hero.dto";
import { ResponseHeroDto } from "./dto/response-hero.dto";
import { UpdateHeroDto } from "./dto/update-hero.dto";

@Controller("v0/heros")
export class HeroController {
    constructor(private readonly heroService: HeroService) {}

    // 6:57 with decorator user
    // TODO: add superadmin guard
    @Post()
    async create(@Body() createHeroDto: CreateHeroDto): Promise<ResponseHeroDto> {
        log("HeroController > create");
        return await this.heroService.create(createHeroDto);
    }

    // TODO: add superadmin guard
    @Put(":mythId")
    async update(
        @Param("mythId", new ParseObjectIdPipe()) mythId: string,
        @Body() updateHeroDto: UpdateHeroDto,
    ): Promise<ResponseHeroDto> {
        log("HeroController > update");
        return await this.heroService.updateById(mythId, updateHeroDto);
    }

    // TODO: add superadmin guard
    // TODO: add control if id used elsewhere?
    //http://localhost:3001/v0/mythologies/650afe28c21967be98f35100
    @HttpCode(204)
    @Delete(":mythId")
    async delete(@Param("mythId", new ParseObjectIdPipe()) mythId: string): Promise<void> {
        log("HeroController > delete");
        return await this.heroService.deleteById(mythId);
    }

    @Get()
    async getGodForParams(
        @Query("godId") _id?: string,
        @Query("godName") name?: eGods,
        @Query("mythId") mythology?: string,
    ): Promise<ResponseHeroDto[]> {
        log("HeroController > getGodForParams");

        const filters = {
            ...(_id && { _id }),
            ...(name && { name }),
            ...(mythology && { mythology }),
        };
        return await this.heroService.findAll(filters);
    }
}
