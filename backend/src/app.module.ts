import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HeroModule } from "./Features/hero/hero.module";
import { MythologyModule } from "./Features/mythology/mythology.module";
import { GodModule } from "./Features/god/god.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.MONGODB_URL),
        HeroModule,
        MythologyModule,
        GodModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
