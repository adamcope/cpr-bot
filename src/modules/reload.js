"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function reload(pc, weapon) {
    const weaponRef = weapon.join("_");
    const weaponObj = pc.weapons.find((x) => x.ref == weaponRef);
    const invAmmo = pc.ammo.find((x) => x.name == weaponObj.ammoLoaded);
    const magSize = weaponObj[weaponObj.magSize];
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
        weaponName: weaponObj.name,
        remaining: invAmmoRemaining(),
        loaded: {
            name: weaponObj.ammoLoaded,
            amount: loadAmount(),
        },
    };
    return x;
}
module.exports = reload;
