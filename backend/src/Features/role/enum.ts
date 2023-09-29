export enum eUnitType {
    Melee = "Melee",
    Ranged = "Ranged",
    Mage = "Mage",
}

export enum eSubUnitType {
    LightMelee = "Light Melee",
    HeavyMelee = "Heavy Melee",
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
    [eUnitType.Mage]: eSubUnitType.Elementalists | eSubUnitType.Enchanters | eSubUnitType.Diviners;
};
