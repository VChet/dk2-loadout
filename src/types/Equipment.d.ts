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

export type ParsedEquipment = {
  name: string;
  tooltip?: string;
  img?: string;
  mobility?: {
    move?: number;
    turn?: number;
  };
  concealment?: number;
  suppressorAvailable?: boolean;
  suppressed?: boolean;
  NVGAvailable?: boolean;
};

export type FileDataEntry = {
  [key: string]: any;
  Equipment?: { [key: string]: EquipmentEntry | Array<EquipmentEntry> };
};
export type FileData = Array<FileDataEntry>;
