/* interface Unit {
    name: string;
    hull: number;
    shielding: number;
    weaponry: number;
    rapidFire: number;
}

interface DefensiveStructure extends Unit {}

interface Fleet {
    attacker: Unit[];
    defender: Unit[];
    defensiveStructures: DefensiveStructure[];
}

function getRandomTarget(units: Unit[]): Unit {
    const randomIndex = Math.floor(Math.random() * units.length);
    return units[randomIndex];
}

function calculateAttackDamage(attacker: Unit, defender: Unit): void {
    const damage = Math.max(attacker.weaponry - defender.shielding, 0);

    defender.hull = Math.max(defender.hull - damage, 0);

    if (defender.hull === 0) {
        // Defender is destroyed
        const index =
            defender === fleet.defender
                ? fleet.defender.indexOf(defender)
                : fleet.defensiveStructures.indexOf(defender);
        if (index !== -1) {
            if (defender === fleet.defender) {
                fleet.defender.splice(index, 1);
            } else {
                fleet.defensiveStructures.splice(index, 1);
            }
        }
    }
}

function simulateRound(fleet: Fleet): void {
    const allUnits = [...fleet.attacker, ...fleet.defender, ...fleet.defensiveStructures];

    allUnits.forEach((unit) => {
        const target = getRandomTarget(unit === fleet.attacker ? fleet.defender : fleet.attacker);
        calculateAttackDamage(unit, target);

        if (unit.rapidFire > 1) {
            const rapidFireChance = (unit.rapidFire - 1) / unit.rapidFire;
            if (Math.random() < rapidFireChance) {
                const newTarget = getRandomTarget(unit === fleet.attacker ? fleet.defender : fleet.attacker);
                calculateAttackDamage(unit, newTarget);
            }
        }
    });
}

function simulateCombat(fleet: Fleet): string {
    for (let i = 0; i < 6; i++) {
        simulateRound(fleet);

        if (fleet.attacker.length === 0) {
            return "Defender wins!";
        }

        if (fleet.defender.length === 0 && fleet.defensiveStructures.length === 0) {
            return "Attacker wins!";
        }
    }

    return "Draw!";
}

// Example usage:

const attacker: Unit[] = [
    { name: "Cruiser", hull: 2700, shielding: 50, weaponry: 400, rapidFire: 1 },
    // Add more attacker units as needed
];

const defender: Unit[] = [
    { name: "Missile Launcher", hull: 200, shielding: 20, weaponry: 80, rapidFire: 1 },
    { name: "Missile Launcher", hull: 200, shielding: 20, weaponry: 80, rapidFire: 1 },
    { name: "Heavy Laser", hull: 800, shielding: 100, weaponry: 250, rapidFire: 1 },
    // Add more defender units as needed
];

const defensiveStructures: DefensiveStructure[] = [
    // Add defensive structures as needed
];

const fleet: Fleet = { attacker, defender, defensiveStructures };

const result = simulateCombat(fleet);
console.log(result);
 */
