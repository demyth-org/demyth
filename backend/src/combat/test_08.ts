import { eClassSubType, eClassType } from "../enums";
import {
    BASE_DAMAGE,
    BASE_DAMAGE_BONUS,
    classModifierBonus,
    MIN_CRIT_CHANCE,
    MAX_CRIT_CHANCE,
    BASE_CRIT_MULTIPLIER,
    MIN_DODGE_CHANCE,
    MAX_DODGE_CHANCE,
    BASE_DODGE_MULTIPLIER,
    UnitListV2,
    clamp,
    tUnitProfileV2,
    tBaseStats,
    tDerivedBaseStats,
    RoundResult,
    DuelResult,
    DamageResult,
    TCalculateDamage,
    SimulationResult,
    CombatResult,
    EOutcome,
} from "./inputs";

const fs = require("fs");

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

    protected getDodgeChance(dodge: number): number {
        return clamp(MIN_DODGE_CHANCE, dodge, MAX_DODGE_CHANCE);
    }

    protected getCritMultiplier(): number {
        return BASE_CRIT_MULTIPLIER;
    }

    protected getDodgeMultiplier(): number {
        return BASE_DODGE_MULTIPLIER;
    }
}

/**
 *
 * TODO : handle bonuses
 * TODO : handle large number of simulation + percent of success
 * TODO : integration of Combat in Nest Module
 * TODO : after balancing units and bonuses round
 *
 */

class Stats {
    public baseStats: tBaseStats;
    public derivedStats: tDerivedBaseStats;

