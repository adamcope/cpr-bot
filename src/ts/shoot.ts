
/**
 * 
 * @param weapon - weapon object
 * @param qty ``Number of bullets to shoot.``
 * @returns {number} ``newAmmoCount``
 */
function shoot(weapon: any, qty: number) {
    const magSize = weapon.magSize
    const mag = weapon[magSize]
    const newAmmoCount = mag - qty;
    return newAmmoCount
  };

  module.exports = shoot
  
  export {};