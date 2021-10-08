export type EquipmentEntry = {
  name: string;
  tooltip: string;
  img?: string;
  quantity?: number;
  inventoryBinding?: string;
  ClassBinding?: { name: string } | Array<{ name: string }>;
  MobilityModifiers?: {
    moveSpeedModifierPercent: number;
    turnSpeedModifierPercent: number;
  };
  ConcealmentModifier?: { add: number };
};
