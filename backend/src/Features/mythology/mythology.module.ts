import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MythologyController } from "./mythology.controller";
import { Mythology, MythologySchema } from "./mythologies.schema";
import { MythologyService } from "./mythology.service";
import { MythologyDbService } from "./mythology.db.service";
import { GodModule } from "../god/god.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Mythology.name, schema: MythologySchema }]),
        forwardRef(() => GodModule),
    ],
    controllers: [MythologyController],
    providers: [MythologyService, MythologyDbService],
    exports: [MythologyService, MythologyDbService],
})
export class MythologyModule {}
