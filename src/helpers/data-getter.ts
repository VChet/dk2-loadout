import equipmentData from "@/data/equipmentData.json";
import localization from "@/data/localization.json";
import type { ParsedEquipment } from "@/types/parsed";

export const datamap = new Map(equipmentData.map((item) => [item.name, item]));

export function getFileName(filepath: string): string {
  const [name] = filepath.match(/[\w-]+(?=\.)/) ?? [];
  return name ?? filepath;
}

export function getClassTitle(className: string): string {
  switch (className) {
    case "BlackOps": return "Black Ops";
    case "SwatLeader": return "Leader";
    case "SwatAssaulter": return "Assault";
    case "SwatSapper": return "Sapper";
    case "SwatMilitia": return "Militia";
    default: return className.toLowerCase();
  }
}

function getClassName(className: string): string {
  switch (className) {
    case "Assault": return "assaulter";
    case "SwatLeader": return "nowheraki_leader";
    case "SwatAssaulter": return "nowheraki_assaulter";
    case "SwatSapper": return "nowheraki_sapper";
    case "SwatMilitia": return "nowheraki_militia";
    default: return className.toLowerCase();
  }
}
export function getClassImg(name: string): string {
  return `img/gui/deploy/class_icon_${getFileName(getClassName(name))}.webp`;
}

export function getWeaponData(name: string): ParsedEquipment | null {
  const weapon = datamap.get(name);
  if (!weapon?.img) return null;
  return { ...weapon, img: `img/weapons/${getFileName(weapon.img)}.webp` };
}

export function getHelmetData(name: string): ParsedEquipment | null {
  const helmet = datamap.get(name);
  if (!helmet?.img) return null;
  return { ...helmet, img: `img/humans/attachments/${getFileName(helmet.img)}.webp` };
}

export function getNVGImg(name: string): string | null {
  const attachment = datamap.get(name);
  if (!attachment?.img) return null;
  return `img/humans/attachments/${getFileName(attachment.img)}_small.webp`;
}

export function getWeaponAttachmentImg(name: string): string | null {
  const attachment = datamap.get(name);
  if (!attachment?.img) return null;
  return `img/weapons/attachments/${getFileName(attachment.img)}_small.webp`;
}

export function getEquipmentImg(name: string): string | null {
  const equip = datamap.get(name);
  if (!equip?.img) return null;
  return `img/equipment/${getFileName(equip.img)}.webp`;
}

export function getNameString(name: string): string | null {
  const object = datamap.get(name);
  if (!object?.tooltip) return null;
  return (localization as Record<string, string>)[object.tooltip] || name;
}
