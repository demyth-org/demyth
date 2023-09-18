// mongodb-initialization.service.ts
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Mythology } from "../Features/mythology/mythologies.schema";
import { mythologies } from "../Features/mythology/enum";

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
                shortdesc:
                    "Explore ancient Greece, where gods meddle in mortal affairs, heroes embark on quests, and mythical creatures roam.",
                longdesc:
                    "Step into the world of Greek mythology, a realm where powerful gods, cunning goddesses, and courageous heroes shape the destiny of mortals. From the heights of Mount Olympus to the depths of the Underworld, this ancient pantheon weaves tales of epic battles, tragic loves, and awe-inspiring feats. Encounter legendary creatures like the Minotaur, face the challenges of the Twelve Labors, and navigate the intrigues of the divine.",
                images: {
                    main: "ipfs://a-main-image.png",
                    miniature: "ipfs://a-miniature-image.png",
                    icon: "ipfs://an-icon-image.png",
                },
                effects: {
                    name: "Divine Favor",
                    shortDesc:
                        "Invoke the favor of Greek gods for strength, wisdom, and supernatural aid in your epic quests and battles",
                    icon: "ipfs://an-icon-image.png",
                },
            });
            const egyptian = new this.mythologyModel({
                name: mythologies.Egyptian,
                shortdesc:
                    "Unearth the mysteries of ancient Egypt, where pharaohs rule, gods command, and the afterlife holds great significance.",
                longdesc:
                    "Journey through the sands of ancient Egypt, a land of pharaohs, pyramids, and potent deities. Here, the gods Osiris, Ra, and Isis hold dominion over the mortal realm and the world beyond. Explore the sacred rites of the Nile, confront the enigmatic Sphinx, and decipher hieroglyphic mysteries. Egyptian mythology weaves a tapestry of life, death, rebirth, and the enduring power of the gods.",
                images: {
                    main: "ipfs://a-main-image.png",
                    miniature: "ipfs://a-miniature-image.png",
                    icon: "ipfs://an-icon-image.png",
                },
                effects: {
                    name: "Ankh of Life",
                    shortDesc:
                        "Channel the sacred Ankh's power to bring vitality, protection, and renewal to your journey through the lands of Egypt",
                    icon: "ipfs://an-icon-image.png",
                },
            });
            const norse = new this.mythologyModel({
                name: mythologies.Norse,
                shortdesc:
                    "Embark on a Viking saga through the rugged lands of Norse gods, fierce warriors, and colossal beasts.",
                longdesc:
                    "Set forth on a Viking odyssey through the realms of Norse mythology, where gods like Odin, Thor, and Loki command the elements and dictate the fates of both mortals and immortals. Traverse the Nine Worlds, from the icy realm of Niflheim to the fiery Muspelheim, encountering giants, elves, and otherworldly creatures. Norse mythology unfurls a saga of valor, destiny, and the eternal battle between chaos and order.",
                images: {
                    main: "ipfs://a-main-image.png",
                    miniature: "ipfs://a-miniature-image.png",
                    icon: "ipfs://an-icon-image.png",
                },
                effects: {
                    name: "Norse's Gaze",
                    shortDesc:
                        "Unlock Norse's divine insight to unveil secrets, foresee challenges, and navigate the complex tapestry of the Norse realms",
                    icon: "ipfs://an-icon-image.png",
                },
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
