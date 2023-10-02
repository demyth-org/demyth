import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CreatureController } from "./creature.controller";
import { Creature, CreatureSchema } from "./creatures.schema";
import { CreatureService } from "./creature.service";
import { CreatureDbService } from "./creature.db.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Creature.name, schema: CreatureSchema }])],
    controllers: [CreatureController],
    providers: [CreatureService, CreatureDbService],
    exports: [CreatureService, CreatureDbService],
})
export class CreatureModule {}
