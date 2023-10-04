import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoleController } from "./role.controller";
import { Role, RoleSchema } from "./roles.schema";
import { RoleService } from "./role.service";
import { RoleDbService } from "./role.db.service";
import { MythologyModule } from "../mythology/mythology.module";
import { GodModule } from "../god/god.module";

@Module({
    imports: [MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]), MythologyModule, GodModule],
    controllers: [RoleController],
    providers: [RoleService, RoleDbService],
    exports: [RoleService, RoleDbService],
})
export class RoleModule {}
