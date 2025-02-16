import {
  datamap,
  getEquipmentImg,
  getFileName,
  getHelmetData,
  getNameString,
  getNVGImg,
  getWeaponAttachmentImg,
  getWeaponData
} from "@/helpers/data-getter";
import type { ParsedEquipment } from "@/types/parsed";
import type { TrooperEquipment } from "@/types/roster";

export class Equipment {
  _token: string;

  constructor(name: string) {
    this._token = name;
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

  static getMobility(token: string): number {
    const move = datamap.get(token)?.mobility?.move ?? 0;
    const turn = datamap.get(token)?.mobility?.turn ?? 0;
    return move + turn;
  }
  static getConcealment(token: string): number {
    return datamap.get(token)?.concealment ?? 0;
  }
}

export class Weapon extends Equipment {
  suppressor: Suppressor | null;
  ammo: Ammo | null;
  scope: Scope | null;
  #weapon: ParsedEquipment | null;
  constructor(
    name: string,
    ammo: TrooperEquipment["PrimaryWeaponAmmo"] | TrooperEquipment["SecondaryWeaponAmmo"],
    scope: TrooperEquipment["PrimaryWeaponScope"] | TrooperEquipment["SecondaryWeaponScope"]
  ) {
    super(name);
    this.#weapon = getWeaponData(name);
    this.suppressor = this.#isSuppressorAvailable || this.#isSuppressed ? new Suppressor(this.#isSuppressed) : null;
    this.ammo = ammo ? new Ammo(ammo.$name) : null;
    this.scope = scope ? new Scope(scope.$name) : null;
  }

  get name() {
    if (!this.#weapon) return "Empty";
    return getNameString(this.#weapon.name);
  }
  get image() {
    if (!this.#weapon) return null;
    return this.#weapon.img;
  }
  get imageAltText() {
    if (!this.#weapon) return null;
    return getFileName(this.#weapon.name);
  }
  get #isSuppressorAvailable(): boolean {
    if (!this.#weapon) return false;
    return !!this.#weapon.suppressorAvailable;
  }
  get #isSuppressed(): boolean {
    if (!this.#weapon) return false;
    return !!this.#weapon.suppressed;
  }
}

class WeaponAttachment extends Equipment {
  get name() {
    return getNameString(this._token);
  }
  get imageAltText() {
    return getFileName(this._token);
  }
  get image() {
    return getWeaponAttachmentImg(this._token);
  }
}
export class Suppressor {
  imageAltText: string;
  image: string;
  constructor(isSuppressed: boolean) {
    const fileName = isSuppressed ? "basic_silencer_ui_small" : "silencer_none";
    this.image = `img/weapons/attachments/${fileName}.webp`;
    this.imageAltText = fileName;
  }
}
export class Ammo extends WeaponAttachment {}
export class Scope extends WeaponAttachment {}

export class Helmet extends Equipment {
  nvg: NVG | null;
  #helmet: ParsedEquipment | null;
  constructor(name: string, helmetNVG: TrooperEquipment["HelmetNVG"]) {
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
  get imageAltText() {
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
    return getNameString(this._token);
  }
  get image() {
    return getNVGImg(this._token);
  }
  get imageAltText() {
    return getFileName(this._token);
  }
}

class CommonUtility extends Equipment {
  get name() {
    return getNameString(this._token) ?? "Empty";
  }
  get image() {
    return getEquipmentImg(this._token);
  }
  get imageAltText() {
    return getFileName(this._token);
  }
}
export class Armor extends CommonUtility {}
export class Utility extends CommonUtility {}
export class Support extends CommonUtility {}
