"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { attackDmg } = require("../modules/mechanics");
const skillCheck = require("../modules/skillCheck");
const lib = require("./library");
function meleeWeaponAttack(pc, weapon) {
    try {
        const weaponRef = weapon.join("_").toLowerCase();
        const weaponInfo = pc.weapons.find((x) => x.ref == weaponRef);
        const sc = skillCheck(pc, ["melee", "weapon"]);
        const atk = {
            sc: sc,
            weapon: {
                name: weaponInfo.name,
                rof: weaponInfo.rof,
            },
            dmg: attackDmg(weaponInfo.dmg),
        };
        return atk;
    }
    catch (error) {
        return undefined;
    }
}
module.exports = meleeWeaponAttack;
