"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { hitCheck, dvIndex, attackDmg } = require("../modules/mechanics");
const skillCheck = require("../modules/skillCheck");
const lib = require("./library");
/**
 * @param {typeof PC} pc ``await Character.findOne({userID:`${interaction.member.id}`}).lean();``
 * @param {number} distance ``interaction.options.getInteger("distance")``
 */
function rangedAttack(pc, weapon, distance) {
    const weaponRef = weapon.join("_").toLowerCase();
    const weaponInfo = pc.weapons.find((x) => x.ref == weaponRef);
    const ammoInfo = lib.ammo.find((x) => x.name == weaponInfo.ammoLoaded);
    const weaponSkill = weaponInfo.skillName.toLowerCase().split(" ");
    const index = dvIndex(distance);
    const sc = skillCheck(pc, weaponSkill);
    const dv = weaponInfo.rangeDV[index];
    const atk = {
        sc: sc,
        dv: dv,
        weapon: {
            name: weaponInfo.name,
            rof: weaponInfo.rof,
            ammo: {
                count: weaponInfo.ammo,
                loaded: weaponInfo.ammoLoaded,
                effect: ammoInfo.effect
            }
        },
        isHit: hitCheck(dv, sc.roll.result),
        dmg: attackDmg(weaponInfo.dmg),
    };
    return atk;
}
module.exports = rangedAttack;
