"use strict";
function reload(pc, weapon) {
    const invAmmo = pc.ammo.find((x) => x.name == pc.hands[0].ammoLoaded);
    const magSize = weapon[`${weapon.magSize}`];
    function invAmmoRemaining() {
        if (invAmmo.amount < magSize) {
            return 0;
        }
        else {
            return invAmmo.amount - magSize;
        }
    }
    function loadAmount() {
        if (invAmmo.amount < magSize) {
            return invAmmo.amount;
        }
        else {
            return magSize;
        }
    }
    const x = {
        remaining: invAmmoRemaining(),
        loaded: {
            name: pc.hands[0].ammoLoaded,
            amount: loadAmount(),
        }
    };
    return x;
}
module.exports = reload;
