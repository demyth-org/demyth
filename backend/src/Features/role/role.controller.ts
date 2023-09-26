import { Body, Controller, Get, Param, Post, Put, Delete, HttpCode, Query } from "@nestjs/common";
import { RoleService } from "./role.service";
import { ResponseRoleDto } from "./dto/response-role.dto";
import { log } from "../../utils/debug.utils";
import { ParseObjectIdPipe } from "../../pipe/objectid.pipe";
import { eUnitType, eSubUnitType } from "./enum";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { UserType } from "../user/enum";
import { UserTypes } from "../../decorators/userTypes.decorators";

@Controller("v0/roles")
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    // TODO
    @UserTypes(UserType.Admin)
    @Post()
    async create(@Body() createRoleDto: CreateRoleDto): Promise<ResponseRoleDto> {
        log("RoleController > create");
        return await this.roleService.create(createRoleDto);
    }

    // TODO
    @UserTypes(UserType.Admin)
    @Put(":mythId")
    async update(
        @Param("mythId", new ParseObjectIdPipe()) mythId: string,
        @Body() updateRoleDto: UpdateRoleDto,
    ): Promise<ResponseRoleDto> {
        log("RoleController > update");
        return await this.roleService.updateById(mythId, updateRoleDto);
    }

    // TODO
    @UserTypes(UserType.Admin)
    // TODO: add control if id used elsewhere?
    //http://localhost:3001/v0/mythologies/650afe28c21967be98f35100
    @HttpCode(204)
    @Delete(":mythId")
    async delete(@Param("mythId", new ParseObjectIdPipe()) mythId: string): Promise<void> {
        log("RoleController > delete");
        return await this.roleService.deleteById(mythId);
    }

    // TODO
    @Get()
    async getRoleForParams(
        @Query("roleId") _id?: string,
        @Query("roleName") name?: string,
        @Query("unitType") unitType?: eUnitType,
        @Query("subUnitType") subUnitType?: eSubUnitType,
        @Query("mythId") mythology?: string,
        @Query("godId") god?: string,
    ): Promise<ResponseRoleDto[]> {
        log("RoleController > getRoleForParams");

        const filters = {
            ...(_id && { _id }),
            ...(name && { name }),
            ...(unitType && { unitType }),
            ...(subUnitType && { subUnitType }),
            ...(mythology && { mythology }),
            ...(god && { god }),
        };
        return await this.roleService.findAll(filters);
    }
}
