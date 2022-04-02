
function load(pc: any, ammoRef: string) {

  const invAmmo = pc.ammo.find((x: any) => x.ref == ammoRef);
  const magSize = pc.hands[0][`${pc.hands[0].magSize}`];

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
      name: pc.hands[0].ammoLoaded,
      amount: pc.hands[0].ammo,
    },
  };

  if (invAmmo.type != pc.hands[0].ammoType) {
    return "Wrong Ammo Type";
  } else if (invAmmo.amount == 0) {
    return `Out of Ammo`;
  } else {
    return x;
  }
}}

module.exports = load;
