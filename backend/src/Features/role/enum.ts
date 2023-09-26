export enum eUnitType {
    Melee = "Melee",
    Ranged = "Ranged",
    Sorcerers = "Sorcerers",
}

export enum eSubUnitType {
    HeavyMelee = "Heavy Melee",
    LightMelee = "Light Melee",
    SpecializedMelee = "Specialized Melee",

    Archers = "Archers",
    Throwers = "Throwers",
    Marksmen = "Marksmen",

    Elementalists = "Elementalists",
    Enchanters = "Enchanters",
    Diviners = "Diviners",
}

export type eUnitTypeMap = {
    [eUnitType.Melee]: eSubUnitType.HeavyMelee | eSubUnitType.LightMelee | eSubUnitType.SpecializedMelee;
    [eUnitType.Ranged]: eSubUnitType.Archers | eSubUnitType.Throwers | eSubUnitType.Marksmen;
    [eUnitType.Sorcerers]: eSubUnitType.Elementalists | eSubUnitType.Enchanters | eSubUnitType.Diviners;
};
