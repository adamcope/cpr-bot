
function load(pc: any, weapon: Array<string>, ammo: Array<string>) {

  const ammoRef = ammo.join("_")
  const weaponRef = weapon.join("_")
  const weaponObj = pc.weapons.find((x: any) => x.ref == weaponRef);
  const invAmmo = pc.ammo.find((x: any) => x.ref == ammoRef);
  const magSize = weaponObj[weaponObj.magSize];

  if(!invAmmo){
    return 'Ammo Type not in Inventory'
    } else{

  function invAmmoRemaining() {
    if (invAmmo.amount < magSize) {
      return 0;
    } else {
      return invAmmo.amount - magSize;
    }
  }

  function loadAmount() {
    if (invAmmo.amount < magSize) {
      return invAmmo.amount;
    } else {
      return magSize;
    }
  }

  const x = {
    remaining: invAmmoRemaining(),
    loaded: {
      name: invAmmo,
      amount: loadAmount(),
    },
    returned: {
      name: weaponObj.ammoLoaded,
      amount: weaponObj.ammo,
    },
  };

  if (invAmmo.type != weaponObj.ammoType) {
    return "Wrong Ammo Type";
  } else if (invAmmo.amount == 0) {
    return `Out of Ammo`;
  } else {
    return x;
  }
}}

module.exports = load;

export {};