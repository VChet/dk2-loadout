type Class = {
  $name: string
  $numSlots: 4 | 8
  $iconTex: string
};

type TrooperRank = {
  $name: string
  $xpNeeded: number
  $badgeTex: string
};

type Rank = {
  $xpNeeded: number
  $badgeTex: string
};

export type UnitEntry = {
  Classes: { Class: Class[] }
  TrooperRanks: { Rank: TrooperRank[] }
  Ranks: { Rank: Rank[] }
  $name: string
  $nameUI: string
  $description: string
  $flagTex: string
  $rndNameEntry: string
};
