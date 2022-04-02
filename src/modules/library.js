"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rangedWeapons = require('../JSON/rangedWeapons.json');
const ammo = require('../JSON/ammo.json');
const skillstat = require('../JSON/skillStat.json');
const critInjuryTable = require('../JSON/critInjuryTable.json');
const pc = require('../JSON/testPC.json');
const lib = {
    pc: pc,
    rangedWeapons: rangedWeapons,
    ammo: ammo,
    skillstat: skillstat,
    critInjuryTable: critInjuryTable
};
exports.default = lib;
