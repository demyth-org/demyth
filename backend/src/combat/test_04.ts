class Unit {
    name: string;
    hull: number;
    shielding: number;
    weaponry: number;
    rapidFire: number;

    constructor(name: string, hull: number, shielding: number, weaponry: number, rapidFire: number) {
        this.name = name;
        this.hull = hull;
        this.shielding = shielding;
        this.weaponry = weaponry;
        this.rapidFire = rapidFire;
    }
}

class DefensiveStructure extends Unit {}

class Fleet {
    attacker: Unit[];
    defender: Unit[];
    defensiveStructures: DefensiveStructure[];

    constructor(attacker: Unit[], defender: Unit[], defensiveStructures: DefensiveStructure[]) {
        this.attacker = attacker;
        this.defender = defender;
        this.defensiveStructures = defensiveStructures;
    }

    getRandomTarget(units: Unit[]): Unit {
        const randomIndex = Math.floor(Math.random() * units.length);
        return units[randomIndex];
    }

    calculateAttackDamage(attacker: Unit, defender: Unit): void {
        const damage = Math.max(attacker.weaponry - defender.shielding, 0);

        defender.hull = Math.max(defender.hull - damage, 0);

        if (defender.hull === 0) {
            // Defender is destroyed
            const index =
                defender === this.defender
                    ? this.defender.indexOf(defender)
                    : this.defensiveStructures.indexOf(defender);
            if (index !== -1) {
                if (defender === this.defender) {
                    this.defender.splice(index, 1);
                } else {
                    this.defensiveStructures.splice(index, 1);
                }
            }
        }
    }

    simulateRound(): void {
        const allUnits = [...this.attacker, ...this.defender, ...this.defensiveStructures];

        allUnits.forEach((unit) => {
            const target = this.getRandomTarget(unit === this.attacker ? this.defender : this.attacker);
            this.calculateAttackDamage(unit, target);

            if (unit.rapidFire > 1) {
                const rapidFireChance = (unit.rapidFire - 1) / unit.rapidFire;
                if (Math.random() < rapidFireChance) {
                    const newTarget = this.getRandomTarget(unit === this.attacker ? this.defender : this.attacker);
                    this.calculateAttackDamage(unit, newTarget);
                }
            }
        });
    }

    simulateCombat(): string {
        for (let i = 0; i < 6; i++) {
            this.simulateRound();

            if (this.attacker.length === 0) {
                return "Defender wins!";
            }

            if (this.defender.length === 0 && this.defensiveStructures.length === 0) {
                return "Attacker wins!";
            }
        }

        return "Draw!";
    }
}

// Example usage:

const attacker: Unit[] = [
    new Unit("Cruiser", 2700, 50, 400, 1),
    // Add more attacker units as needed
];

const defender: Unit[] = [
    new Unit("Missile Launcher", 200, 20, 80, 1),
    new Unit("Missile Launcher", 200, 20, 80, 1),
    new Unit("Heavy Laser", 800, 100, 250, 1),
    // Add more defender units as needed
];

const defensiveStructures: DefensiveStructure[] = [
    // Add defensive structures as needed
];

const fleet = new Fleet(attacker, defender, defensiveStructures);

const result = fleet.simulateCombat();
console.log(result);
