export enum eClassType {
    Melee = "Melee",
    Ranged = "Ranged",
    Mage = "Mage",
}

export enum eClassSubType {
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

export type eClassTypeMap = {
    [eClassType.Melee]: eClassSubType.HeavyMelee | eClassSubType.LightMelee | eClassSubType.SpecializedMelee;
    [eClassType.Ranged]: eClassSubType.Archers | eClassSubType.Throwers | eClassSubType.Marksmen;
    [eClassType.Mage]: eClassSubType.Elementalists | eClassSubType.Enchanters | eClassSubType.Diviners;
};