    constructor(baseStats: tBaseStats, classeType: eClassType) {
        this.baseStats = baseStats;

        if (classeType === eClassType.Melee) this.defineForMelee();
        else if (classeType === eClassType.Ranged) this.defineForRanged();
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
            crit: Math.round((dexterity * 3) / 2),

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
        this.previousHp = this.currentHp;
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

    // getCritChance(crit) + critChanceBonus
    public calcCritChance(critChanceBonus = 0): number {
        return this.getCritChance(this.stats.derivedStats.crit) + critChanceBonus;
    }

    // getCritMutiplier + critMultiplierBonus
    public calcCritMultiplier(critModifierBonus = 0): number {
        return (this.getCritMultiplier() + critModifierBonus) / 100;
    }

    // getDodgeChance(dodge) + dodgeChanceBonus
    public calcDodgeChance(dodgeChanceBonus = 0): number {
        return this.getDodgeChance(this.stats.derivedStats.dodge) + dodgeChanceBonus;
    }

    // getDodgeMultiplier + dodgeModifierBonus
    public calcDodgeMultiplier(dodgeModifierBonus = 0): number {
        return (this.getDodgeMultiplier() + dodgeModifierBonus) / 100;
    }

    public calcModifiersDamageBonus(defender: UnitProfile): number {
        if (classModifierBonus[this.roleType] && classModifierBonus[this.roleType][defender.roleType]) {
            return classModifierBonus[this.roleType][defender.roleType];
        }
        return 0;
    }

    public calcModifiersReductionDamageBonus(): number {
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
    private attacker: UnitProfile[];
    private defender: UnitProfile[];
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

    private calculateDamage(attacker: UnitProfile, defender: UnitProfile): TCalculateDamage {
        // Calc base damage
        const baseDamage = attacker.calcBaseDamage();

        // Calc crit chance
        let crit = 1;
        if (Math.random() < attacker.calcCritChance() / 100) {
            crit += attacker.calcCritMultiplier();
        }

        // Calc fight dependant bonuses damage (Ex: Melee vs Ranged)
        const dmgBonus = attacker.calcModifiersDamageBonus(defender);

        // Calc target reduction damage
        const targetReductionDmgBonus = defender.calcModifiersReductionDamageBonus();

        // Calc target dodge
        let dodge = 1;
        if (Math.random() < defender.calcDodgeChance() / 100) {
            dodge = defender.calcDodgeMultiplier();
        }

        // Calc target physical defense
        const targetDef = defender.calcDefense(attacker.roleType);

        // Calc target magic resistance
        const targetMagicRes = defender.calcMagicRes(attacker.roleType);

        // Calc final damage
        const finalDamage =
            (baseDamage * crit * dodge * (1 + (dmgBonus - targetReductionDmgBonus) / 100) * 100) /
            (100 + targetDef + targetMagicRes);

        const dmgDetails = {
            baseDamage,
            crit,
            dmgBonus,
            targetReductionDmgBonus,
            targetDef,
            targetMagicRes,
        };

        return { finalDamage, dmgDetails };
    }

    private simulateRound(round: number, results: RoundResult[]): void {
        const allUnits = [...this.attacker, ...this.defender];

        const roundResult: DuelResult[] = [];
        const partCombatResult = {
            round,
            startAttackerUnits: this.attacker.map((unit) => ({ name: unit.name, hp: unit.currentHp })),
            startDefenderUnits: this.defender.map((unit) => ({ name: unit.name, hp: unit.currentHp })),
        };

        // Units will attack by Initiative desc at each round
        allUnits.sort((unitA, unitB) => unitB.stats.baseStats.initiative - unitA.stats.baseStats.initiative);

        try {
            let duelNb = 0; //Duel Nb
            allUnits.forEach((unit) => {
                duelNb++;

                // Get target
                const isAttacker = this.attacker.includes(unit);
                const target = this.getRandomTarget(isAttacker ? this.defender : this.attacker);

                // Calc damage
                const damage = this.calculateDamage(unit, target);

                // Calc wounds
                const wounds = target.currentHp - damage.finalDamage;
                if (wounds > 0) {
                    target.updateHp(wounds);
                } else {
                    // Target is destroyed
                    target.updateHp(0);
                    // const extraWounds = Math.abs(wounds);

                    // Delete from attackers and defenders list
                    const index = isAttacker ? this.defender.indexOf(target) : this.attacker.indexOf(target);
                    index !== -1 && isAttacker ? this.defender.splice(index, 1) : this.attacker.splice(index, 1);
                }

                roundResult.push({
                    fight: `Fight ${round}-${duelNb}`,
                    attackingUnit: {
                        name: unit.name,
                        classType: unit.roleType,
                        baseStats: unit.stats.baseStats,
                        derivedStats: unit.stats.derivedStats,
                    },
                    defendingUnit: {
                        name: target.name,
                        classType: target.roleType,
                        baseStats: target.stats.baseStats,
                        derivedStats: target.stats.derivedStats,
                    },
                    output: {
                        dmg: damage,
                        previousHp: target.previousHp,
                        remainingHp: target.currentHp,
                    },
                });

                if (this.attacker.length === 0 || this.defender.length === 0) throw new Error("EndRound");
            });
            results.push({
                ...partCombatResult,
                roundResult: roundResult,
                endAttackerUnits: this.attacker.map((unit) => ({ name: unit.name, hp: unit.currentHp })),
                endDefenderUnits: this.defender.map((unit) => ({ name: unit.name, hp: unit.currentHp })),
            });
        } catch (e) {
            if (e.message !== "EndRound") throw e;
            results.push({
                ...partCombatResult,
                roundResult: roundResult,
                endAttackerUnits: this.attacker.map((unit) => ({ name: unit.name, hp: unit.currentHp })),
                endDefenderUnits: this.defender.map((unit) => ({ name: unit.name, hp: unit.currentHp })),
            });
        }
    }

    public simulateCombat(): RoundResult[] {
        const results: RoundResult[] = [];

        for (let i = 0; i < 6; i++) {
            this.simulateRound(i + 1, results);
            if (this.attacker.length === 0) {
                results[results.length - 1].outcome = EOutcome.defenderWin;
                return results;
            } else if (this.defender.length === 0) {
                results[results.length - 1].outcome = EOutcome.attackerWin;
                return results;
            }
        }
        results[results.length - 1].outcome = EOutcome.draw;
        return results;
    }
}

const singleCombat = () => {
    const attacker: UnitProfile[] = [new UnitProfile(UnitListV2[0])];
    const defender: UnitProfile[] = [new UnitProfile(UnitListV2[1])];

    const combat = new Combat(attacker, defender);
    const combatResult = combat.simulateCombat();

    fs.writeFileSync(`combat_result.json`, JSON.stringify(combatResult));
};

const simulation = (nbOfSimul: number) => {
    let simulationResult: SimulationResult = {
        simulation: [],
        attackerUnits: [],
        defenderUnits: [],
        avgAtkWiner: 0,
        avgDefWiner: 0,
        avgRound: 0,
    };
    let combatResult: CombatResult;
    let resultat: RoundResult[];

    for (let i = 0; i < nbOfSimul; i++) {
        const attacker: UnitProfile[] = [new UnitProfile(UnitListV2[0])];
        const defender: UnitProfile[] = [new UnitProfile(UnitListV2[1])];

        resultat = new Combat(attacker, defender).simulateCombat();
        combatResult = {
            _id: i,
            winner: resultat[resultat.length - 1].outcome,
            numberOfRounds: resultat[resultat.length - 1].round,
            //combat: resultat,
        };
        simulationResult.simulation.push(combatResult);
    }

    const lgt = simulationResult.simulation.length;
    simulationResult.avgAtkWiner =
        simulationResult.simulation.reduce((acc, obj) => acc + (obj.winner === EOutcome.attackerWin ? 100 : 0), 0) /
        lgt;
    simulationResult.avgDefWiner =
        simulationResult.simulation.reduce((acc, obj) => acc + (obj.winner === EOutcome.attackerWin ? 0 : 100), 0) /
        lgt;
    simulationResult.avgRound = simulationResult.simulation.reduce((acc, obj) => acc + obj.numberOfRounds, 0) / lgt;

    fs.writeFileSync(`simulation_result.json`, JSON.stringify(simulationResult));
};

const main = () => {
    singleCombat();
    simulation(10000);
};

main();
