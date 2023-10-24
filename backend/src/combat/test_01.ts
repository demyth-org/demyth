/*** In this test:
 * - attacker start first
 * - ranged
 * - magic
 * - melee
 * - 6 rounds : A w or Draw or D w
 */
/*

import { attacker, defender } from "./inputs";


type UnitProfile = typeof attacker | typeof defender;




function hitSuccessful(attacker: UnitProfile, defender: UnitProfile): boolean {
    const requiredRoll = 7 - (defender.dexterity - attacker.weaponSkill);
    const roll = Math.floor(Math.random() * 6) + 1; // Roll a six-sided die
    return roll >= requiredRoll;
}

function woundSuccessful(attacker: UnitProfile, defender: UnitProfile): boolean {
    const requiredRoll = attacker.strength >= defender.toughness ? 2 : 4;
    const roll = Math.floor(Math.random() * 6) + 1;
    return roll >= requiredRoll;
}

function saveSuccessful(attacker: UnitProfile, defender: UnitProfile): boolean {
    const roll = Math.floor(Math.random() * 6) + 1;
    return roll >= defender.armorSave;
}

function resolveCombat(attacker: UnitProfile, defender: UnitProfile): void {
    // ranged
	if(attacker.roleType === "Ranged"){
		hitSuccessful(attacker, defender)
	}
	// magic
    // melee
}

resolveCombat(attackerProfile, defenderProfile);

console.log(`Defender's wounds after combat: ${defenderProfile.wounds}`);
 */
