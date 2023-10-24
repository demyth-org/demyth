import { attackers, defenders, UnitProfile } from "./inputs";

// Function to calculate attack damage
function calculateAttackDamage(attacker: UnitProfile, defender: UnitProfile): number {
    // Define constants for damage calculation
    const BASE_DAMAGE = 10; // Adjust this as needed
    const CRITICAL_HIT_MULTIPLIER = 2; // Adjust this as needed

    // Calculate the base damage based on attacker's strength
    let baseDamage = BASE_DAMAGE + attacker.strength * 2;

    // Apply critical hit chance (optional, based on luck or other factors)
    const criticalHitChance = attacker.luck * 2; // Adjust this as needed
    const isCriticalHit = Math.random() < criticalHitChance / 100;

    if (isCriticalHit) {
        baseDamage *= CRITICAL_HIT_MULTIPLIER;
    }

    // Apply defender's armor and constitution
    const damageReduction = defender.constitution * 0.1; // Adjust this as needed
    const finalDamage = Math.max(baseDamage - defender.armor * 0.1 - damageReduction, 0);

    return Math.round(finalDamage);
}

// Function to perform an attack action
function performAttack(attacker: UnitProfile, defender: UnitProfile): void {
    const damage = calculateAttackDamage(attacker, defender);

    // Apply damage to defender
    defender.constitution -= damage; // Assuming units have a 'health' attribute
}

// Function to determine the best action for a unit
function determineBestAction(unit: UnitProfile, enemyTeam: UnitProfile[], enemySize: number): void {
    //Determine who will be hit first
    const target = Math.floor(Math.random() * enemySize);
    performAttack(unit, enemyTeam[target]);

    // Based on roleType and roleSubType, decide whether to attack, defend, or use special ability
    // Consider enemy team composition, remaining health, unit roles, etc.
    // Call corresponding functions (performAttack, performDefend, performSpecialAbility)
    // ...
}

// Function to simulate a turn for a team
function simulateTurn(activeTeam: UnitProfile[], enemyTeam: UnitProfile[]): void {
    activeTeam.forEach((unit) => {
        determineBestAction(unit, enemyTeam, enemyTeam.length);
    });
}
// Main battle simulation function
function simulateBattle(teamA: UnitProfile[], teamB: UnitProfile[]): string {
    let activeTeam = teamA;
    let enemyTeam = teamB;
    let i = 1;
    while (teamA.length > 0 && teamB.length > 0 && i <= 12) {
        simulateTurn(activeTeam, enemyTeam);

        // Swap active and enemy teams
        [activeTeam, enemyTeam] = [enemyTeam, activeTeam];
        i++;
    }

    return teamA.length === 0 ? "Team B wins!" : "Team A wins!";
}

// Simulate the battle
const result = simulateBattle(attackers, defenders);
console.log(result);
