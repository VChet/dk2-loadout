import equipmentData from "../data/equipmentData.json";
import localization from "../data/localization.json";
import type { TrooperConcealment, TrooperEquipment } from "../types/Roster";

const datamap = new Map(equipmentData.map((item) => [item.name, item]));

export function getFileName(filepath: string): string {
  return filepath.split("\\").pop().split("/").pop().split(".").shift();
}

export function getTrooperImg(name: string, large: boolean = false): string {
  let path = `images/portraits/${getFileName(name)}`;
  path += large ? "_large.webp" : ".webp";
  return path;
}

export function getClassImg(name: string): string {
  return `images/classes/${getFileName(name.toLowerCase())}.webp`;
}

export function getClassIcon(name: string): string {
  return `images/classes/icon_${getFileName(name.toLowerCase())}.webp`;
}

export function getWeaponImg(name: string): string | null {
  const weapon = datamap.get(name);
  if (!weapon?.img) return null;
  return `images/weapons/${getFileName(weapon.img)}.webp`;
}

export function getAttachmentImg(name: string): string | null {
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

export function getNameString(name: string): string {
  const object = datamap.get(name);
  return localization[object.tooltip] || name;
}

export function getTrooperMobility(equipment: Partial<TrooperEquipment>): number {
  let mobility: number = 110;
  Object.values(equipment).forEach((item) => {
    const { move, turn } = datamap.get(item.name).mobility;
    if (move) mobility += move;
    if (turn) mobility += turn;
  });
  return Math.floor(mobility / 10);
}

export function getTrooperConcealment(className: string, equipment: Partial<TrooperEquipment>): TrooperConcealment {
  // Set default concealment from entities/humans_goodguys.xml
  let concealment: TrooperConcealment = {} as TrooperConcealment;
  if (className === "Undercover") {
    concealment.value = 10;
  } else if (className === "BlackOps") {
    concealment.value = 7;
  } else {
    concealment.value = 0;
  }

  Object.values(equipment).forEach((item) => {
    const modifier = datamap.get(item.name).concealment;
    if (modifier) concealment.value += modifier;
  });

  if (concealment.value < 3) {
    concealment.text = "Overt";
    concealment.color = "#e62121";
  } else if (concealment.value < 7) {
    concealment.text = "Suspicious";
    concealment.color = "#ffc600";
  } else {
    concealment.text = "Covert";
    concealment.color = "#9fd3ff";
  }

  return concealment;
}
