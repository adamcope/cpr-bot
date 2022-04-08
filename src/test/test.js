const pc = require("../JSON/testPC.json");
const sc = require("../modules/skillCheck.js");
const sr = require("../modules/statD10");
const ra = require("../modules/rangedAttack");
const rl = require("../modules/reload");
const la = require("../modules/loadAmmo");
const mwa = require("../modules/meleeWeaponAttack")

const genArch = require("../modules/netArchitecture.js")

const skillCheck = sc(pc, ["stealth"]);
const statCheck = sr(pc, "dex");
const rangedAttack = ra(pc, ["smg"], 12);
const reload = rl(pc, ["smg"]);
const load = la(pc, ['bow'], ['biotoxin', 'arrow'])

const meleeWeapon = mwa(pc, ['medium', 'melee', 'weapon']);


const netArchitecture = genArch(3, 'standard')

console.log(skillCheck);
console.log(statCheck);
console.log(rangedAttack);
console.log(reload);
console.log(load);
console.log(netArchitecture)
console.log(meleeWeapon)