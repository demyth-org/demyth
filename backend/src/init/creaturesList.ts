import { eGods } from "../enums/gods";
import { eMythologies } from "../features/mythology/enum";
import { CreateCreatureDto } from "../features/creature/dto/create-creature.dto";
import { eClassSubType, eClassType } from "../enums/class";

const greekZeusCreatureList: CreateCreatureDto[] = [
    {
        name: "blabla name",
        unitType: eClassType.Melee,
        subUnitType: eClassSubType.HeavyMelee,
        shortDesc: "blabla short",
        longDesc: "blabla long",
        image: "ipfs://main-image.png",
        strength: 7,
        dexterity: 3,
        intelligence: 0,
        constitution: 5,
        luck: 0,
        armor: 50,
        fatigue: 2,
        mythology: eMythologies.Greek,
        god: eGods.Zeus,
    },
];

const greekPoseidonCreatureList: CreateCreatureDto[] = [];
const greekAthenaCreatureList: CreateCreatureDto[] = [];

export const greekUnitsList = greekZeusCreatureList.concat(greekPoseidonCreatureList).concat(greekAthenaCreatureList);
