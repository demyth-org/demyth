import {
    BASE_CRIT_MULTIPLIER,
    BASE_DAMAGE,
    BASE_DAMAGE_BONUS,
    MAX_CRIT_CHANCE,
    MIN_CRIT_CHANCE,
    UnitListV2,
    clamp,
    getRandomIntInclusive,
    tUnitProfileV2,
} from "./inputs";

class Stats {
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

class UnitProfile extends GeneralUnit {
    public name: string;
    public roleType: string;
    public roleSubType: string;

    public bStats: Stats;

    public vigor: number;
    public dexterity: number;
    public mind: number;
    public energy: number;
    public initiative: number;

    public mythology: string;
    public god: string;

    public life: number;
    public previousLife: number;

    constructor(unit: tUnitProfileV2) {
        super();
        const { name, roleType, roleSubType, stats, mythology, god } = unit;

        this.name = name;
        this.roleType = roleType;
        this.roleSubType = roleSubType;

        this.bStats = new Stats(stats);

        this.mythology = mythology;
        this.god = god;

        this.determineBonusFromGod();
    }

    //add : getBaseDamageFlat
    //mult : getBaseDamageBonus
    // xxx: damageBonus ex: zeus vs odin 2% dmg output
    public determineBonusFromGod() {
        this.bStats.addModifier(this.god, {
            add: {
                vigor: 5,
            },
        });

        this.bStats.printStat("vigor");
    }

    // (Base damage + vigor) x baseBamageBonus/100 + flatBaseDamage
    public calcBaseDamage(): number {
        return ((this.getBaseDamage() + this.vigor) * this.getBaseDamageBonus()) / 100 + this.getBaseDamageFlat();
    }

    // getCritChance(luck) + critChanceBonus
    public calcCritChance(critChanceBonus = 0): number {
        return this.getCritChance(this.dexterity) + critChanceBonus;
    }

    // getCritMutiplier + critMultiplierBonus
    public calcCritMultiplier(critModifierBonus = 0): number {
        return Math.round((this.getCritMultiplier() + critModifierBonus) / 100);
    }

    public calcDamageBonus(): number {
        return 0;
    }

    public calcReductionDamageBonus(): number {
        return 0;
    }

    // TODO
    // Get armor from where? standard type: one with a shield? take other stats into account like agility from dexterity and something else? vitess?
    public calcDefense(ennemyRoleType: string, defenseModifierBonus?: number): number {
        if (ennemyRoleType !== "Mage") return this.vigor / 100 + (defenseModifierBonus ?? 0);
        return 0;
    }

    // TODO
    // if magic of type : res + get something else than just int?
    public calcMagicRes(ennemyRoleType: string, resMagiqueModifierBonus?: number): number {
        if (ennemyRoleType == "Mage") return this.mind / 100 + (resMagiqueModifierBonus ?? 0);
        return 0;
    }

    public updateLife(life: number): void {
        this.previousLife = this.life;
        this.life = life;
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
        console.log(`\n1) getRandomTarget : Atk: ${atk?.name} vs Def: ${def?.name}`);
        /* console.log(
            `\n 1) getRandomTarget`,
            `\n Atk: ${atk.name} of role ${atk.roleType} and subrole ${atk.roleSubType}`,
            `\n \t <== vs ==>`,
            `\n Def: ${def.name} of role ${def.roleType} and subrole ${def.roleSubType}`,
        ); */
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
            console.log(" * crit ", crit);
        }

        // Calc bonus damage
        const dmgBonus = attacker.calcDamageBonus();

        // Calc target reduction damage
        const targetReductionDmgBonus = defender.calcReductionDamageBonus();
        console.log(" * (1 + dmgBonus - targetReductionDmgBonus) ", dmgBonus, targetReductionDmgBonus);

        // Calc target physical defense
        const targetDef = defender.calcDefense(attacker.roleType);
        console.log(" * (1 - targetDef) ", targetDef);

        // Calc target magic resistance
        const targetMagicRes = defender.calcMagicRes(attacker.roleType);
        console.log(" * (1 - targetMagicRes) ", targetMagicRes);

        // Calc final damage
        const finalDamage =
            baseDamage * crit * (1 + dmgBonus - targetReductionDmgBonus) * (1 - targetDef) * (1 - targetMagicRes);
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

        // Units will attack by Intelligence desc at each round
        allUnits.sort((unitA, unitB) => unitB.mind - unitA.mind);

        try {
            allUnits.forEach((unit) => {
                // Get target
                const isAttacker = this.attacker.includes(unit);
                const target = this.getRandomTarget(isAttacker ? this.defender : this.attacker);
                this.printRandomTarget(unit, target);

                // Calc damage
                const dmg = this.calculateDamage(unit, target);

                // Calc wounds
                const wounds = target.life - dmg;
                if (wounds > 0) {
                    target.updateLife(wounds);
                    console.log(
                        `3) wounds : ${unit.name} inflicted ${dmg} damages to ${target.name}. Remaining HP: ${target.life}`,
                        `\n ____`,
                    );
                } else {
                    // Target is destroyed
                    target.updateLife(0);
                    // const extraWounds = Math.abs(wounds);
                    console.log(
                        `3) wounds : ${unit.name} killed ${target.name} by inflicting ${dmg} dmg / ${target.previousLife} HP.`,
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

// Example usage:

const attacker: UnitProfile[] = [new UnitProfile(UnitListV2[0])];
const defender: UnitProfile[] = [new UnitProfile(UnitListV2[1])];
const combat = new Combat(attacker, defender);

const result = combat.simulateCombat();
console.log(result);
