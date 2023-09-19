import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Mythology, MythologySchema } from "../Features/mythology/mythologies.schema";
import { InitDbService } from "./init.service";
import { God, GodSchema } from "../Features/god/gods.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Mythology.name, schema: MythologySchema },
            { name: God.name, schema: GodSchema },
        ]),
    ],
    providers: [InitDbService],
    exports: [InitDbService],
})
export class InitModule {}
