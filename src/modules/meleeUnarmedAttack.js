"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { attackDmg } = require("../modules/mechanics");
const skillCheck = require("../modules/skillCheck");
const lib = require("./library");
function meleeUnarmedAttack(pc, weapon) {
    try {
        const weaponRef = weapon.join("_").toLowerCase();
        const weaponInfo = pc.weapons.find((x) => x.ref == weaponRef);
        const sc = skillCheck(pc, ['brawling']);
        const atk = {
            sc: sc,
            weapon: {
                name: weaponInfo.name,
                rof: weaponInfo.rof,
            },
            dmg: 0, // create dmg function
        };
        return atk;
    }
    catch (error) {
        return undefined;
    }
}
module.exports = meleeUnarmedAttack;
