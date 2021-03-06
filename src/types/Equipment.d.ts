type WeaponCategory = "rifle" | "shotgun" | "pistol" | "rpg";
type InventoryBinding =
  | "PrimaryWeapon"
  | "PrimaryWeaponMuzzle"
  | "PrimaryWeaponScope"
  | "SecondaryWeapon"
  | "SecondaryWeaponMuzzle"
  | "SecondaryWeaponScope"
  | "Armor"
  | "Helmet"
  | "HelmetNVG"
  | "UtilityPouch"
  | "SupportGear1"
  | "SupportGear2"
  | "SupportGear3";
type ClassBinding = "Assault" | "Support" | "Marksman" | "Medic" | "Grenadier" | "BlackOps" | "Undercover";

export type EquipmentEntry = {
  $name: string;
  $tooltip?: string;
  $category?: WeaponCategory;
  $img?: string;
  $quantity?: number;
  $inventoryBinding?: InventoryBinding;
  ClassBinding?: { $name: ClassBinding } | Array<{ $name: ClassBinding }>;
  MobilityModifiers?: {
    $moveSpeedModifierPercent: number;
    $turnSpeedModifierPercent: number;
  };
  ConcealmentModifier?: { $add: number };
  Params?: {
    $suppressedImg: string;
    $suppressedSwitch: string;
    $allowNVG: boolean;
  };
};

export type FileDataEntry = {
  [key: string]: any;
  Equipment?: { [key: string]: EquipmentEntry | Array<EquipmentEntry> };
  Units?: { [key: string]: UnitEntry | Array<UnitEntry> };
};
export type FileData = Array<FileDataEntry>;
