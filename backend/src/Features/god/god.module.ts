import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GodController } from "./god.controller";
import { God, GodSchema } from "./gods.schema";
import { GodService } from "./god.service";
import { GodDbService } from "./god.db.service";
import { MythologyModule } from "../mythology/mythology.module";

@Module({
    imports: [MongooseModule.forFeature([{ name: God.name, schema: GodSchema }]), forwardRef(() => MythologyModule)],
    controllers: [GodController],
    providers: [GodService, GodDbService],
    exports: [GodService, GodDbService],
})
export class GodModule {}
