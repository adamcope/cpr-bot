const pc = require("../JSON/testPC.json");
const sc = require("../modules/skillCheck.js");
const sr = require("../modules/statD10");
const ra = require("../modules/rangedAttack");
const rl = require("../modules/reload");
const la = require("../modules/loadAmmo");

const skillCheck = sc(pc, ["stealth"]);
const statCheck = sr(pc, "dex");
const rangedAttack = ra(pc, ["smg"], 12);
const reload = rl(pc, ["smg"]);
const load = la(pc, ['bow'], ['biotoxin', 'arrow'])

console.log(skillCheck.roll.display);
console.log(statCheck.display);
console.log(rangedAttack.sc.roll.display);
console.log(reload.loaded.name);
console.log(load);
