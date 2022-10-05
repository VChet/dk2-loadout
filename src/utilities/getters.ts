import equipmentData from "@/data/equipmentData.json";
import localization from "@/data/localization.json";
import ranksData from "@/data/ranksData.json";
import type { ComputedLevel, ParsedEquipment } from "@/types/Parsed";
import type { TrooperEquipment } from "@/types/Roster";

const datamap = new Map(equipmentData.map((item) => [item.name, item]));

export function getFileName(filepath: string): string {
  const regexp = new RegExp(/[\w-]+?(?=\.)/);
  const [name] = filepath.match(regexp) ?? [];
  return name ?? filepath;
}

export function getTrooperImg(name: string, large: boolean = false): string {
  let path = `images/portraits/${getFileName(name)}`;
  path += large ? "_large.webp" : ".webp";
  return path;
}

export function getClassImg(name: string): string {
  return `images/classes/${getFileName(name.toLowerCase())}.webp`;
}

export function getWeaponData(name: string): ParsedEquipment | null {
  const weapon = datamap.get(name);
  if (!weapon?.img) return null;
  return { ...weapon, img: `images/weapons/${getFileName(weapon.img)}.webp` };
}

export function getHelmetData(name: string): ParsedEquipment | null {
  const helmet = datamap.get(name);
  if (!helmet?.img) return null;
  return { ...helmet, img: `images/attachments/${getFileName(helmet.img)}.webp` };
}

export function getNVGImg(name: string): string | null {
  const attachment = datamap.get(name);
  if (!attachment?.img) return null;
  return `images/attachments/${getFileName(attachment.img)}_small.webp`;
}

export function getWeaponAttachmentImg(name: string): string | null {
  const attachment = datamap.get(name);
  if (!attachment?.img) return null;
  return `images/weapons/attachments/${getFileName(attachment.img)}_small.webp`;
}

export function getEquipmentImg(name: string): string | null {
  const equip = datamap.get(name);
  if (!equip?.img) return null;
  return `images/equipment/${getFileName(equip.img)}.webp`;
}

export function getAbilityName(name: string): string {
  switch (name) {
    case "AssaultShooting":
      return "Assault shooting";
    case "FieldSkills":
      return "Field skills";
    default:
      return name;
  }
}

export function getNameString(name: string): string | null {
  const object = datamap.get(name);
  if (!object?.tooltip) return null;
  return (localization as { [key: string]: string })[object.tooltip] || name;
}

export function getTrooperMobility(equipment: Partial<TrooperEquipment>): number {
  let mobility: number = 110;
  Object.values(equipment).forEach((item) => {
    if (!item) return;
    const object = datamap.get(item.$name);
    if (!object?.mobility) return;
    const { move, turn } = object.mobility;
    if (move) mobility += move;
    if (turn) mobility += turn;
  });
  return Math.floor(mobility / 10);
}

export function getTrooperConcealment(className: string, equipment: Partial<TrooperEquipment>): number {
  // Set default concealment from entities/humans_goodguys.xml
  let concealment: number;
  if (className === "Undercover") {
    concealment = 10;
  } else if (className === "BlackOps") {
    concealment = 7;
  } else {
    concealment = 0;
  }

  Object.values(equipment).forEach((item) => {
    if (!item) return;
    const modifier = datamap.get(item.$name)?.concealment;
    if (modifier) concealment += modifier;
  });

  return concealment;
}

export function getTrooperLevel(className: string, xp: number): ComputedLevel {
  let unit;
  if (["Assault", "Support", "Marksman", "Grenadier"].includes(className)) {
    unit = ranksData["Rangers"];
  } else if (["Undercover", "BlackOps"].includes(className)) {
    unit = ranksData["CIA"];
  } else {
    unit = ranksData["Nowheraki"];
  }

  const level = xp ? unit.findIndex((rank) => rank.xpNeeded > xp) : 1;
  if (level < 0) {
    return {
      rank: (localization as { [key: string]: string })[unit[9].name],
      nextLevel: 10,
    };
  } else if (xp) {
    const earnedXp = xp - unit[level - 1].xpNeeded;
    const nextLevelXp = unit[level].xpNeeded - unit[level - 1].xpNeeded;
    return {
      rank: (localization as { [key: string]: string })[unit[level - 1].name],
      earnedXp,
      nextLevelXp,
      nextLevel: level,
    };
  } else {
    return {
      rank: (localization as { [key: string]: string })[unit[0].name],
      nextLevel: 1,
    };
  }
}

export function getRankProgress({ nextLevel, earnedXp, nextLevelXp }: ComputedLevel) {
  console.log(nextLevel, earnedXp, nextLevelXp)
  if (earnedXp === 0) return 0;
  if (!earnedXp || !nextLevelXp) return nextLevel === 10 ? 100 : 0;
  return ((earnedXp / nextLevelXp) * 100).toFixed(2);
}
