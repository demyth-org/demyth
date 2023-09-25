import { Body, Controller, Get, Param, Post, Put, Delete, HttpCode, Query } from "@nestjs/common";
import { GodService } from "./god.service";
import { ResponseGodDto } from "./dto/response-god.dto";
import { log } from "../../utils/debug.utils";
import { ParseObjectIdPipe } from "../../pipe/objectid.pipe";
import { eGods } from "./enum";
import { CreateGodDto } from "./dto/create-god.dto";
import { UpdateGodDto } from "./dto/update-god.dto";
import { UserType } from "../user/enum";
import { Roles } from "../../decorators/roles.decorators";

@Controller("v0/gods")
export class GodController {
    constructor(private readonly godService: GodService) {}

    @Roles(UserType.Admin)
    @Post()
    async create(@Body() createGodDto: CreateGodDto): Promise<ResponseGodDto> {
        log("GodController > create");
        return await this.godService.create(createGodDto);
    }

    @Roles(UserType.Admin)
    @Put(":mythId")
    async update(
        @Param("mythId", new ParseObjectIdPipe()) mythId: string,
        @Body() updateGodDto: UpdateGodDto,
    ): Promise<ResponseGodDto> {
        log("GodController > update");
        return await this.godService.updateById(mythId, updateGodDto);
    }

    @Roles(UserType.Admin)
    // TODO: add control if id used elsewhere?
    //http://localhost:3001/v0/mythologies/650afe28c21967be98f35100
    @HttpCode(204)
    @Delete(":mythId")
    async delete(@Param("mythId", new ParseObjectIdPipe()) mythId: string): Promise<void> {
        log("GodController > delete");
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
