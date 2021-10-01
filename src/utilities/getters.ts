import { weapons } from "../data/weapons";
import { attachments } from "../data/attachments";
import { equipment } from "../data/equipment";

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

export function getWeaponImg(name: string): string | null {
  const weapon = weapons.find((weapon) => weapon.name === name);
  if (!weapon?.img) return null;
  return `images/weapons/${getFileName(weapon.img)}.webp`;
}

export function getAttachmentImg(name: string): string | null {
  const attachment = attachments.find((attachment) => attachment.name === name);
  if (!attachment?.img) return null;
  return `images/weapons/attachments/${getFileName(attachment.img)}_small.webp`;
}

export function getEquipmentQuantity(name: string): number | null {
  const equip = equipment.find((equip) => equip.name === name);
  if (!equip?.quantity) return null;
  return equip.quantity;
}

export function getEquipmentImg(name: string): string | null {
  const equip = equipment.find((equip) => equip.name === name);
  if (!equip?.img) return null;
  return `images/equipment/${getFileName(equip.img)}.webp`;
}
