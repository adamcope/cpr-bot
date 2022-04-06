declare interface SC {
  skill: {
    name: string;
    value: number;
  };
  stat: {
    name: string;
    value: number;
    modifier: number;
  };
  d10: {
    display: string;
    result: number;
  }
  roll: {
    display: string;
    result: number;
    critMsg: string;
  };
}

declare namespace PC {
  let userdID: string;
  let guildID: string;
  let username: string;
  let characterName: string;
  let characterImgUrl: string;
  let hp: [number, number];
  let humanity: [number, number];
  let role: {
    name: string;
    ability: string;
    rank: number;
  };
  let criticalInjuries: Array<string>;
  let addictions: Array<string>;
  let stats: {
    int: [number, number];
    ref: [number, number];
    dex: [number, number];
    tech: [number, number];
    cool: [number, number];
    will: [number, number];
    luck: [number, number];
    move: [number, number];
    body: [number, number];
    emp: [number, number];
  };
  let skills: {
    concentration: number;
    "conceal/reveal_object": number;
    lip_reading: number;
    perception: number;
    tracking: number;
    athletics: number;
    contortionist: number;
    dance: number;
    endurance: number;
    "resist_torture/drugs": number;
    stealth: number;
    drive_land_vehicle: number;
    pilot_air_vehicle: number;
    pilot_sea_vehicle: number;
    riding: number;
    accounting: number;
    animal_handling: number;
    bureaucracy: number;
    business: number;
    composition: number;
    criminology: number;
    cryptography: number;
    deduction: number;
    education: number;
    gamble: number;
    language: number;
    library_search: number;
    local_expert: number;
    science: number;
    tactics: number;
    wilderness_survival: number;
    brawling: number;
    evasion: number;
    martial_arts: number;
    melee_weapons: number;
    acting: number;
    play_instrument: number;
    archery: number;
    autofire: number;
    handgun: number;
    heavy_weapons: number;
    shoulder_arms: number;
    bribery: number;
    conversation: number;
    human_perception: number;
    interrogation: number;
    persuasion: number;
    personal_grooming: number;
    streetwise: number;
    trading: number;
    "wardrobe_&_style": number;
    air_vehicle_tech: number;
    basic_tech: number;
    cybertech: number;
    demolititions: number;
    electronics_security_tech: number;
    first_aid: number;
    forgery: number;
    land_vehicle_tech: number;
    "paint/draw/sculpt": number;
    paramedic: number;
    photography_film: number;
    pick_lock: number;
    pick_pocket: number;
    sea_vehicle_tech: number;
    weapons_tech: number;
  };
  let armor: {
    head: { ref: string; sp: number; penalty: number };
    body: { ref: string; name: string; sp: number; penalty: number };
    shield: { ref: string; name: string; sp: number; penalty: number };
  };
  let weapons: [
    {
      ref: string;
      name: string;
      ammo: number;
      magSize: string;
      ammoLoaded: string;
      rangeDV: Array<number>;
      dmg: string;
      standardMag: number;
      extendedMag: number;
      drumMag: number;
      rof: number;
      hands: number;
      autofire: [boolean, number];
      suppressiveFire: boolean;
      skillRef: string;
      skillName: string;
      ammoType: string;
      cost: string;
    }
  ];
  let cyberwear: Array<string>;
  let ammo: [{ ref: string; name: string; amount: number; type: string }];
}

declare namespace Weapon{
    let ref: string;
      let name: string;
      let ammo: number;
      let magSize: string;
      let ammoLoaded: string;
      let rangeDV: Array<number>;
      let dmg: string;
      let standardMag: number;
      let extendedMag: number;
      let drumMag: number;
      let rof: number;
      let hands: number;
      let autofire: [boolean, number];
      let suppressiveFire: boolean;
      let skillRef: string;
      let skillName: string;
      let ammoType: string;
      let cost: string;
}

declare interface statD10{
  stat: string,
    value: number,
    modifier: number,
    display: string,
    result: number,
    critMsg: string
}
