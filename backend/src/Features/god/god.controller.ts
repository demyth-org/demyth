import { Body, Controller, Get, Param, Post, Put, Delete, HttpCode, Query } from "@nestjs/common";
import { GodService } from "./god.service";
import { ResponseGodDto } from "./dto/response-god.dto";
import { log } from "../../utils/debug.utils";
import { ParseObjectIdPipe } from "../../pipe/objectid.pipe";
import { eGods } from "../../enums";
import { CreateGodDto } from "./dto/create-god.dto";
import { UpdateGodDto } from "./dto/update-god.dto";
import { UserType } from "../user/enum";
import { UserTypes } from "../../decorators/userTypes.decorators";

@Controller("v0/gods")
export class GodController {
    constructor(private readonly godService: GodService) {}

    // WIP - to test
    @UserTypes(UserType.Admin)
    @Post()
    async create(@Body() createGodDto: CreateGodDto): Promise<ResponseGodDto> {
        log("GodController > create");
        return await this.godService.create(createGodDto);
    }

    // WIP - to test
    @UserTypes(UserType.Admin)
    @Put(":godId")
    async update(
        @Param("godId", new ParseObjectIdPipe()) godId: string,
        @Body() updateGodDto: UpdateGodDto,
    ): Promise<ResponseGodDto> {
        log("GodController > update");
        return await this.godService.updateById(godId, updateGodDto);
    }

    // WIP - to test
    @UserTypes(UserType.Admin)
    // TODO: add control if id used elsewhere?
    @HttpCode(204)
    @Delete(":godId")
    async delete(@Param("godId", new ParseObjectIdPipe()) godId: string): Promise<void> {
        log("GodController > delete");
        return await this.godService.deleteById(godId);
    }

    // WIP - to test for _id
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
