import { eClassSubType, eClassType } from "../enums";
import {
    BASE_CRIT_MULTIPLIER,
    BASE_DAMAGE,
    BASE_DAMAGE_BONUS,
    CLASS_MODIFIER_BONUS,
    MAX_CRIT_CHANCE,
    MIN_CRIT_CHANCE,
    UnitListV2,
    clamp,
    getRandomIntInclusive,
    tUnitProfileV2,
    tBaseStats,
    tDerivedBaseStats,
} from "./inputs";

class mStats {
    mBase: Record<string, number>;
    mModifiers: Record<string, { add: Record<string, number>; mult: Record<string, number> }>;

    constructor(stats: Record<string, number>) {
        this.mBase = { ...stats };
        this.mModifiers = {};
    }

    getBase(id: string): number {
        return this.mBase[id] || 0;
    }

    addModifier(id: string, modifier: { add?: Record<string, number>; mult?: Record<string, number> }): void {
        this.mModifiers[id] = {
            add: modifier.add || {},
            mult: modifier.mult || {},
        };
    }

    removeModifier(id: string): void {
        delete this.mModifiers[id];
    }

    get(id: string): number {
        let total = this.getBase(id);
        let multiplier = 0;

        for (const key in this.mModifiers) {
            total += this.mModifiers[key].add[id] || 0;
            multiplier += this.mModifiers[key].mult[id] || 0;
        }

        console.log(`Multiplier: ${multiplier}`);
        return total + total * multiplier;
    }

    printStat(id: string) {
        let base = this.getBase(id);
        let full = this.get(id);
        console.log("%s>%d:%d", id, base, full);
    }
}

class GeneralUnit {
    protected getBaseDamage(): number {
        return BASE_DAMAGE;
    }

    protected getBaseDamageBonus(): number {
        return BASE_DAMAGE_BONUS;
    }

    protected getBaseDamageFlat(): number {
        return 0;
    }

    protected getCritChance(crit: number): number {
        return clamp(MIN_CRIT_CHANCE, crit, MAX_CRIT_CHANCE);
    }

    protected getCritMultiplier(): number {
        return BASE_CRIT_MULTIPLIER;
    }
}

class Stats {
    public classeType: eClassType;

    public baseStats: tBaseStats;
    public derivedStats: tDerivedBaseStats;

    constructor(baseStats: tBaseStats, classeType: eClassType) {
        this.baseStats = baseStats;
        this.classeType = classeType;

        if (this.classeType === eClassType.Melee) this.defineForMelee();
        else if (this.classeType === eClassType.Ranged) this.defineForRanged();
        else this.defineForMage();
    }

    protected defineForMelee() {
        const { vigor, dexterity, mind } = this.baseStats;
        this.derivedStats = {
            // Vigor
            pAtk_vigor: vigor * 2,
            pDef: Math.round(vigor / 2),
            hp: vigor * 6,

            // Dexterity
            pAtk_dexterity: Math.round(dexterity / 2),
            dodge: Math.round(dexterity / 2),
            crit: Math.round(dexterity / 2),

            // Mind
            mAtk: Math.round(mind / 2),
            mDef: Math.round(mind / 2),
        };
    }

    protected defineForRanged() {
        const { vigor, dexterity, mind } = this.baseStats;
        this.derivedStats = {
            // Vigor
            pAtk_vigor: Math.round(vigor / 2),
            pDef: Math.round(vigor / 3),
            hp: vigor * 5,

            // Dexterity
            pAtk_dexterity: dexterity * 2,
            dodge: Math.round((dexterity * 3) / 2),
            crit: Math.round(dexterity / 2),

            // Mind
            mAtk: Math.round(mind / 2),
            mDef: Math.round(mind / 2),
        };
    }

    protected defineForMage() {
        const { vigor, dexterity, mind } = this.baseStats;
        this.derivedStats = {
            // Vigor
            pAtk_vigor: Math.round(vigor / 2),
            pDef: Math.round(vigor / 4),
            hp: vigor * 4,

            // Dexterity
            pAtk_dexterity: Math.round(dexterity / 2),
            dodge: Math.round(dexterity / 2),
            crit: Math.round(dexterity / 2),

            // Mind
            mAtk: mind * 2,
            mDef: mind,
        };
    }
}

/* class Character {
    // ... other methods ...

    calculateAttackDamage(target: Character) {
        let damage = this.strength * someMultiplier;

        if (typeBonuses[this.type] && typeBonuses[this.type][target.type]) {
            damage *= typeBonuses[this.type][target.type];
        }

        return damage;
    }
} */

