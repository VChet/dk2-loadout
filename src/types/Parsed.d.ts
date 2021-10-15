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

export type ComputedLevel = {
  rank: string;
  earnedXp?: number;
  nextLevelXp?: number;
  nextLevel: number;
};
