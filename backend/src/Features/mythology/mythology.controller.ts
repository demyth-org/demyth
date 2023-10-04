import { Body, Controller, Get, Param, Post, Put, Delete, HttpCode, Query } from "@nestjs/common";
import { MythologyService } from "./mythology.service";
import { CreateMythologyDto } from "./dto/create-mythology.dto";
import { log } from "../../utils/debug.utils";
import { eMythologies } from "../../enums";
import { ResponseMythologyDto } from "./dto/response-mythology.dto";
import { ParseObjectIdPipe } from "../../pipe/objectid.pipe";
import { UpdateMythologyDto } from "./dto/update-mythology.dto";
import { UserTypes } from "../../decorators/userTypes.decorators";
import { UserType } from "../user/enum";
import { OptionalParseObjectIdPipe } from "../../pipe/optional.objectid.pipe";

@Controller("v0/mythologies")
export class MythologyController {
    constructor(private readonly mythologyService: MythologyService) {}

    @UserTypes(UserType.Admin)
    @Post()
    async create(@Body() createMythologyDto: CreateMythologyDto): Promise<ResponseMythologyDto> {
        log("MythologyController > create");
        return await this.mythologyService.create(createMythologyDto);
    }

    // TODO: control if the array of effects is updated, what do we want: erase all array, or update in a separate endpoint, or?
    //http://localhost:3001/v0/mythologies/650afe28c21967be98f35100
    @UserTypes(UserType.Admin)
    @Put(":mythId")
    async update(
        @Param("mythId", new ParseObjectIdPipe()) mythId: string,
        @Body() updateMythologyDto: UpdateMythologyDto,
    ): Promise<ResponseMythologyDto> {
        log("MythologyController > update");
        return await this.mythologyService.updateById(mythId, updateMythologyDto);
    }

    //http://localhost:3001/v0/mythologies/650afe28c21967be98f35100
    @HttpCode(204)
    @UserTypes(UserType.Admin)
    @Delete(":mythId")
    async delete(@Param("mythId", new ParseObjectIdPipe()) mythId: string): Promise<void> {
        log("MythologyController > delete");
        return await this.mythologyService.deleteById(mythId);
    }

    //http://localhost:3001/v0/mythologies
    @Get()
    async getMythForParams(
        @Query("mythId", new OptionalParseObjectIdPipe()) _id?: string,
        @Query("mythName") name?: eMythologies,
    ): Promise<ResponseMythologyDto[]> {
        log("MythologyController > getMythForParams");

        const filters = {
            ...(_id && { _id }),
            ...(name && { name }),
        };
        return await this.mythologyService.findAll(filters);
    }
}
