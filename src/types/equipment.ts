import type { SupportGear } from "./equipment/support";
import type { UnitEntry } from "./unit";

interface Ammo {
  $name: string
  $tooltip: string
  $description: string
  $img: string
}
interface Scope {
  $name: string
  $inventoryBinding: "PrimaryWeaponScope" | "SecondaryWeaponScope"
  $tooltip: string
  $description: string
  $category: "magnified"
  $img: string
}
export interface Firearm {
  $name: string
  $inventoryBinding: "PrimaryWeapon" | "SecondaryWeapon" | "PrimaryWeaponMuzzle" | "SecondaryWeaponMuzzle" | "SupportGear1"
  $category: "rifle" | "lmg" | "dmr" | "shotgun" | "rpg" | "pistol"
  $unlockCost: number
  $tooltip: string
  $description: string
  $img: string
  $animationSet: string
  MobilityModifiers: {
    $moveSpeedModifierPercent: number
    $turnSpeedModifierPercent: number
  }
  ConcealmentModifier: { $add: number }
  Params: {
    $suppressedImg?: string
    $suppressedSwitch?: string
  }
  $sortId?: number
  $movie?: string
  $soundUseVoice?: string
}
export interface Helmet {
  $name: string
  $inventoryBinding: "Helmet"
  $unlockCostBH: number
  $tooltip: string
  $description: string
  $img: string
  MobilityModifiers: {
    $moveSpeedModifierPercent: number
    $turnSpeedModifierPercent: number
  }
  ConcealmentModifier: { $add: number }
  Params: {
    $allowNVG?: false
  }
}
interface HelmetNVG {
  $name: string
  $inventoryBinding: "HelmetNVG"
  $unlockCost: number
  $tooltip: string
  $description: string
  $img: string
  MobilityModifiers: {
    $moveSpeedModifierPercent: number
    $turnSpeedModifierPercent: number
  }
  ConcealmentModifier: { $add: number }
}
interface Grenade {
  $name: string
  $inventoryBinding: "UtilityPouch"
  $quantity: number
  $tooltip: string
  $description: string
  $img: string
  $movie: string
  $animationSet: string
  $soundUse: string
  $soundUseVoice: string
  MobilityModifiers: {
    $moveSpeedModifierPercent: number
    $turnSpeedModifierPercent: number
  }
  ConcealmentModifier: { $add: number }
}
interface Armor {
  $name: string
  $inventoryBinding: "Armor"
  $unlockCost: number
  $tooltip: string
  $description: string
  $img: string
  MobilityModifiers: {
    $moveSpeedModifierPercent: number
    $turnSpeedModifierPercent: number
  }
  ConcealmentModifier: { $add: number }
}

export type EquipmentEntry = |
  Ammo |
  Scope |
  Firearm |
  Helmet |
  HelmetNVG |
  Grenade |
  SupportGear |
  Armor;

export interface FileDataEntry {
  [key: string]: any
  Equipment?: Record<string, EquipmentEntry | EquipmentEntry[]>
  Units?: Record<string, UnitEntry | UnitEntry[]>
};
export type FileData = FileDataEntry[];
