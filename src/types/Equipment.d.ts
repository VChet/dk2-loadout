export type WeaponCategory = "rifle" | "shotgun" | "pistol" | "rpg";

export type EquipmentEntry = {
  name: string;
  tooltip?: string;
  category?: WeaponCategory;
  img?: string;
  quantity?: number;
  inventoryBinding?: string;
  ClassBinding?: { name: string } | Array<{ name: string }>;
  MobilityModifiers?: {
    moveSpeedModifierPercent: number;
    turnSpeedModifierPercent: number;
  };
  ConcealmentModifier?: { add: number };
  Params?: { suppressedImg: string; suppressedSwitch: string };
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
};
