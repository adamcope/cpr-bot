const { bold } = require("@discordjs/builders");
const lib = require("./library");

const dvIndex = (distance) => {
  if (distance < 7) {
    return 0;
  } else if (distance < 13) {
    return 1;
  } else if (distance < 26) {
    return 2;
  } else if (distance < 51) {
    return 3;
  } else if (distance < 101) {
    return 4;
  } else if (distance < 200) {
    return 5;
  } else if (distance < 201) {
    return 6;
  } else if (distance < 400) {
    return 7;
  } else {
    return;
  }
};

const hitCheck = (dv, result) => {
  if (dv > result) {
    return false;
  } else {
    return true;
  }
};

critInjuryInfo = [
  {
    target: "body",
    injury: "none",
    effect: `none`,
    quickFix: [{ skill: "N/A", dv: 0 }],
    treatment: [{ skill: "N/A", dv: 0 }],
    stat: "none",
    mod: 0,
    BDSP: 0,
  },
  {
    target: "body",
    injury: "Dismembered Arm",
    effect: `The Dismembered Arm is gone. You drop any items in that dismembered arm's hand immediately. ${bold(
      "Base Death Save Penalty is incereased by 1."
    )}`,
    quickFix: [{ skill: "N/A", dv: 0 }],
    treatment: [{ skill: "Surgery", dv: 17 }],
    stat: "",
    mod: 0,
    BDSP: 1,
  },
  {
    target: "body",
    injury: "Dismembered Hand",
    effect: `The Dismembered Hand is gone. You drop any items in the dismembered hand immediately. ${bold(
      "Base Death Save Penalty is incereased by 1."
    )}`,
    quickFix: [{ skill: "N/A", dv: 0 }],
    treatment: [{ skill: "Suregery", dv: 17 }],
    stat: "",
    mod: 0,
    BDSP: 1,
  },
  {
    target: "body",
    injury: "Collapsed Lung",
    effect: `-2 to MOVE (minimum 1). ${bold(
      "Base Death Penalty Save is increased by 1."
    )}`,
    quickFix: [{ skill: "Paramedic", dv: 15 }],
    treatment: [{ skill: "Surgery", dv: 15 }],
    stat: "",
    mod: 0,
    BDSP: 1,
  },
  {
    target: "body",
    injury: "Broken Ribs",
    effect:
      "At the end of every Turn where you move further than 4m/yds on foot, you re-suffer this Critical Injury's Bonus Damage directly to your Hit Points.",
    quickFix: [{ skill: "Paramedic", dv: 13 }],
    treatment: [
      { skill: "Paramedic", dv: 15 },
      { skill: "Surgery", dv: 13 },
    ],
    stat: "",
    mod: 0,
    BDSP: 0,
  },
  {
    target: "body",
    injury: "Broken Arm",
    effect:
      "The Broken Arm cannot be used. You drop any items in that arm's hand immediately.",
    quickFix: [{ skill: "Paramedic", dv: 13 }],
    treatment: [
      { skill: "Paramedic", dv: 15 },
      { skill: "Surgery", dv: 13 },
    ],
    stat: "",
    mod: 0,
    BDSP: 0,
  },
  {
    target: "body",
    injury: "Foreign Object",
    effect:
      "At the end of every Turn where you move further than 4m/yds on foot, you re-suffer this Critical Injury's Bonus Damage directly to your Hit Points.",
    quickFix: [
      { skill: "First Aid", dv: 13 },
      { skill: "Paramedic", dv: 13 },
    ],
    treatment: [{ skill: "N/A", dv: 0 }],
    stat: "",
    mod: 0,
    BDSP: 0,
  },
  {
    target: "body",
    injury: "Broken Leg",
    effect: "-4 to MOVE (minimum 1)",
    quickFix: [{ skill: "Paramedic", dv: 13 }],
    treatment: [
      { skill: "Paramedic", dv: 15 },
      { skill: "Surgery", dv: 13 },
    ],
    stat: "",
    mod: 0,
    BDSP: 0,
  },
  {
    target: "body",
    injury: "Torn Muscle",
    effect: "-2 to Melee Attacks",
    quickFix: [
      { skill: "First Aid", dv: 13 },
      { skill: "Paramedic", dv: 13 },
    ],
    treatment: [{ skill: "N/A", dv: 0 }],
    stat: "",
    mod: 0,
    BDSP: 0,
  },
  {
    target: "body",
    injury: "Spinal Injury",
    effect: `Next Turn, you cannot take an Action, but you can still take a Move Action. ${bold(
      "Base Death Save Penalty is increased by 1."
    )}`,
    quickFix: [{ skill: "Paramedic", dv: 15 }],
    treatment: [{ skill: "Surgery", dv: 15 }],
    stat: "",
    mod: 0,
    BDSP: 0,
  },
  {
    target: "body",
    injury: "Crushed Fingers",
    effect: "-4 to all Actions involving that hand",
    quickFix: [{ skill: "Paramedic", dv: 13 }],
    treatment: [{ skill: "Surgery", dv: 15 }],
    stat: "",
    mod: 0,
    BDSP: 0,
  },
  {
    target: "body",
    injury: "Dismembered Leg",
    effect: `The Dismembered Leg is gone. -6 to MOVE (minimum 1). You cannot dodge attacks. ${bold(
      "Base Death Penalty Save increased by 1"
    )}`,
    quickFix: [{ skill: "N/A", dv: 0 }],
    treatment: [{ skill: "Surgery", dv: 17 }],
    stat: "",
    mod: 0,
    BDSP: 1,
  },
  {
    target: "head",
    injury: "Lost Eye",
    effect: `The Lost Eye is gone. -4 to Ranged Attacks & Perception Checks involving vision. ${bold(
      "Base Death Save Penalty is increased by 1."
    )}`,
    quickFix: [{ skill: "N/A", dv: 0 }],
    treatment: [{ skill: "Surgery", dv: 17 }],
    stat: "",
    mod: 0,
    BDSP: 1,
  },
  {
    target: "head",
    injury: "Brain Injury",
    effect: `-2 to all Actions. ${bold(
      "Base Death Save Penalty is increased by 1"
    )}`,
    quickFix: [{ skill: "N/A", dv: 0 }],
    treatment: [{ skill: "Sugery", dv: 17 }],
    stat: "",
    mod: 0,
    BDSP: 1,
  },
  {
    target: "head",
    injury: "Damaged Eye",
    effect: "-2 to Ranged Attacks & Perception Checks involving vision.",
    quickFix: [{ skill: "Paramedic", dv: 15 }],
    treatment: [{ skill: "Surgery", dv: 13 }],
    stat: "",
    mod: 0,
    BDSP: 0,
  },
  {
    target: "head",
    injury: "Concussion",
    effect: "-2 to all Actions.",
    quickFix: [
      { skill: "First Aid", dv: 13 },
      { skill: "Paramedic", dv: 13 },
    ],
    treatment: [{ skill: "N/A", dv: 0 }],
    stat: "",
    mod: 0,
    BDSP: 0,
  },
  {
    target: "head",
    injury: "Broken Jaw",
    effect: "-4 to all Actions involving speech.",
    quickFix: [{ skill: "Paramedic", dv: 13 }],
    treatment: [
      { skill: "Paramedic", dv: 13 },
      { skill: "Surgery", dv: 13 },
    ],
    stat: "",
    mod: 0,
    BDSP: 0,
  },
  {
    target: "head",
    injury: "Foreign Object",
    effect:
      "At the end of every Turn where you move further than 4m/yds on foot, you re-suffer this Critical Injury's Bonus Damage directly to your Hit Points.",
    quickFix: [
      { skill: "First Aid", dv: 13 },
      { skill: "Paramedic", dv: 13 },
    ],
    treatment: [{ skill: "N/A", dv: 0 }],
    stat: "",
    mod: 0,
    BDSP: 0,
  },
  {
    target: "head",
    injury: "Whiplash",
    effect: `${bold("Base Death Save Penalty is increased by 1")}`,
    quickFix: [{ skill: "Paramedic", dv: 13 }],
    treatment: [
      { skill: "Paramedic", dv: 13 },
      { skill: "Surgery", dv: 13 },
    ],
    stat: "",
    mod: 0,
    BDSP: 1,
  },
  {
    target: "head",
    injury: "Cracked Skull",
    effect: `Aimed Shots to your head multiply the damage that gets through your SP by 3 instead of 2. ${bold(
      "Base Death Save Penalty is increased by 1."
    )}`,
    quickFix: [{ skill: "Paramedic", dv: 15 }],
    treatment: [
      { skill: "Paramedic", dv: 15 },
      { skill: "Surgery", dv: 15 },
    ],
    stat: "",
    mod: 0,
    BDSP: 1,
  },
  {
    target: "head",
    injury: "Damaged Ear",
    effect:
      "Whenever you move further than 4m/yds on foot in a Turn, you cannot take a Move Action on your next Turn. Additionally you take a -2 to Perception Checks involving hearing.",
    quickFix: [{ skill: "Paramedic", dv: 13 }],
    treatment: [{ skill: "Surgery", dv: 15 }],
    stat: "",
    mod: 0,
    BDSP: 0,
  },
  {
    target: "head",
    injury: "Crushed Windpipe",
    effect: `You cannot speak. ${bold(
      "Base Death Save Penalty is increased by 1."
    )}`,
    quickFix: [{ skill: "N/A", dv: 0 }],
    treatment: [{ skill: "Surgery", dv: 15 }],
    stat: "",
    mod: 0,
    BDSP: 1,
  },
  {
    target: "head",
    injury: "Lost Ear",
    effect: `The Lost Ear is gone. Whenever you move further than 4m/yds on foot in a Turn, you cannot take a Move Action on your next Turn. Additionally you take a -4 to Perception Checks involving hearing. ${bold(
      "Base Death Penalty is increased by 1."
    )}`,
    quickFix: [{ skill: "N/A", dv: 0 }],
    treatment: [{ skill: "Surgery", dv: 17 }],
    stat: "",
    mod: 0,
    BDSP: 1,
  },
];

