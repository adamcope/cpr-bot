const { attackDmg } = require("../modules/mechanics");
const skillCheck = require("../modules/skillCheck");
const lib = require("./library");

function meleeUnarmedAttack(pc: typeof PC) {
  try {
    function unarmedDmgRoll(body: number) {
      if (body == 4) {
        return "1d6";
      } else if (body < 7) {
        return "2d6";
      } else if (body < 10) {
        return "3d6";
      } else if (body > 10) {
        return "4d6";
      } else {
        return 0;
      }
    }

    const dmg = attackDmg(unarmedDmgRoll(pc.stats.body[0] - pc.stats.body[1]));

    const sc: SC = skillCheck(pc, ["brawling"]);
    const atk = {
      sc: sc,
      dmg: dmg,
    };

    return atk;
  } catch (error) {
    return undefined;
  }
}

module.exports = meleeUnarmedAttack;

export {};
