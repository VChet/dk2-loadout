import type { TrooperClassName } from "./roster";

interface Class {
  $name: TrooperClassName
  $nameUI: string
  $description: string
  $numSlots: 1 | 2 | 4 | 8 | 12
  $supply: 50 | 100
  $iconTex: string
  $upgrades: "BH_Defence1, BH_Offence1, BH_Defence2, BH_Offence2"
  $maxUpgradeable: 2
};

interface TrooperRank {
  $name: string
  $xpNeeded: number
  $badgeTex: string
};

interface Rank {
  $xpNeeded: number
  $badgeTex: string
};

export interface UnitEntry {
  $name: string
  $nameUI: string
  $description: string
  $flagTex: string
  $flagColor: string
  $movie: string
  $rndNameEntry: string
  $voicepack: string
  $sniperVoice: string
  $incapacitationChance: number
  $incapacitationChanceCrit: number
  Classes: { Class: Class[] }
  TrooperRanks: { Rank: TrooperRank[] }
  Ranks: { Rank: Rank[] }
};
