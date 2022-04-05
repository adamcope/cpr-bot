import { bold } from "@discordjs/builders";
const lib = require("./library");

/**
 *
 * @param { Object } pc ``await Character.findOne({userID:`${interaction.member.id}`}).lean();``
 * @param { Array<string> } arr ``interaction.options.getString("skill")``
 * @returns
 */
function skillCheck(
  pc: any,
  arr: Array<string>
): {
  skill: { name: string; value: any };
  stat: { name: any; value: any; modifier: any };
  roll: { display: string; result: any };
} {
  let d10x1 = Math.floor(Math.random() * 10) + 1;
  let d10x2 = Math.floor(Math.random() * 10) + 1;
  const display = (d10: number) => {
    if (d10 == 10) {
      return `🎲 ${d10x1} + 🎲 ${d10x2}`;
    } else {
      return `🎲 ${d10x1}`;
    }
  };

  const result = (d10: number): number => {
    if (d10 == 10) {
      return d10x1 + d10x2;
    } else {
      return d10x1;
    }
  };

  let d10CritMsg = (d10: number) => {
    if (d10 === 10) {
      return `${bold("CRITICAL ROLL!")}`;
    } else {
      return "";
    }
  };

  const skillref = arr.join("_");
  const statref = lib.skillstat.find((x: any) => x.name == skillref);

  let capitalize = [];
  for (let i = 0; i < arr.length; i++)
    capitalize.push(arr[i].charAt(0).toUpperCase() + arr[i].slice(1));

  const skill = {
    name: capitalize.join(" "),
    value: pc.skills[skillref],
  };

  const stat = {
    name: statref.stat.toUpperCase(),
    value: pc.stats[statref.stat][0],
    modifier: pc.stats[statref.stat][1],
  };

  const statModifier = (mod: number) => {
    if (mod == 0) {
      return "";
    } else {
      return `- ${mod}`;
    }
  };

  let roll = {
    display: `[${stat.name}] ${stat.value} ${statModifier(stat.modifier)} + [${
      skill.name
    }] ${skill.value} + ${display(d10x1)} = ${
      stat.value + skill.value + result(d10x1)
    } ${d10CritMsg(d10x1)}`,
    result: stat.value - stat.modifier + skill.value + result(d10x1),
  };

  const obj: SC = {
    skill: skill,
    stat: stat,
    roll: roll,
  };

  return obj;
}

module.exports = skillCheck;

export {};