// mongodb-initialization.service.ts
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Mythology } from "../Features/mythology/mythologies.schema";
import { mythologies } from "src/Features/mythology/enum";

@Injectable()
export class InitDbService {
    constructor(@InjectModel(Mythology.name) private readonly mythologyModel: Model<Mythology>) {}

    async initializeSchemas(): Promise<boolean> {
        console.log("InitDbService > initializeSchemas");
        return (await this.initializeMythologiesSchema()) && (await this.initializeGodsSchema());
    }

    async initializeMythologiesSchema(): Promise<boolean> {
        if (await this.mythologyModel.exists({})) return true;
        else {
            const greek = new this.mythologyModel({
                name: mythologies.Greek,
                images: ["ipfs://animage.png"],
                effects: ["spell greek does X damage", "spell 2 does Y bonus of favor"],
            });
            const egyptian = new this.mythologyModel({
                name: mythologies.Egyptian,
                images: ["ipfs://animage.png"],
                effects: ["spell 1 does X damage", "spell 2 does Y bonus of favor"],
            });
            const norse = new this.mythologyModel({
                name: mythologies.Norse,
                images: ["ipfs://animage.png"],
                effects: ["spell 1 does X damage", "spell 2 does Y bonus of favor"],
            });
            /*...*/
            return (await this.mythologyModel.bulkSave([greek, egyptian, norse])).isOk();
        }
    }

    async initializeGodsSchema(): Promise<boolean> {
        /*const schemasAlreadyInitialized = await this.mythologyModel.exists({});
        if (!schemasAlreadyInitialized) {
            const greek = new this.mythologyModel({
                name: mythologies.Greek,
                images: ["ipfs://animage.png"],
                effects: ["spell greek does X damage", "spell 2 does Y bonus of favor"],
            });
            const egyptian = new this.mythologyModel({
                name: mythologies.Egyptian,
                images: ["ipfs://animage.png"],
                effects: ["spell 1 does X damage", "spell 2 does Y bonus of favor"],
            });
            const norse = new this.mythologyModel({
                name: mythologies.Norse,
                images: ["ipfs://animage.png"],
                effects: ["spell 1 does X damage", "spell 2 does Y bonus of favor"],
            });
            return (await this.mythologyModel.bulkSave([greek, egyptian, norse])).isOk();
        }*/
        return true;
    }
}
