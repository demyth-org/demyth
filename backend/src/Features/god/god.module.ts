import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GodController } from "./god.controller";
import { God, GodSchema } from "./gods.schema";
import { GodService } from "./god.service";
import { GodDbService } from "./god.db.service";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
    imports: [MongooseModule.forFeature([{ name: God.name, schema: GodSchema }])],
    controllers: [GodController],
    providers: [GodService, GodDbService],
    exports: [GodService, GodDbService],
})
export class GodModule {}