const attackDmg = (dmgRoll) => {
  const dice = {
    d6_1: Math.floor(Math.random() * 6) + 1,
    d6_2: Math.floor(Math.random() * 6) + 1,
    d6_3: Math.floor(Math.random() * 6) + 1,
    d6_4: Math.floor(Math.random() * 6) + 1,
    d6_5: Math.floor(Math.random() * 6) + 1,
    d6_6: Math.floor(Math.random() * 6) + 1,
    d6_7: Math.floor(Math.random() * 6) + 1,
    d6_8: Math.floor(Math.random() * 6) + 1,
  };
  const roll = {
    d6x1: [dice.d6_1],
    d6x2: [dice.d6_1, dice.d6_2],
    d6x3: [dice.d6_1, dice.d6_2, dice.d6_3],
    d6x4: [dice.d6_1, dice.d6_2, dice.d6_3, dice.d6_4],
    d6x5: [dice.d6_1, dice.d6_2, dice.d6_3, dice.d6_4, dice.d6_5],
    d6x6: [dice.d6_1, dice.d6_2, dice.d6_3, dice.d6_4, dice.d6_5, dice.d6_6],
    d6x8: [
      dice.d6_1,
      dice.d6_2,
      dice.d6_3,
      dice.d6_4,
      dice.d6_5,
      dice.d6_6,
      dice.d6_7,
      dice.d6_8,
    ],
  };
  function dmgDice() {
    if (dmgRoll == "2d6") {
      return roll.d6x2;
    } else if (dmgRoll == "3d6") {
      return roll.d6x3;
    } else if (dmgRoll == "4d6") {
      return roll.d6x4;
    } else if (dmgRoll == "5d6") {
      return roll.d6x5;
    } else if (dmgRoll == "6d6") {
      return roll.d6x6;
    } else if (dmgRoll == "8d6") {
      return roll.d6x8;
    } else {
      return [0];
    }
  }
  function critCheck(array, what) {
    return array.filter((item) => item == what).length;
  }
  function isCrit() {
    if (critCheck(dmgDice(), 6) == 2) {
      return true;
    } else {
      return false;
    }
  }

  const rollTable = (isCrit) => {
    const critdice = {
      one: Math.floor(Math.random() * 6) + 1,
      two: Math.floor(Math.random() * 6) + 1,
    };
    if (isCrit == true) {
      return critdice.one + critdice.two;
    } else {
      return 0;
    }
  };

  const index = rollTable(isCrit());

  const injObj = critInjuryInfo.find(
    (x) => x.injury == lib.critInjuryTable.body[index]
  );

  const x = {
    dice: dmgDice(),
    result: dmgDice().reduce((partialSum, a) => partialSum + a, 0),
    isCrit: isCrit(),
    injury: {
      name: injObj.injury,
      effect: injObj.effect,
      stat: injObj.stat,
      mod: injObj.mod,
      bdsp: injObj.BDSP,
    },
  };
  return x;
};

