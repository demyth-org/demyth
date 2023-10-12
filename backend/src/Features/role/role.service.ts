import { Model } from "mongoose";
import { Injectable, NotFoundException, ConflictException, UnprocessableEntityException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Role, RoleDocument } from "./roles.schema";
import { CreateRoleDto } from "./dto/create-role.dto";
import { ResponseRoleDto } from "./dto/response-role.dto";
import { plainToClass } from "class-transformer";
import { FindRoleParams, RoleDbService } from "./role.db.service";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { MythologyDbService } from "../mythology/mythology.db.service";
import { GodDbService } from "../god/god.db.service";

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Role.name) private roleModel: Model<Role>,
        private readonly roleDbService: RoleDbService,
        private readonly mythologyDbService: MythologyDbService,
        private readonly godDbService: GodDbService,
    ) {}

    getResponseDtoFrom(aRole: RoleDocument): ResponseRoleDto {
        return plainToClass(ResponseRoleDto, aRole.toJSON());
    }

    async create(createRoleDto: CreateRoleDto): Promise<ResponseRoleDto> {
        const existingRole = await this.roleModel.findOne({ name: createRoleDto.name });
        if (existingRole) {
            throw new ConflictException(`${existingRole.name} already exists.`);
        }

        const myth = await this.mythologyDbService.findOneByName(createRoleDto.mythology);
        const god = await this.godDbService.findOne({
            name: createRoleDto.god,
            mythology: myth._id.toString(),
        });
        if (!myth || !god) {
            throw new UnprocessableEntityException(
                `${createRoleDto.mythology && createRoleDto.god} is null or undefined.`,
            );
        } else {
            const dtoWithId = { ...createRoleDto, mythology: myth._id, god: god._id };
            const createdRole = await this.roleDbService.save(new this.roleModel(dtoWithId));
            return this.getResponseDtoFrom(createdRole);
        }
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