class UnitProfile extends GeneralUnit {
    public name: string;
    public roleType: eClassType;
    public roleSubType: eClassSubType;

    public level: number;
    public stats: Stats;
    public pAtk: number;
    public currentHp: number;
    public previousHp: number;

    public mythology: string;
    public god: string;

    constructor(unit: tUnitProfileV2) {
        super();

        const { name, roleType, roleSubType, level, stats, mythology, god } = unit;

        this.name = name;
        this.roleType = roleType;
        this.roleSubType = roleSubType;
        this.level = level;

        this.stats = new Stats(stats, this.roleType);
        this.mythology = mythology;
        this.god = god;

        this.completeDerivedStats();
    }

    protected completeDerivedStats() {
        // TODO: Add bonus% on pAtk
        // TODO: Add flat on  pAtk

        // Final compute
        this.pAtk = this.stats.derivedStats.pAtk_vigor + this.stats.derivedStats.pAtk_dexterity;
        this.currentHp = this.stats.derivedStats.hp;
    }

    // TODO: Add Base damage bonus%
    public getBaseDamageBonus(): number {
        return super.getBaseDamageBonus();
    }

    // TODO: Add Base flat damage
    public getBaseDamageFlat(): number {
        return super.getBaseDamageFlat();
    }

    // (Base damage + pAtk) x (1+baseBamageBonus/100) + flatBaseDamage
    public calcBaseDamage(): number {
        return (this.getBaseDamage() + this.pAtk) * (1 + this.getBaseDamageBonus() / 100) + this.getBaseDamageFlat();
    }

    // getCritChance(luck) + critChanceBonus
    public calcCritChance(critChanceBonus = 0): number {
        return this.getCritChance(this.stats.derivedStats.crit) + critChanceBonus;
    }

    // getCritMutiplier + critMultiplierBonus
    public calcCritMultiplier(critModifierBonus = 0): number {
        return Math.round((this.getCritMultiplier() + critModifierBonus) / 100);
    }

    public calcDamageBonus(defender: UnitProfile): number {
        const classModifierBonus = {
            [eClassType.Melee]: {
                [eClassType.Ranged]: CLASS_MODIFIER_BONUS,
            },
            [eClassType.Ranged]: {
                [eClassType.Mage]: CLASS_MODIFIER_BONUS,
            },
            [eClassType.Mage]: {
                [eClassType.Melee]: CLASS_MODIFIER_BONUS,
            },
        };

        if (classModifierBonus[this.roleType] && classModifierBonus[this.roleType][defender.roleType]) {
            return classModifierBonus[this.roleType][defender.roleType];
        }
        return 0;
    }

    public calcReductionDamageBonus(): number {
        return 0;
    }

    public calcDefense(ennemyRoleType: string, defenseModifierBonus?: number): number {
        if (ennemyRoleType !== "Mage") return this.stats.derivedStats.pDef + (defenseModifierBonus ?? 0);
        return 0;
    }

    public calcMagicRes(ennemyRoleType: string, resMagiqueModifierBonus?: number): number {
        if (ennemyRoleType == "Mage") return this.stats.derivedStats.mDef + (resMagiqueModifierBonus ?? 0);
        return 0;
    }

    public updateHp(hp: number): void {
        this.previousHp = this.currentHp;
        this.currentHp = hp;
    }
}

class Combat {
    attacker: UnitProfile[];
    defender: UnitProfile[];
    startNbOfAttacker: number;
    startNbOfDefender: number;

    constructor(attacker: UnitProfile[], defender: UnitProfile[]) {
        this.attacker = attacker;
        this.startNbOfAttacker = attacker.length;
        this.defender = defender;
        this.startNbOfDefender = defender.length;
    }

    private getRandomTarget(units: UnitProfile[]): UnitProfile {
        const randomIndex = Math.floor(Math.random() * units.length);
        return units[randomIndex];
    }

    private printRandomTarget(atk: UnitProfile, def: UnitProfile): void {
        console.log(`\n1) ${atk.roleType} - ${atk.name} <== Vs ==> ${def.roleType} - ${def.name}`);
    }