const ammoCheck = (ammo) => {
  if (ammo < 0) {
    return true;
  } else {
    return false;
  }
};

const blackICE = {
  asp: {
    name: "A$p",
    progClass: "Anti-Personnel",
    thumbURL: `https://64.media.tumblr.com/035e176461d7804c38a36313d53dc378/tumblr_muwovuzG0i1relaado1_500.gif`,
    per: 4,
    spd: 6,
    atk: 2,
    def: 2,
    rez: 15,
    effect:
      "Destroy's a single Program on the enemy Netrunner's Cyberdeck at random.",
    actionLabel: "Spin to Win",
    actionId: "action",
  },
  giant: {
    name: "G1ant",
    progClass: "Anti-Personnel",
    thumbURL: `https://64.media.tumblr.com/07cdad249cfb8bc0b2e8ac0795e10a63/tumblr_o881g1iNv51urr1ryo1_500.gif`,
    per: 2,
    spd: 2,
    atk: 8,
    def: 4,
    rez: 25,
    effect:
      "Does 3d6 damage direct to an enemy Netrunner's brain. The Netrunner is forcibly and unsafely Jacked Out of their current Netrun. They suffer the effect of all Rezzed enemy Black ICE they've encountered in the Architecture as they leave, not inluding the Giant.",
    actionLabel: "Brain DMG",
    actionId: "action",
  },
  hellhound: {
    name: "H3llhound",
    progClass: "Anti-Personnel",
    thumbURL: `https://thumbs.gfycat.com/PerkyBothAnchovy-size_restricted.gif`,
    per: 6,
    spd: 6,
    atk: 6,
    def: 2,
    rez: 20,
    effect:
      "Does 2d6 DMG direct to the Netrunner's brain. Unless insulated, their cyberdeck catches fire along with their clothing.  Until they spend a Meat Action to put themselves out, they take 2 damage to their HP whenever they end their turn. [Cannot Stack]",
    actionLabel: "Brain DMG",
    actionId: "action",
  },
  kraken: {
    name: "Krak3n",
    progClass: "Anti-Personnel",
    thumbURL: `https://data.whicdn.com/images/277421270/original.gif`,
    per: 6,
    spd: 2,
    atk: 8,
    def: 4,
    rez: 30,
    effect:
      "Does 3d6 DMG to an enemy Netrunner's brain. Until the end of the Netrunner's next Turn. the Netrunner cannot progress deeper into the Architecture or Jack Out safely (The Netrunner can still perform an unsafe Jack Out).",
    actionLabel: "Brain DMG",
    actionId: "action",
  },
  liche: {
    name: "L1che",
    progClass: "Anti-Personnel",
    thumbURL: `https://64.media.tumblr.com/4891c221f100112063e96776561ddc6e/32a02a7d76e3e651-e8/s540x810/7031f289ccca8a030309806eaf4c41915e8284dc.gif`,
    per: 8,
    spd: 2,
    atk: 6,
    def: 2,
    rez: 25,
    effect:
      "Enemy Netrunner's INT, REF, and DEX are each lowered by 1d6 for the next hour (minimum1). The effects are largely psychosomatic and leave no permanent effects.",
    actionLabel: "Make Them Dumber",
    actionId: "action",
  },
  raven: {
    name: "Rav3n",
    progClass: "Anti-Personnel",
    thumbURL: `https://64.media.tumblr.com/4f77935cb7f2accbb6db1a0868c2eb96/tumblr_p16exoD0Xu1v8kl8yo1_500.gif`,
    per: 6,
    spd: 4,
    atk: 4,
    def: 2,
    rez: 15,
    effect:
      "Derezzes a single Defender Program the enemy Netrunner has Rezzed at random, then deals 1d6 DMG direct the the Netrunner's brain.",
    actionLabel: "DEREZZ and Brain DMG",
    actionId: "action",
  },
  scorpion: {
    name: "Sc0rpion",
    progClass: "Anti-Personnel",
    thumbURL: `https://i.pinimg.com/originals/03/ee/3f/03ee3f8e3dfaf9a783eb67bc6013c466.gif`,
    per: 2,
    spd: 6,
    atk: 2,
    def: 2,
    rez: 15,
    effect:
      "Enemy Netrunner's MOVE is lowered by 1d6 for the next hour (minimum 1). The effects are largely psychosomatic and leave no permanent effects.",
    actionLabel: "SLOOOOOOWWW",
    actionId: "action",
  },

  skunk: {
    name: "SkVnk",
    progClass: "Anti-Personnel",
    thumbURL: `https://i.pinimg.com/originals/03/ee/3f/03ee3f8e3dfaf9a783eb67bc6013c466.gif`,
    per: 2,
    spd: 4,
    atk: 4,
    def: 2,
    rez: 10,
    effect:
      "Until this Program is Derezzed, an enemy Netrunner hit by this Effect amkes all Slide Checks at a -2. Each Skunk Black ICE can only affect a single Netrunner at a time, but the effets of multiple Skunks can stack.",
    actionLabel: " ",
    actionId: " ",
  },
  wisp: {
    name: "W1sp",
    progClass: "Anti-Personnel",
    thumbURL: `https://i.pinimg.com/originals/03/ee/3f/03ee3f8e3dfaf9a783eb67bc6013c466.gif`,
    per: 4,
    spd: 4,
    atk: 4,
    def: 2,
    rez: 15,
    effect:
      "Does 1d6 of DMG direct to an enemy Netrunner's brain and lowers the amount of total NET actions the Netrunner can accomplish on their next Turn by 1 (minumum 2).",
    actionLabel: "Brain DMG",
    actionId: "action",
  },
  dragon: {
    name: "Drag0n",
    progClass: "Anti-Program",
    thumbURL: `https://i.pinimg.com/originals/d4/73/20/d47320a9e84d6ad754b150239bae8b5d.gif`,
    per: 6,
    spd: 4,
    atk: 6,
    def: 6,
    rez: 30,
    effect:
      "Deals 6d6 damage to a Program, If this would be enough to Derezz the Program, it is instead Destroyed.",
    actionLabel: "DESTR0Y!!",
    actionId: "action",
  },
  killer: {
    name: "K1ll3r",
    progClass: "Anti-Program",
    thumbURL: `https://i.pinimg.com/originals/09/12/74/091274c73269b7b63b5a63707e0a9cc3.gif`,
    per: 4,
    spd: 8,
    atk: 6,
    def: 2,
    rez: 10,
    effect:
      "Deals 4d6 DMG to a Program. If this DMG would be enough to Derezz the Program, it is instead Destroyed.",
    actionLabel: "DESTR0Y!!",
    actionId: "action",
  },
  sabertooth: {
    name: "Sab3rt00th",
    progClass: "Anti-Program",
    thumbURL: `https://i.pinimg.com/originals/47/2e/1b/472e1ba5ba6d04fee5aac3ba124d64cb.gif`,
    per: 8,
    spd: 6,
    atk: 6,
    def: 2,
    rez: 25,
    effect:
      "Deals 6d6 damage to a Program. If this damage would be enough to Derezz the Program, it is instead Destroyed.",
    actionLabel: "DESTR0Y!!",
    actionId: "action",
  },
};

