const { hitCheck, dvIndex, attackDmg } = require("../modules/mechanics");
const skillCheck = require("../modules/skillCheck");
const lib = require("./library");

/**
 * @param {typeof PC} pc ``await Character.findOne({userID:`${interaction.member.id}`}).lean();``
 * @param {number} distance ``interaction.options.getInteger("distance")``
 */
function rangedAttack(pc: typeof PC, weapon: Array<string>, distance: number, target: string) {
  try {
    
  const weaponRef: string = weapon.join("_").toLowerCase();

    const weaponInfo = pc.weapons.find((x: any) => x.ref == weaponRef)!;

    const ammoInfo = lib.ammo.find((x: any) => x.name == weaponInfo.ammoLoaded);
    const weaponSkill: Array<string> = weaponInfo.skillName
      .toLowerCase()
      .split(" ");
    const index: number = dvIndex(distance);

    const sc: SC = skillCheck(pc, weaponSkill);
    const dv: number = weaponInfo.rangeDV[index];

    const atk = {
      sc: sc,
      dv: dv,
      weapon: {
        name: weaponInfo.name,
        rof: weaponInfo.rof,
        isAutofire: weaponInfo.isAutofire,
        afMultiplier: weaponInfo.afMultiplier,
        ammo: {
          count: weaponInfo.ammo,
          loaded: weaponInfo.ammoLoaded,
          effect: ammoInfo.effect,
        },
      },
      isHit: hitCheck(dv, sc.roll.result),
      dmg: attackDmg(weaponInfo.dmg, target),
    };

    return atk;
  } catch (error) {
    return undefined
  }
}

module.exports = rangedAttack;

export {};
