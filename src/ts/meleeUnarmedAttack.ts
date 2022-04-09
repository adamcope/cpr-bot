const { attackDmg } = require("../modules/mechanics");
const skillCheck = require("../modules/skillCheck");
const lib = require("./library");

function meleeUnarmedAttack(pc: typeof PC, weapon: Array<string>) {
  try {
    const weaponRef: string = weapon.join("_").toLowerCase();
    const weaponInfo: typeof PC.weapons[0] = pc.weapons.find(
      (x: any) => x.ref == weaponRef
    )!;

    const sc: SC = skillCheck(pc, ['brawling']);
    const atk = {
      sc: sc,
      weapon: {
        name: weaponInfo.name,
        rof: weaponInfo.rof,
      },
      dmg: 0, // create dmg function
    };

    return atk;
  } catch (error) {
    return undefined;
  }
}

module.exports = meleeUnarmedAttack;

export {};
