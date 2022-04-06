"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
/**
 *
 * @param weapon Weapon object received from ranged attack.
 * @returns
 */
function suppressiveFire(weapon) {
    const suppressiveFire = {
        displayText: `Everyone on foot within 25 m/yds, out of cover, and in your line of sight must roll ${(0, builders_1.bold)("WILL + Concentration + 1d10")} against your Skill Check result above.\n
      Anyone that fails must use their next Move Action to get into cover. If that Move Action would be insufficient to get into cover, they must also use the Run Action to get into cover or as close to cover as possible.`,
        newAmmoCount: weapon.ammo - 10,
    };
    return suppressiveFire;
}
module.exports = suppressiveFire;
