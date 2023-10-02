import { Body, Controller, Get, Param, Post, Put, Delete, HttpCode, Query } from "@nestjs/common";
import { RoleService } from "./role.service";
import { ResponseRoleDto } from "./dto/response-role.dto";
import { log } from "../../utils/debug.utils";
import { ParseObjectIdPipe } from "../../pipe/objectid.pipe";
import { eClassSubType, eClassType } from "../../enums/class";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { UserType } from "../user/enum";
import { UserTypes } from "../../decorators/userTypes.decorators";

@Controller("v0/roles")
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    // WIP - to test
    @UserTypes(UserType.Admin)
    @Post()
    async create(@Body() createRoleDto: CreateRoleDto): Promise<ResponseRoleDto> {
        log("RoleController > create");
        return await this.roleService.create(createRoleDto);
    }

    // WIP - to test
    @UserTypes(UserType.Admin)
    @Put(":roleId")
    async update(
        @Param("roleId", new ParseObjectIdPipe()) roleId: string,
        @Body() updateRoleDto: UpdateRoleDto,
    ): Promise<ResponseRoleDto> {
        log("RoleController > update");
        return await this.roleService.updateById(roleId, updateRoleDto);
    }

    // WIP - to test
    @UserTypes(UserType.Admin)
    // TODO: add control if id used elsewhere?
    @HttpCode(204)
    @Delete(":roleId")
    async delete(@Param("roleId", new ParseObjectIdPipe()) roleId: string): Promise<void> {
        log("RoleController > delete");
        return await this.roleService.deleteById(roleId);
    }

    // WIP - to test
    @Get()
    async getRoleForParams(
        @Query("roleId") _id?: string,
        @Query("roleName") name?: string,
        @Query("roleType") roleType?: eClassType,
        @Query("subRoleType") subRoleType?: eClassSubType,
        @Query("mythId") mythology?: string,
        @Query("godId") god?: string,
    ): Promise<ResponseRoleDto[]> {
        log("RoleController > getRoleForParams");

        const filters = {
            ...(_id && { _id }),
            ...(name && { name }),
            ...(roleType && { roleType }),
            ...(subRoleType && { subRoleType }),
            ...(mythology && { mythology }),
            ...(god && { god }),
        };
        return await this.roleService.findAll(filters);
    }
}
