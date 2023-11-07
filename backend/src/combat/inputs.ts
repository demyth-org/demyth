import { eClassSubType, eClassType } from "../enums";

export const UnitListV1 = [
    {
        name: "Spartan Hoplites",
        roleType: eClassType.Melee,
        roleSubType: eClassSubType.HeavyMelee,
        strength: 7,
        dexterity: 3,
        intelligence: 12,
        constitution: 45,
        luck: 0,
        armor: 50,
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b5",
    },
    {
        name: "Athenian Archers",
        roleType: eClassType.Ranged,
        roleSubType: eClassSubType.Archers,
        strength: 11,
        dexterity: 8,
        intelligence: 5,
        constitution: 16,
        luck: 0,
        armor: 20,
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b5",
    },
    {
        name: "Delphic Oracles",
        roleType: eClassType.Mage,
        roleSubType: eClassSubType.Diviners,
        strength: 1,
        dexterity: 1,
        intelligence: 10,
        constitution: 36,
        luck: 8,
        armor: 10,
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b5",
    },
    {
        name: "Nereid Guardians",
        roleType: eClassType.Melee,
        roleSubType: eClassSubType.LightMelee,
        strength: 6,
        dexterity: 8,
        intelligence: 4,
        constitution: 6,
        luck: 0,
        armor: 40,
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b9",
    },
    {
        name: "Trident Warriors",
        roleType: eClassType.Melee,
        roleSubType: "Specialized Melee",
        strength: 8,
        dexterity: 7,
        intelligence: 2,
        constitution: 7,
        luck: 0,
        armor: 55,
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b9",
    },
    {
        name: "Oceanic Mystics",
        roleType: eClassType.Mage,
        roleSubType: "Elementalists",
        strength: 3,
        dexterity: 5,
        intelligence: 9,
        constitution: 4,
        luck: 7,
        armor: 30,
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b9",
    },
    {
        name: "Argive Protectors",
        roleType: eClassType.Melee,
        roleSubType: eClassSubType.HeavyMelee,
        strength: 9,
        dexterity: 4,
        intelligence: 2,
        constitution: 8,
        luck: 0,
        armor: 60,
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b7",
    },
    {
        name: "Olympian Archers",
        roleType: eClassType.Ranged,
        roleSubType: eClassSubType.Archers,
        strength: 1,
        dexterity: 8,
        intelligence: 4,
        constitution: 3,
        luck: 0,
        armor: 20,
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b7",
    },
    {
        name: "Divine Oracles",
        roleType: eClassType.Mage,
        roleSubType: eClassSubType.Diviners,
        strength: 2,
        dexterity: 3,
        intelligence: 10,
        constitution: 5,
        luck: 8,
        armor: 10,
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b7",
    },
    {
        name: "Jovian Centurion",
        roleType: eClassType.Melee,
        roleSubType: eClassSubType.HeavyMelee,
        strength: 9,
        dexterity: 6,
        intelligence: 4,
        constitution: 8,
        luck: 5,
        armor: 8,
        mythology: "651ae98f3c3bf0ce27aecddc",
        god: "651aee77a8bd25642102b228",
    },
];

export const UnitListV2 = [
    {
        name: "Spartan Hoplites",
        roleType: eClassType.Melee,
        roleSubType: eClassSubType.HeavyMelee,
        level: 1,
        stats: { vigor: 7, dexterity: 3, mind: 12, energy: 45, initiative: 0 },
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b5",
    },
    {
        name: "Athenian Archers",
        roleType: eClassType.Ranged,
        roleSubType: eClassSubType.Archers,
        level: 1,
        stats: { vigor: 11, dexterity: 8, mind: 5, energy: 16, initiative: 10 },
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b5",
    },
    {
        name: "Delphic Oracles",
        roleType: eClassType.Mage,
        roleSubType: eClassSubType.Diviners,
        level: 1,
        stats: { vigor: 1, dexterity: 1, mind: 10, energy: 36, initiative: 8 },
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b5",
    },
    {
        name: "Nereid Guardians",
        roleType: eClassType.Melee,
        roleSubType: eClassSubType.LightMelee,
        level: 1,
        stats: { vigor: 6, dexterity: 8, mind: 4, energy: 6, initiative: 0 },
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b9",
    },
    {
        name: "Trident Warriors",
        roleType: eClassType.Melee,
        roleSubType: eClassSubType.SpecializedMelee,
        level: 1,
        stats: { vigor: 8, dexterity: 7, mind: 2, energy: 7, initiative: 0 },
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b9",
    },
    {
        name: "Oceanic Mystics",
        roleType: eClassType.Mage,
        roleSubType: eClassSubType.Elementalists,
        level: 1,
        stats: { vigor: 3, dexterity: 5, mind: 9, energy: 4, initiative: 7 },
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b9",
    },
    {
        name: "Argive Protectors",
        roleType: eClassType.Melee,
        roleSubType: eClassSubType.HeavyMelee,
        level: 1,
        stats: { vigor: 9, dexterity: 4, mind: 2, energy: 8, initiative: 0 },
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b7",
    },
    {
        name: "Olympian Archers",
        roleType: eClassType.Ranged,
        roleSubType: eClassSubType.Archers,
        level: 1,
        stats: { vigor: 1, dexterity: 8, mind: 4, energy: 3, initiative: 0 },
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b7",
    },
    {
        name: "Divine Oracles",
        roleType: eClassType.Mage,
        roleSubType: eClassSubType.Diviners,
        level: 1,
        stats: { vigor: 2, dexterity: 3, mind: 10, energy: 5, initiative: 8 },
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b7",
    },
    {
        name: "Jovian Centurion",
        roleType: eClassType.Melee,
        roleSubType: eClassSubType.HeavyMelee,
        level: 1,
        stats: { vigor: 9, dexterity: 6, mind: 4, energy: 8, initiative: 5 },
        mythology: "651ae98f3c3bf0ce27aecddc",
        god: "651aee77a8bd25642102b228",
    },
];

export const BASE_DAMAGE = 0; //All chars have 10 flat base damage
export const BASE_DAMAGE_BONUS = 0; //All chars have 0% bonus base damage
export const CLASS_MODIFIER_BONUS = 10; //All chars have 10% bonus modifier class damage (Rock Paper Scisor)
export const MIN_CRIT_CHANCE = 5; //All chars have 5% min crit chance
export const MAX_CRIT_CHANCE = 100; //All chars have 100% max crit chance
export const BASE_CRIT_MULTIPLIER = 50; //All chars have 50% min more damage when crit

export type tUnitProfileV1 = {
    name: string;
    roleType: string;
    roleSubType: string;
    strength: number;
    dexterity: number;
    intelligence: number;
    constitution: number;
    luck: number;
    armor: number;
    mythology: string;
    god: string;
};

export type tBaseStats = {
    vigor: number;
    dexterity: number;
    mind: number;
    energy: number;
    initiative: number;
};

export type tDerivedBaseStats = {
    pAtk_vigor: number;
    pDef: number;
    hp: number;

    pAtk_dexterity: number;
    dodge: number;
    crit: number;

    mAtk: number;
    mDef: number;
};

export type tUnitProfileV2 = {
    name: string;
    roleType: eClassType;
    roleSubType: eClassSubType;
    level: number;
    stats: tBaseStats;
    mythology: string;
    god: string;
};

export const clamp = (min: number, value: number, max: number): number => {
    return Math.min(Math.max(min, value), max);
};

export const getRandomIntInclusive = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};
