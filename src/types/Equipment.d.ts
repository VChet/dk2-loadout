export type EquipmentEntry = {
  name: string;
  tooltip: string;
  img?: string;
  quantity?: number;
  ClassBinding?: { name: string } | Array<{ name: string }>;
  inventoryBinding?: string;
};