const nonBlackICE = {
  hellbolt: {
    name: "Hellbolt",
    progClass: "Anti-Personnel Attacker",
    atk: 2,
    def: 0,
    rez: 0,
    effect:
      "Does 2d6 DMG direct to the Netrunner's brain. Unless insulated, their cyberdeck catches fire along with their clothing.  Until they spend a Meat Action to put themselves out, they take 2 damage to their HP. [cannot stack]",
    thumbURL:
      "https://media1.giphy.com/media/VG8Dto0bkHDUdVYZrj/giphy.gif?cid=790b761157e585d5010fef2871c43539e88dd370ed006310&rid=giphy.gif&ct=g",
    actionLabel: "Brain DMG",
    actionId: "hellbolt_action",
  },
  banhammer: {
    name: "Banhammer",
    progClass: "Anti-Program Attacker",
    atk: 1,
    def: 0,
    rez: 0,
    effect:
      " Does 3d6 REZ to a Non-Black ICE Program, or 2d6 REZ to a Black ICE Program. ",
    thumbURL: "https://i.imgur.com/azCR8D1.gif",
    actionLabel: ["ATK Non-Black ICE Program", "ATK Black ICE Program"],
    actionId: "banhammer_action",
  },
  sword: {
    name: "Sw0rd",
    progClass: "Anti-Program Attacker",
    atk: 1,
    def: 0,
    rez: 0,
    effect:
      " Does 3d6 REZ to a Black ICE Program, or 2d6 REZ to a Non-Black ICE Program. ",
    thumbURL: "https://c.tenor.com/fQD5fvkp8HwAAAAC/sawa-yukimura-sawa.gif",
    actionLabel: ["ATK Non-Black ICE Program", "ATK Black ICE Program"],
    actionId: "sword_action",
  },
  deckkrash: {
    name: "DeckKRASH",
    progClass: "Anti-Personnel Attacker",
    atk: 0,
    def: 0,
    rez: 0,
    effect:
      " Enemy Netrunner is forcibly and unsafely Jacked Out of the Architecture, suffering the effect of all Rezzed enemy Black ICE they've encountered in the Architecture as they leave. ",
    thumbURL:
      "https://c.tenor.com/y33r5eXsELUAAAAd/serial-experiments-lain-lain.gif",
  },
  nervescrub: {
    name: "Nervescrub",
    progClass: "Anti-Personnel Attacker",
    atk: 0,
    def: 0,
    rez: 0,
    effect:
      " Enemy Netrunner's INT, REF, and DEX are each lowered by 1d6 for the next hour (minimum1). The effects are largely psychosomatic and leave no permanent effects. ",
    thumbURL:
      "https://c.tenor.com/RliaDiLzcnEAAAAC/serial-experiments-lain-lain.gif",
    actionLabel: "Brain DMG",
    actionId: "nervescrub_action",
  },
  poisonflatline: {
    name: "Poison Flatline",
    progClass: "Anti-Personnel Attacker",
    atk: 0,
    def: 0,
    rez: 0,
    effect:
      " Destroy's a single Non-Black ICE Program Installed on the Netrunner target's Cyberdeck at random. ",
    thumbURL:
      "https://64.media.tumblr.com/cac533ba2d76d04bb3af42a8836a41da/tumblr_pm5yokAOZU1r6xm5co1_1280.gif",
    actionLabel: "D-REZ Roulette",
    actionId: "poisonflatline_action",
  },
  superglue: {
    name: "Superglue",
    progClass: "Anti-Personnel Attacker",
    atk: 2,
    def: 0,
    rez: 0,
    effect:
      " Enemy Netrunner cannot progress deeper into the Architecture or Jack Out safely for 1d6 Rounds (enemy Netrunner ca still perform unsafe Jack Out, though). Each copy of this Program can only be used once per Netrun. ",
    thumbURL:
      "https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fphotos%2Fimages%2Fnewsfeed%2F001%2F135%2F770%2Fb2d.gif",
    actionLabel: "Rounds",
    actionId: "superglue_action",
  },
  vrizzbolt: {
    name: "Vrizzbolt",
    progClass: "Anti-Personnel Attacker",
    atk: 1,
    def: 0,
    rez: 0,
    effect:
      " Does 1d6 DMG direct to a Netrunner's brain and lowers the amount of total NET Actions the Netrunner can accomplish on their ext Turn by 1 (minimum 2). ",
    thumbURL:
      "https://78.media.tumblr.com/179cd9ffde8e8a3371be473717b958c5/tumblr_pau1xuwBQ41whahvko1_540.gif",
    actionLabel: "Brain DMG",
    actionId: "vrizzbolt_action",
  },
  eraser: {
    name: "Eras3r",
    progClass: "Booster",
    atk: 0,
    def: 0,
    rez: 7,
    effect:
      " Increases all Cloak Checks you make by +2 as long as this Program remains Rezzed. ",
    thumbURL:
      "https://64.media.tumblr.com/03f3571855f3b3c33ca75149bb42fdc3/5c196d8fe68c385e-b3/s500x750/821694d4b89c20d2b8865bb0aa4b457b38d4e583.gif",
    actionLabel: "Enhanced Cloak",
    actionId: "eraser_action",
  },
  seeya: {
    name: "See Ya",
    progClass: "Booster",
    atk: 0,
    def: 0,
    rez: 7,
    effect:
      " Increases all Pathfinder Checks you make by +2 as long as this Program remains Rezzed. ",
    thumbURL:
      "https://media0.giphy.com/media/2m1YQuAdhvG0q6HBab/200w.gif?cid=82a1493b5ctoh9g4vrx0qutqy0xbimorkvsewn1p9wv3ocpe&rid=200w.gif&ct=g",
    actionLabel: "Enhanced Pathfinder",
    actionId: "seeya_action",
  },
  speedygonzalvez: {
    name: "Sp33dy G0nzalvez",
    progClass: "Bosster",
    atk: 0,
    def: 0,
    rez: 7,
    effect: " Increase your speed +2 as long as this Program is Rezzed. ",
    thumbURL:
      "https://i.pinimg.com/originals/dd/b7/d2/ddb7d26375807f772c47b7df57a15395.gif",
    actionLabel: "SPD Boost",
    actionId: "speedygonzalvez_action",
  },
  worm: {
    name: "Worm",
    progClass: "Booster",
    atk: 0,
    def: 0,
    rez: 7,
    effect:
      " Increase all Backdoor Checks you make by +2 as long as this Program is Rezzed. ",
    thumbURL: "https://monophy.com/media/40DRc0W00UbgQ/monophy.gif",
    actionLabel: "Enhanced Backdoor",
    actionId: "worm_action",
  },
  armor: {
    name: "Arm0r",
    progClass: "Defender",
    atk: 0,
    def: 0,
    rez: 7,
    effect:
      " Lowers all brain DMG you would receive by 4, as long as this Program remains Rezzed. ",
    thumbURL:
      "https://i.pinimg.com/originals/a8/07/f5/a807f5da6c07679020f90e6925bdbc1c.gif",
  },
  flak: {
    name: "Flak",
    progClass: "Defender",
    atk: 0,
    def: 0,
    rez: 7,
    effect:
      " Reduces the ATK of all Non-Black ICE Attacker Programs run against you to 0 as long as this Program is Rezzed. Only 1 copy of this Program can be running at a time. Each copy of this Program can only be used once per Netrun. ",
    thumbURL:
      "https://i.pinimg.com/originals/97/ac/b4/97acb42cbfd990000954aef7954c497c.gif",
  },
  shield: {
    name: "Shi3ld",
    progClass: "Defender",
    atk: 0,
    def: 0,
    rez: 7,
    effect:
      " Stops the first successful Non-Black ICE Program Effect from dealing Brain DMG. After stopping this DMG, the Shi3ld Derezzes itself. Only 1 copy of this Program can be running at a time. Each copy of this Program can only be used once per Netrun. ",
    thumbURL:
      "https://cdn.substack.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F7d5c5775-3fe7-4b55-afc7-73b5330e2e4c_720x720.gif",
  },
};

module.exports = { dvIndex, critInjuryInfo, hitCheck, attackDmg, ammoCheck, blackICE, nonBlackICE };
