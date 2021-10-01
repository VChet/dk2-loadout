import { weapons } from "../data/weapons";
import { attachments } from "../data/attachments";

export function getFileName(filepath: string): string {
  return filepath.split("\\").pop().split("/").pop().split(".").shift();
}

export function getWeaponImg(name: string): string | null {
  const weapon = weapons.find((weapon) => weapon.name === name);
  if (!weapon) return null;
  return getFileName(weapon.img);
}

export function getAttachmentImg(name: string): string | null {
  const attachment = attachments.find((attachment) => attachment.name === name);
  if (!attachment) return null;
  return getFileName(attachment.img);
}
