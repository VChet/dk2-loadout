export type EquipmentEntry = {
  name: string;
  img?: string;
  quantity?: number;
  ClassBinding?: { name: string } | Array<{ name: string }>;
};
