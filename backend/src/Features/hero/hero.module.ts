import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HeroController } from "./hero.controller";
import { Hero, HeroSchema } from "./heros.schema";
import { HeroService } from "./hero.service";
import { HeroDbService } from "./hero.db.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Hero.name, schema: HeroSchema }])],
    controllers: [HeroController],
    providers: [HeroService, HeroDbService],
    exports: [HeroService, HeroDbService],
})
export class HeroModule {}
