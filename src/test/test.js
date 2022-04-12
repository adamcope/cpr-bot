const pc = require("../JSON/testPC.json");
const sc = require("../modules/skillCheck.js");
const sr = require("../modules/statD10");
const ra = require("../modules/rangedAttack");
const rl = require("../modules/reload");
const la = require("../modules/loadAmmo");
const mwa = require("../modules/meleeWeaponAttack");
const mongoose = require("mongoose");
const Character = require("../models/playerCharacter.js");

const genArch = require("../modules/netArchitecture.js");
const netArchitecture = genArch(3, "standard");

const pswdDV6 = {
  id: 'pswdDV6',
  name: 'Password',
  dv: 6,
  type: 0,
  floor: 0
}

const schreber = {
  id: 0001,
  name: Schreber,
  interface: 4,
  floor: 0
}

const net ={
  floors: [{floor: 0, contents:[pswdDV6, schreber ], DV:6 }],
  netrunners: [{floor: 0, id: 0001, name: 'Schreber'}]
}

console.log(netArchitecture);


// dbLogin = async () => {
//   await mongoose.connect(
//     "mongodb+srv://bot:Jnx9iBH15sJ922SM@cluster0.pc4ut.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//     {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     }
//   );
// };
// dbLogin();

// const ammoshoot = async () => {
//   const pc = await Character.findOne({
//     userID: `558698466914861057`,
//   });
  
//   const index = pc.weapons.findIndex((x) => x.name == "SMG");

//   pc.weapons[index].ammo = pc.weapons[index].ammo - 10;
//   await pc.save();
//   console.log(pc.ammo[0].ref);
// };
// ammoshoot();
// console.log(skillCheck);
// console.log(statCheck);
// console.log(rangedAttack);
// console.log(reload);
// console.log(load);
// console.log(meleeWeapon);

// const skillCheck = sc(pc, ["stealth"]);
// const statCheck = sr(pc, "dex");
// const rangedAttack = ra(pc, ["smg"], 12);
// console.log(rangedAttack)
// const reload = rl(pc, ["smg"]);
// const load = la(pc, ["bow"], ["biotoxin", "arrow"]);

// const meleeWeapon = mwa(pc, ["medium", "melee", "weapon"]);

