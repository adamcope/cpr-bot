
const { hitCheck, dvIndex, attackDmg } =  require( "../modules/mechanics");
const skillCheck = require("../modules/skillCheck");
const lib = require("./library");

/**
 * @param {*} pc ``await Character.findOne({userID:`${interaction.member.id}`}).lean();``
 * @param {number} distance ``interaction.options.getInteger("distance")`` 
 */
function rangedAttack(pc: any, weapon: Array<string>, distance: number) {
  
  interface SC {
        skill: {
            name: string;
            value: number;
        };
        stat: {
            name: string;
            value: number;
            modifier: number;
        };
        roll: {
            display: string;
            result: number;
        };
  }

  const weaponRef: string = weapon.join("_").toLowerCase()
  const weaponInfo = pc.weapons.find((x: any) => x.ref == weaponRef)
  const ammoInfo = lib.ammo.find((x: any) => x.name == weaponInfo.ammoLoaded)
  const weaponSkill: Array<string> = weaponInfo.skillName.toLowerCase().split(" ");
  const index: number = dvIndex(distance);

  const sc: SC = skillCheck(pc, weaponSkill);
  const dv: number = weaponInfo.rangeDV[index];

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

export {};