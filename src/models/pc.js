const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pc = new Schema({
  userID: String,
  guildID: String,
  username: String,
  characterName: String,
  characterImgUrl: String,
  hp: [Number, Number],
  weaponDrawn: String,
  role: {
    name: String,
    ability: String,
    rank: Number,
  },
  humanity: [Number, Number],
  seriouslyWounded: [String],
  addictions: [String],
  stats: {
    int: [Number],
    ref: [Number],
    dex: [Number],
    tech: [Number],
    cool: [Number],
    will: [Number],
    luck: [Number],
    move: [Number],
    body: [Number],
    emp: [Number],
  },
  skills: {
    concentration: Number,
    "conceal/reveal_object": Number,
    lip_reading: Number,
    perception: Number,
    tracking: Number,
    athletics: Number,
    contortionist: Number,
    dance: Number,
    endurance: Number,
    "resist_torture/drugs": Number,
    stealth: Number,
    drive_land_vehicle: Number,
    pilot_air_vehicle: Number,
    pilot_sea_vehicle: Number,
    riding: Number,
    accounting: Number,
    animal_handling: Number,
    bureaucracy: Number,
    business: Number,
    composition: Number,
    criminology: Number,
    cryptography: Number,
    deduction: Number,
    education: Number,
    gamble: Number,
    language: [{name: String, value: Number}],
    library_search: Number,
    local_expert: [{name: String, value: Number}],
    science: [{name: String, value: Number}],
    tactics: Number,
    wilderness_survival: Number,
    brawling: Number,
    evasion: Number,
    martial_arts: [{name: String, value: Number}],
    melee_weapons: Number,
    acting: Number,
    play_instrument: [{name: String, value: Number}],
    archery: Number,
    autofire: Number,
    handgun: Number,
    heavy_weapons: Number,
    shoulder_arms: Number,
    bribery: Number,
    conversation: Number,
    human_perception: Number,
    interrogation: Number,
    persuasion: Number,
    personal_grooming: Number,
    streetwise: Number,
    trading: Number,
    "wardrobe&style": Number,
    air_vehicle_tech: Number,
    basic_tech: Number,
    cybertech: Number,
    demolititions: Number,
    electronics_security_tech: Number,
    first_aid: Number,
    forgery: Number,
    land_vehicle_tech: Number,
    "paint/draw/sculpt": Number,
    paramedic: Number,
    photography_film: Number,
    pick_lock: Number,
    pick_pocket: Number,
    sea_vehicle_tech: Number,
    weapons_tech: Number,
  },
  weapons: [{ ref: String, ammoLoaded: String, ammo: Number }],
  ammo: [{ ref: String, qty: Number }],
  cyberwear: [String],
  inventory: [String],
});

module.exports = mongoose.model("PC", pc);
