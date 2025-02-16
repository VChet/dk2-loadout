export interface ParsedEquipment {
  name: string
  tooltip?: string
  img?: string
  mobility?: {
    move?: number
    turn?: number
  }
  concealment?: number
  suppressorAvailable?: boolean
  suppressed?: boolean
  NVGAvailable?: boolean
};

export interface ComputedLevel {
  rank: string
  nextLevel: number
  earnedXp?: number
  nextLevelXp?: number
};
