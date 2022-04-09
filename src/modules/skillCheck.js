"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const lib = require("./library");
/**
 *
 * @param { Object } pc ``await Character.findOne({userID:`${interaction.member.id}`}).lean();``
 * @param { Array<string> } arr ``interaction.options.getString("skill")``
 * @returns
 */
function skillCheck(pc, arr) {
    try {
        let d10x1 = Math.floor(Math.random() * 10) + 1;
        let d10x2 = Math.floor(Math.random() * 10) + 1;
        const display = (d10) => {
            if (d10 == 10) {
                return `🎲 ${d10x1} + 🎲 ${d10x2}`;
            }
            else {
                return `🎲 ${d10x1}`;
            }
        };
        const result = (d10) => {
            if (d10 == 10) {
                return d10x1 + d10x2;
            }
            else {
                return d10x1;
            }
        };
        let d10CritMsg = (d10) => {
            if (d10 === 10) {
                return `${(0, builders_1.italic)("CRITICAL ROLL!")}`;
            }
            else {
                return "";
            }
        };
        const skillref = arr.join("_");
        const statref = lib.skillstat.find((x) => x.name == skillref);
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
        const statModifier = (mod) => {
            if (mod == 0) {
                return "";
            }
            else {
                return `- ${mod}`;
            }
        };
        let d10 = {
            display: display(d10x1),
            result: result(d10x1),
        };
        let roll = {
            display: `${(0, builders_1.bold)(stat.name)} ${stat.value} ${statModifier(stat.modifier)} + ${(0, builders_1.bold)(skill.name)} ${skill.value} + ${display(d10x1)}`,
            result: stat.value - stat.modifier + skill.value + result(d10x1),
            critMsg: `${d10CritMsg(d10x1)}`,
        };
        const obj = {
            skill: skill,
            stat: stat,
            d10: d10,
            roll: roll,
        };
        return obj;
    }
    catch (error) {
        return undefined;
    }
}
module.exports = skillCheck;
