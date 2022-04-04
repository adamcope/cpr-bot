const lobbyTable = [
  "",
  "File DV6",
  "Password DV6",
  "Password DV8",
  "Skunk",
  "Wisp",
  "Killer",
];
const basicArch = [
  "",
  "",
  "",
  "Hellhound",
  "Sabertooth",
  "Raven x 2",
  "Hellhound",
  "Wisp",
  "Raven",
  "Password DV6",
  "File DV6",
  "Control Node DV6",
  "Password DV6",
  "Skunk",
  "Asp",
  "Scorpion",
  "Killer, Skunk",
  "Wisp x3",
  "Liche",
];
const standardArch = [
  "",
  "",
  "",
  "Hellhound x2",
  "Hellhound, Killer",
  "Skunk",
  "Sabertooth",
  "Scorpion",
  "Hellhound",
  "Password DV8",
  "File DV8",
  "Control Node DV8",
  "Password DV8",
  ,
  "Asp",
  "Killer",
  "Liche",
  "Asp",
  "Raven x3",
  "Liche, Raven",
];
const uncommonArch = [
  "",
  "",
  "",
  "Kraken",
  "Hellhound, Scorpion",
  "Hellhound, Killer",
  "Raven x2",
  "Sabertooth",
  "Hellhound",
  "Password DV10",
  "File DV10",
  "Control Node DV10",
  "Password DV10",
  "Killer",
  "Liche",
  "Dragon",
  "Asp, Raven",
  "Dragon, Wisp",
  "Giant",
];
const advancedArch = [
  "",
  "",
  "",
  "Hellhound x3",
  "Asp x2",
  "Hellhound, Liche",
  "Wisp x3",
  "Hellhound, Sabertooth",
  "Kaken",
  "Password DV12",
  "File DV12",
  "Control Node DV12",
  "Password DV12",
  "Giant",
  "Dragon",
  "Killer, Scorpion",
  "Kraken",
  "Raven, Wisp, Hellhound",
  "Dragon x2",
];


let lobby = new Set();
while ([...lobby].length < 2) {
  const l = Math.floor(Math.random() * 6) + 1;
  if (lobby.has(lobbyTable[l])) {
    continue;
  }
  lobby.add(lobbyTable[l]);
}
lobby = [...lobby];

// let floors = 6;
function generateArchitecture(floors, type){

let architecture = {
  basic: new Set(),
  standard: new Set(),
  uncommon: new Set(),
  advanced: new Set(),
};
architecture.basic.add(lobby[0]);
architecture.basic.add(lobby[1]);

while ([...architecture.basic].length < floors + 2) {
  const r =
    Math.floor(Math.random() * 6) +
    Math.floor(Math.random() * 6) +
    Math.floor(Math.random() * 6) +
    3;
  if (architecture.basic.has(basicArch[r])) {
    continue;
  }
  architecture.basic.add(basicArch[r]);
}
architecture.basic = [...architecture.basic];

architecture.standard.add(lobby[0]);
architecture.standard.add(lobby[1]);

while ([...architecture.standard].length < floors + 2) {
  const r =
    Math.floor(Math.random() * 6) +
    Math.floor(Math.random() * 6) +
    Math.floor(Math.random() * 6) +
    3;
  if (architecture.standard.has(standardArch[r])) {
    continue;
  }
  architecture.standard.add(standardArch[r]);
}
architecture.standard = [...architecture.standard];

architecture.uncommon.add(lobby[0]);
architecture.uncommon.add(lobby[1]);

while ([...architecture.uncommon].length < floors + 2) {
  const r =
    Math.floor(Math.random() * 6) +
    Math.floor(Math.random() * 6) +
    Math.floor(Math.random() * 6) +
    3;
  if (architecture.uncommon.has(uncommonArch[r])) {
    continue;
  }
  architecture.uncommon.add(uncommonArch[r]);
}
architecture.uncommon = [...architecture.uncommon];

architecture.advanced.add(lobby[0]);
architecture.advanced.add(lobby[1]);

while ([...architecture.advanced].length < floors + 2) {
  const r =
    Math.floor(Math.random() * 6) +
    Math.floor(Math.random() * 6) +
    Math.floor(Math.random() * 6) +
    3;
  if (architecture.advanced.has(advancedArch[r])) {
    continue;
  }
  architecture.advanced.add(advancedArch[r]);
}
architecture.advanced = [...architecture.advanced];

if (type == 'basic') {
  return architecture.basic
} else if (type == 'standard'){
  return architecture.standard
} else if (type == 'uncommon'){
  return architecture.uncommon
} else if (type == 'advanced'){
  return architecture.advanced
}

}

module.exports = generateArchitecture
