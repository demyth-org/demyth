import { Module, OnModuleInit, ServiceUnavailableException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HeroModule } from "./Features/hero/hero.module";
import { MythologyModule } from "./Features/mythology/mythology.module";
import { GodModule } from "./Features/god/god.module";
import { InitModule } from "./init/init.module";
import { InitDbService } from "./init/init.service";
import { log } from "./utils/debug.utils";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.MONGODB_URL),
        HeroModule,
        MythologyModule,
        GodModule,
        InitModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements OnModuleInit {
    constructor(private readonly initDbService: InitDbService) {}
    async onModuleInit() {
        log("MythologyModule > onModuleInit");
        if (!(await this.initDbService.initializeSchemas())) {
            throw new ServiceUnavailableException();
        }
    }
}
