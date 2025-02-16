import equipmentData from "@/data/equipmentData.json";
import localization from "@/data/localization.json";
import type { ParsedEquipment } from "@/types/parsed";

export const datamap = new Map(equipmentData.map((item) => [item.name, item]));

export function getFileName(filepath: string): string {
  const [name] = filepath.match(/[\w-]+(?=\.)/) ?? [];
  return name ?? filepath;
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

export function getNameString(name: string): string | null {
  const object = datamap.get(name);
  if (!object?.tooltip) return null;
  return (localization as Record<string, string>)[object.tooltip] || name;
}
