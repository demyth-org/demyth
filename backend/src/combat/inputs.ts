export const UnitList = [
    {
        name: "Spartan Hoplites",
        roleType: "Melee",
        roleSubType: "Heavy Melee",
        strength: 7,
        dexterity: 3,
        intelligence: 0,
        constitution: 5,
        luck: 0,
        armor: 50,
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b5",
    },
    {
        name: "Athenian Archers",
        roleType: "Ranged",
        roleSubType: "Archers",
        strength: 0,
        dexterity: 8,
        intelligence: 5,
        constitution: 2,
        luck: 0,
        armor: 20,
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b5",
    },
    {
        name: "Delphic Oracles",
        roleType: "Mage",
        roleSubType: "Diviners",
        strength: 1,
        dexterity: 1,
        intelligence: 10,
        constitution: 3,
        luck: 8,
        armor: 10,
        mythology: "6516d7771dfb2de0637500a4",
        god: "6516d7771dfb2de0637500b5",
    },
    {
        name: "Nereid Guardians",
        roleType: "Melee",
        roleSubType: "Light Melee",
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
        roleType: "Melee",
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
        roleType: "Mage",
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
        roleType: "Melee",
        roleSubType: "Heavy Melee",
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
        roleType: "Ranged",
        roleSubType: "Archers",
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
        roleType: "Mage",
        roleSubType: "Diviners",
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
        roleType: "Melee",
        roleSubType: "Heavy Melee",
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

export const attackers = [UnitList[0]];
export const defenders = [UnitList[1]];

export type UnitProfile = {
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
