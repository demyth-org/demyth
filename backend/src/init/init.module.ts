import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Mythology, MythologySchema } from "../Features/mythology/mythologies.schema";
import { InitDbService } from "./init.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Mythology.name, schema: MythologySchema }])],
    providers: [InitDbService],
    exports: [InitDbService],
})
export class InitModule {}