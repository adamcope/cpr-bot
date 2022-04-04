function aim(attack: any, location: string) {
  const aimObject: {
    dv: number;
    isHit: boolean;
    effect: string;
    injury: string;
  } = {
    dv: 0,
    isHit: false,
    effect: "",
    injury: "none",
  };

  aimObject.dv = attack.dv + 8;
  function isHit(dv: number, result: number): boolean {
    if (result > dv) {
      return true;
    } else {
      return false;
    }
  }
  aimObject.isHit = isHit(attack.dv, attack.sc.roll.result);

  function aimLocation(location: string) {
    if (location == "head") {
      return "Multiply the DMG that gets through your target's head armor by 2.";
    } else if (location == "hand") {
      return "If a single point of damage gets through your target's body armor, your target drops one item of your choice held in their hands. It lands on the ground in front of them.";
    } else {
      return "If a single point of damage gets through your target's body armor, your target also suffers the Broken Leg Critical Injury if they have any legs left that aren't broken.";
    }
  }
  aimObject.effect = aimLocation(location);

  function injury(location: string) {
    if (location == "leg") {
      return "**Critical Injury** Broken Leg: -4 to MOVE stat. (minimum 1)";
    } else {
      return "";
    }
  }
  aimObject.injury = injury(location);

  return aimObject
}
