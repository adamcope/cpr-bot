const pc = {
  weapons: []//{ name: "Bow" }, { name: "Heavy SMG" }, { name: "Assault Rifle" }],
};

const weaponList = () => {
  let list = [];
  pc.weapons.forEach((x) => list.push(x.name + `\n`));
  if ((list == '')) {
    return "none";
  } else {
    return list;
  }
};

console.log(weaponList());
