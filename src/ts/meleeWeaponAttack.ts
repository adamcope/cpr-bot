const { attackDmg } = require("../modules/mechanics");
const skillCheck = require("../modules/skillCheck");
const lib = require("./library");

function meleeWeaponAttack(pc: typeof PC, weapon: Array<string>) {
  const weaponRef: string = weapon.join("_").toLowerCase();
  const weaponInfo: typeof PC.weapons[0] = pc.weapons.find(
    (x: any) => x.ref == weaponRef
  )!;

  const sc: SC = skillCheck(pc, ["melee", "weapons"]);
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

module.exports = meleeWeaponAttack;

export {};
