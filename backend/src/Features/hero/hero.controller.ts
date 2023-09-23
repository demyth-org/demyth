import { Body, Controller, Get, Param, Post, Put, Delete, HttpCode, Query } from "@nestjs/common";

import { log } from "../../utils/debug.utils";
import { ParseObjectIdPipe } from "../../pipe/objectid.pipe";
import { HeroService } from "./hero.service";
import { CreateHeroDto } from "./dto/create-hero.dto";
import { ResponseHeroDto } from "./dto/response-hero.dto";
import { UpdateHeroDto } from "./dto/update-hero.dto";
import { User } from "../../decorators/user.decorators";

@Controller("v0/heroes")
export class HeroController {
    constructor(private readonly heroService: HeroService) {}

    // TODO: add superadmin guard
    @Post()
    async create(@Body() createHeroDto: CreateHeroDto, @User() user): Promise<ResponseHeroDto> {
        log("HeroController > create");
        return await this.heroService.create(createHeroDto, user.sub);
    }

    // TODO: add superadmin guard
    @Put(":heroId")
    async update(
        @Param("heroId", new ParseObjectIdPipe()) heroId: string,
        @Body() updateHeroDto: UpdateHeroDto,
    ): Promise<ResponseHeroDto> {
        log("HeroController > update");
        return await this.heroService.updateById(heroId, updateHeroDto);
    }

    // TODO: add superadmin guard
    // TODO: add control if id used elsewhere?
    //http://localhost:3001/v0/mythologies/650afe28c21967be98f35100
    @HttpCode(204)
    @Delete(":heroId")
    async delete(@Param("heroId", new ParseObjectIdPipe()) heroId: string): Promise<void> {
        log("HeroController > delete");
        return await this.heroService.deleteById(heroId);
    }

    @Get()
    async getHeroForParams(
        @Query("userId") user?: string,
        @Query("heroId") _id?: string,
        @Query("heroName") name?: string,
        @Query("role") role?: string,
        @Query("godId") godId?: string,
        @Query("godName") godName?: string,
        @Query("mythId") mythologyId?: string,
        @Query("mythName") mythologyName?: string,
    ): Promise<ResponseHeroDto[]> {
        log("HeroController > getGodForParams");

        // TODO: check for godInfo and mythologyInfo if it works with nested object
        const filters = {
            ...(user && { user }),
            ...(_id && { _id }),
            ...(name && { name }),
            ...(role && { role }),
            ...(godId && { godId }),
            ...(godName && { godName }),
            ...(mythologyId && { mythologyId }),
            ...(mythologyName && { mythologyName }),
        };
        return await this.heroService.findAll(filters);
    }
}
