import equipmentData from "@/data/equipmentData.json";
import localization from "@/data/localization.json";
import type { ParsedEquipment } from "@/types/parsed";
import type { TrooperClassName } from "@/types/roster";

export const datamap = new Map(equipmentData.map((item) => [item.name, item]));

export function extractPathSegment(filepath: string): string {
  return filepath.match(/^data\/(?:models|textures)\/(.+)\.dds$/)?.[1] ?? filepath;
}

export function getClassTitle(className: TrooperClassName): string {
  switch (className) {
    case "BlackOps": return "Black Ops";
    case "SwatLeader": return "Leader";
    case "SwatAssaulter": return "Assault";
    case "SwatSapper": return "Sapper";
    case "SwatMilitia": return "Militia";
    default: return className.toLowerCase();
  }
}

function getClassName(className: TrooperClassName): string {
  switch (className) {
    case "Assault": return "assaulter";
    case "SwatLeader": return "nowheraki_leader";
    case "SwatAssaulter": return "nowheraki_assaulter";
    case "SwatSapper": return "nowheraki_sapper";
    case "SwatMilitia": return "nowheraki_militia";
    default: return className.toLowerCase();
  }
}
export function getClassImg(name: TrooperClassName): string {
  return `img/gui/deploy/class_icon_${extractPathSegment(getClassName(name))}.webp`;
}

export function getEquipmentData(name: string): ParsedEquipment | null {
  const equipment = datamap.get(name);
  if (!equipment?.img) return null;
  return { ...equipment, img: `img/${extractPathSegment(equipment.img)}.webp` };
}

export function getAttachmentImg(name: string): string | null {
  const attachment = datamap.get(name);
  if (!attachment?.img) return null;
  return `img/${extractPathSegment(attachment.img)}_small.webp`;
}

export function getEquipmentImg(name: string): string | null {
  const equipment = datamap.get(name);
  if (!equipment?.img) return null;
  return `img/${extractPathSegment(equipment.img)}.webp`;
}

export function getNameString(name: string): string | null {
  const object = datamap.get(name);
  if (!object?.tooltip) return null;
  return (localization as Record<string, string>)[object.tooltip] || name;
}

export function getAbilityName(name: string): string {
  switch (name) {
    case "AssaultShooting": return "Assault shooting";
    case "FieldSkills": return "Field skills";
    default: return name;
  }
}
