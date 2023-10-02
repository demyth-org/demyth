import { Model } from "mongoose";
import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Role, RoleDocument } from "./roles.schema";
import { CreateRoleDto } from "./dto/create-role.dto";
import { ResponseRoleDto } from "./dto/response-role.dto";
import { plainToClass } from "class-transformer";
import { FindRoleParams, RoleDbService } from "./role.db.service";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Role.name) private roleModel: Model<Role>,
        private readonly roleDbService: RoleDbService,
    ) {}

    getResponseDtoFrom(aRole: RoleDocument): ResponseRoleDto {
        return plainToClass(ResponseRoleDto, aRole.toJSON());
    }

    async create(createRoleDto: CreateRoleDto): Promise<ResponseRoleDto> {
        const existingRole = await this.roleModel.findOne({ name: createRoleDto.name });
        if (existingRole) {
            throw new ConflictException(`${existingRole.name} already exists.`);
        }
        const createdRole = await this.roleDbService.save(new this.roleModel(createRoleDto));
        return this.getResponseDtoFrom(createdRole);
    }

    async updateById(roleId: string, updateRoleDto: UpdateRoleDto): Promise<ResponseRoleDto> {
        const aRoleDoc = await this.roleDbService.findOneById(roleId);
        if (!aRoleDoc) throw new NotFoundException(`No role with id ${roleId} found.`);

        Object.assign(aRoleDoc, updateRoleDto);

        const updatedRoleDoc = await this.roleDbService.save(aRoleDoc);
        return this.getResponseDtoFrom(updatedRoleDoc);
    }

    async deleteById(roleId: string): Promise<void> {
        const aRoleDoc = await this.roleDbService.delete(roleId);
        if (!aRoleDoc) throw new NotFoundException(`No role with id ${roleId} found.`);
    }

    async findAll(filter: FindRoleParams): Promise<ResponseRoleDto[]> {
        const rolesDoc = await this.roleDbService.findAll(filter);
        if (rolesDoc.length == 0) throw new NotFoundException(`Wrong params provided.`);
        return rolesDoc.map((role) => this.getResponseDtoFrom(role));
    }
}
