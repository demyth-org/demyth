import { Module, OnModuleInit } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MythologyController } from "./mythology.controller";
import { Mythology, MythologySchema } from "./mythologies.schema";
import { MythologyService } from "./mythology.service";
import { InitDbService } from "../../init/init.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Mythology.name, schema: MythologySchema }])],
    controllers: [MythologyController],
    providers: [MythologyService, InitDbService],
    exports: [MythologyService],
})
export class MythologyModule implements OnModuleInit {
    constructor(private readonly initDbService: InitDbService) {}
    async onModuleInit() {
        console.log("MythologyModule > onModuleInit");
        await this.initDbService.initializeSchemas();
    }
}
