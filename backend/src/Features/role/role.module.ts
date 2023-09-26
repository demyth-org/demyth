import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoleController } from "./role.controller";
import { Role, RoleSchema } from "./roles.schema";
import { RoleService } from "./role.service";
import { RoleDbService } from "./role.db.service";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
    imports: [MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])],
    controllers: [RoleController],
    providers: [RoleService, RoleDbService],
    exports: [RoleService, RoleDbService],
})
export class RoleModule {}
