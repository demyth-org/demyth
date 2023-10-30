import {
    BASE_CRIT_MULTIPLIER,
    BASE_DAMAGE,
    BASE_DAMAGE_BONUS,
    MAX_CRIT_CHANCE,
    MIN_CRIT_CHANCE,
    UnitList,
    clamp,
    getRandomIntInclusive,
    tUnitProfile,
} from "./inputs";

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
    public strength: number;
    public dexterity: number;
    public intelligence: number;
    public constitution: number;
    public luck: number;
    public armor: number;
    public mythology: string;
    public god: string;

    public life: number;
    public previousLife: number;

    constructor(unit: tUnitProfile) {
        super();
        const {
            name,
            roleType,
            roleSubType,
            strength,
            dexterity,
            intelligence,
            constitution,
            luck,
            armor,
            mythology,
            god,
        } = unit;

        this.name = name;
        this.roleType = roleType;
        this.roleSubType = roleSubType;
        this.strength = strength;
        this.dexterity = dexterity;
        this.intelligence = intelligence;
        this.constitution = constitution;
        this.luck = luck;
        this.armor = armor;
        this.mythology = mythology;
        this.god = god;

        this.life = constitution;
        this.previousLife = constitution;
    }

    // (Base damage + strength) x baseBamageBonus/100 + flatBaseDamage
    public calcBaseDamage(): number {
        return ((this.getBaseDamage() + this.strength) * this.getBaseDamageBonus()) / 100 + this.getBaseDamageFlat();
    }

    // getCritChance(luck) + critChanceBonus
    public calcCritChance(critChanceBonus = 0): number {
        return this.getCritChance(this.luck) + critChanceBonus;
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

    public calcDefense(): number {
        return 0;
    }

    public calcMagicRes(): number {
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
        console.log(`\n1) getRandomTarget : Atk: ${atk.name} vs Def: ${def.name}`);
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
        const targetDef = defender.calcDefense();
        console.log(" * (1 - targetDef) ", targetDef);

        // Calc target magic resistance
        const targetMagicRes = defender.calcMagicRes();
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

        // TODO: Order by intelligence?
        allUnits.forEach((unit) => {
            // Get target
            const isAttacker = this.attacker.includes(unit);
            const target = this.getRandomTarget(isAttacker ? this.defender : this.attacker);
            this.printRandomTarget(unit, target);

            // Calc damage
            const dmg = this.calculateDamage(unit, target);

            // Calc wounds
            const wounds = target.life - dmg;
            let extraWounds: number;

            if (wounds > 0) {
                target.updateLife(wounds);
                console.log(
                    `3) wounds : ${unit.name} inflicted ${dmg} damages to ${target.name}. Remaining HP: ${target.life}`,
                    `\n ____`,
                );
            } else {
                // Target is destroyed
                target.updateLife(0);
                extraWounds = Math.abs(wounds);
                console.log(
                    `3) wounds : ${unit.name} killed ${target.name} by inflicting ${dmg} dmg / ${target.previousLife} HP.`,
                    `\n ____`,
                );

                const index = isAttacker ? this.defender.indexOf(target) : this.attacker.indexOf(target);
                if (index !== -1) {
                    // Splice from allUnits
                    const allUnitsIndex = allUnits.indexOf(target);
                    allUnitsIndex !== -1 && allUnits.splice(allUnitsIndex, 1);
                    // Splice from this.def or this.att
                    if (isAttacker) this.defender.splice(index, 1);
                    else this.attacker.splice(index, 1);
                }

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
        });
    }

    public simulateCombat(): string {
        for (let i = 0; i < 6; i++) {
            this.simulateRound(i + 1);

            if (this.attacker.length === 0) {
                return "Defender wins!";
            } else if (this.defender.length === 0) {
                return "Attacker wins!";
            }
        }
        return "Draw!";
    }
}

// Example usage:

const attacker: UnitProfile[] = [new UnitProfile(UnitList[0])];
const defender: UnitProfile[] = [new UnitProfile(UnitList[1]), new UnitProfile(UnitList[2])];
const combat = new Combat(attacker, defender);

const result = combat.simulateCombat();
console.log(result);
