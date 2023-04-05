import type { ParsedEquipment } from "@/types/Parsed";
import type { TrooperEquipment, TrooperEquipmentEntry } from "@/types/Roster";
import {
  getFileName,
  getNameString,
  getHelmetData,
  getWeaponAttachmentImg,
  getWeaponData,
  getNVGImg,
  getEquipmentImg,
  datamap,
} from "@/utilities/getters";

export class Equipment {
  token: string;

  constructor(name: string) {
    this.token = name;
  }

  static init(slot: keyof TrooperEquipment, equipment: TrooperEquipment) {
    const entry = equipment[slot];
    const name = entry ? entry.$name : "";
    switch (slot) {
      case "PrimaryWeapon":
        return new Weapon(name, equipment.PrimaryWeaponAmmo, equipment.PrimaryWeaponScope);
      case "SecondaryWeapon":
        return new Weapon(name, equipment.SecondaryWeaponAmmo, equipment.SecondaryWeaponScope);
      case "Helmet":
        return new Helmet(name, equipment.HelmetNVG);
      case "Armor":
        return new Armor(name);
      case "UtilityPouch1":
      case "UtilityPouch2":
        return new Utility(name);
      case "SupportGear1":
        return new Support(name);
      default:
        throw new Error("Unhandled equipment slot");
    }
  }

  get mobility(): number {
    const move = datamap.get(this.token)?.mobility?.move ?? 0;
    const turn = datamap.get(this.token)?.mobility?.turn ?? 0;
    return move + turn;
  }
  get concealment(): number {
    return datamap.get(this.token)?.concealment ?? 0;
  }
}

export class Weapon extends Equipment {
  #weapon: ParsedEquipment | null;
  ammo: Ammo | null;
  scope: Scope | null;
  constructor(name: string, ammo: TrooperEquipmentEntry, scope: TrooperEquipmentEntry) {
    super(name);
    this.#weapon = getWeaponData(name);
    this.ammo = ammo.$name ? new Ammo(ammo.$name) : null;
    this.scope = scope.$name ? new Scope(scope.$name) : null;
  }

  get name() {
    if (!this.#weapon) return "Empty";
    return getNameString(this.#weapon.name);
  }
  get image() {
    if (!this.#weapon) return null;
    return this.#weapon.img;
  }
  get imageName() {
    if (!this.#weapon) return null;
    return getFileName(this.#weapon.name);
  }
  get isSuppressed(): boolean {
    if (!this.#weapon) return false;
    return !!this.#weapon.suppressorAvailable && !!this.#weapon.suppressed;
  }
}

class WeaponAttachment extends Equipment {
  get name() {
    return getNameString(this.token);
  }
  get imageName() {
    return getFileName(this.token);
  }
  get image() {
    return getWeaponAttachmentImg(this.token);
  }
}
export class Ammo extends WeaponAttachment {}
export class Scope extends WeaponAttachment {}

export class Helmet extends Equipment {
  #helmet: ParsedEquipment | null;
  nvg: NVG | null;
  constructor(name: string, helmetNVG: TrooperEquipmentEntry) {
    super(name);
    this.#helmet = getHelmetData(name);
    this.nvg = helmetNVG ? new NVG(helmetNVG.$name) : null;
  }

  get name() {
    if (!this.#helmet) return "Empty";
    return getNameString(this.#helmet.name);
  }
  get image() {
    if (!this.#helmet) return null;
    return this.#helmet.img;
  }
  get imageName() {
    if (!this.#helmet) return null;
    return getFileName(this.#helmet.name);
  }
  get isNVGAvailable(): boolean {
    if (!this.#helmet) return false;
    return !!this.#helmet.NVGAvailable;
  }
}
export class NVG extends Equipment {
  get name() {
    return getNameString(this.token);
  }
  get image() {
    return getNVGImg(this.token);
  }
  get imageName() {
    return getFileName(this.token);
  }
}

class CommonUtility extends Equipment {
  get name() {
    return getNameString(this.token) ?? "Empty";
  }
  get image() {
    return getEquipmentImg(this.token);
  }
  get imageName() {
    return getFileName(this.token);
  }
}
export class Armor extends CommonUtility {}
export class Utility extends CommonUtility {}
export class Support extends CommonUtility {}