    private calculateDamage(attacker: UnitProfile, defender: UnitProfile): number {
        console.log(`2) calculateAttackDamage`);

        // Calc base damage
        const baseDamage = attacker.calcBaseDamage();
        console.log("baseDamage : ", baseDamage);

        // Calc crit chance
        let crit = 1;
        if (Math.random() < attacker.calcCritChance() / 100) {
            crit = 1 + attacker.calcCritMultiplier();
        }
        console.log(" * crit ", crit);

        // Calc bonus damage
        const dmgBonus = attacker.calcDamageBonus(defender);
        // Calc target reduction damage
        const targetReductionDmgBonus = defender.calcReductionDamageBonus();
        console.log(" * (1 + (dmgBonus - targetReductionDmgBonus)/100) * 100", dmgBonus, targetReductionDmgBonus);

        // Calc target physical defense
        const targetDef = defender.calcDefense(attacker.roleType);
        // Calc target magic resistance
        const targetMagicRes = defender.calcMagicRes(attacker.roleType);
        console.log(" / (100 + targetDef + targetMagicRes)", targetDef, targetMagicRes);

        // Calc final damage
        const finalDamage =
            (baseDamage * crit * (1 + (dmgBonus - targetReductionDmgBonus) / 100) * 100) /
            (100 + targetDef + targetMagicRes);
        console.log("= finalDamage : ", finalDamage);

        return finalDamage;
    }

    private printStartRound(nb: number): void {
        console.log(
            `\n \n ====================== Round n°${nb} ======================`,
            `\n Attackers up: ${this.attacker.length}/${this.startNbOfAttacker}`,
            `\n Defenders up: ${this.defender.length}/${this.startNbOfDefender}`,
        );
    }

    private simulateRound(round: number): void {
        this.printStartRound(round);
        const allUnits = [...this.attacker, ...this.defender];

        // Units will attack by Initiative desc at each round
        allUnits.sort((unitA, unitB) => unitB.stats.baseStats.initiative - unitA.stats.baseStats.initiative);

        try {
            allUnits.forEach((unit) => {
                // Get target
                const isAttacker = this.attacker.includes(unit);
                const target = this.getRandomTarget(isAttacker ? this.defender : this.attacker);
                this.printRandomTarget(unit, target);

                // Calc damage
                const dmg = this.calculateDamage(unit, target);

                // Calc wounds
                const wounds = target.currentHp - dmg;
                if (wounds > 0) {
                    target.updateHp(wounds);
                    console.log(
                        `3) wounds : ${unit.name} inflicted ${dmg} damages to ${target.name}. Remaining HP: ${target.currentHp}`,
                        `\n ____`,
                    );
                } else {
                    // Target is destroyed
                    target.updateHp(0);
                    // const extraWounds = Math.abs(wounds);
                    console.log(
                        `3) wounds : ${unit.name} killed ${target.name} by inflicting ${dmg} dmg / ${target.previousHp} HP.`,
                        `\n ____`,
                    );

                    const index = isAttacker ? this.defender.indexOf(target) : this.attacker.indexOf(target);
                    index !== -1 && isAttacker ? this.defender.splice(index, 1) : this.attacker.splice(index, 1);

                    // TODO: Rapid fire like...
                    /*
					if (unit.rapidFire > 1 && isDestructed(target)) {
						const rapidFireChance = (unit.rapidFire - 1) / unit.rapidFire;
						if (Math.random() < rapidFireChance) {
							const newTarget = this.getRandomTarget(isAttacker ? this.defender : this.attacker);
							this.calculateAttackDamage(unit, newTarget);
						}
					}
					*/
                }

                if (this.attacker.length === 0 || this.defender.length === 0) throw new Error("EndRound");
            });
        } catch (e) {
            if (e.message !== "EndRound") throw e;
        }
    }

    public simulateCombat(): string {
        for (let i = 0; i < 6; i++) {
            this.simulateRound(i + 1);
            if (this.attacker.length === 0) {
                this.printEndCombat(i + 1);
                return "Defender wins!";
            } else if (this.defender.length === 0) {
                this.printEndCombat(i + 1);
                return "Attacker wins!";
            }
        }
        return "Draw!";
    }

    private printEndCombat(nb: number): void {
        console.log(
            `\n \n ====================== End: ${nb} ======================`,
            `\n Attackers up: ${this.attacker.length}/${this.startNbOfAttacker}`,
            `\n Defenders up: ${this.defender.length}/${this.startNbOfDefender}`,
        );
    }
}

const attacker: UnitProfile[] = [new UnitProfile(UnitListV2[0])];
console.log(attacker);
const defender: UnitProfile[] = [new UnitProfile(UnitListV2[1])];
console.log(defender);

const combat = new Combat(attacker, defender);

const result = combat.simulateCombat();
console.log(result);
