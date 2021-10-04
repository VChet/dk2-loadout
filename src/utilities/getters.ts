import equipmentData from "../data/equipmentData.json";
import localization from "../data/localization.json";

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

export function getNameString(name: string): string {
  const object = datamap.get(name);
  return localization[object.tooltip] || name;
}
