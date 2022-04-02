"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { hitCheck, dvIndex, attackDmg } = require("../modules/mechanics");
const skillCheck = require("../modules/skillCheck");
const library_1 = __importDefault(require("./library"));
/**
 * @param {*} pc ``await Character.findOne({userID:`${interaction.member.id}`}).lean();``
 * @param {number} distance ``interaction.options.getInteger("distance")``
 */
function rangedAttack(pc, weapon, distance) {
    const weaponRef = weapon.join("_").toLowerCase();
    const weaponInfo = pc.weapons.find((x) => x.ref == weaponRef);
    const ammoInfo = library_1.default.ammo.find((x) => x.name == weaponInfo.ammoLoaded);
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
