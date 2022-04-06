"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
/**
 *
 * @param pc
 * @param stat
 * @returns
 */
function statD10(pc, stat) {
    let d10x1 = Math.floor(Math.random() * 10) + 1;
    let d10x2 = Math.floor(Math.random() * 10) + 1;
    const d10Display = (d10) => {
        if (d10 == 10) {
            return `🎲 ${d10x1} + 🎲 ${d10x2}`;
        }
        else {
            return `🎲 ${d10x1}`;
        }
    };
    const d10Result = (d10) => {
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
    const statName = stat.toUpperCase();
    const statValue = pc.stats[stat][0];
    const statModifier = pc.stats[stat][1];
    const rollResult = (statValue - statModifier) + d10Result(d10x1);
    const rollDisplay = `${(0, builders_1.bold)(statName)} ${statValue - statModifier} + ${d10Display(d10x1)}`;
    const critMsg = `${d10CritMsg(d10x1)}`;
    const x = {
        stat: statName,
        value: statValue,
        modifier: statModifier,
        display: rollDisplay,
        result: rollResult,
        critMsg: critMsg
    };
    return x;
}
module.exports = statD10;
