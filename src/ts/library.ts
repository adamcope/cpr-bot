const rangedWeapons = require('../JSON/rangedWeapons.json');
const ammo = require('../JSON/ammo.json');
const skillstat = require('../JSON/skillStat.json');
const critInjuryTable = require('../JSON/critInjuryTable.json');
const meleeWeapons = require("../JSON/meleeWeapons.json");

const lib = {
    rangedWeapons: rangedWeapons,
    ammo:ammo,
    skillstat: skillstat,
    critInjuryTable: critInjuryTable,
    meleeWeapons: meleeWeapons
}

module.exports = lib

export {};