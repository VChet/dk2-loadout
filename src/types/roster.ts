export type TrooperClassName = |
  "Assault" |
  "Support" |
  "Marksman" |
  "Grenadier" |
  "SwatLeader" |
  "SwatAssaulter" |
  "SwatSapper" |
  "SwatMilitia" |
  "Undercover" |
  "BlackOps";
export interface Id {
  $name: string
  $portrait: string
  $gender: 0 | 1
  $voicePack: ""
}

interface TrooperEquipmentEntry {
  $name: string
};
export interface TrooperEquipment {
  PrimaryWeapon: TrooperEquipmentEntry | ""
  PrimaryWeaponScope: TrooperEquipmentEntry | ""
  PrimaryWeaponAmmo: TrooperEquipmentEntry | ""
  PrimaryWeaponMuzzle: ""
  SecondaryWeapon: TrooperEquipmentEntry | ""
  SecondaryWeaponScope: TrooperEquipmentEntry | ""
  SecondaryWeaponAmmo: TrooperEquipmentEntry | ""
  SecondaryWeaponMuzzle: ""
  Helmet: TrooperEquipmentEntry
  HelmetNVG: TrooperEquipmentEntry | ""
  Armor: TrooperEquipmentEntry | ""
  UtilityPouch1: TrooperEquipmentEntry
  UtilityPouch2: TrooperEquipmentEntry | ""
  SupportGear1: TrooperEquipmentEntry | ""
  SupportGear2: TrooperEquipmentEntry | ""
  SupportGear3: TrooperEquipmentEntry | ""
  MountedGun: ""
  Custom1: ""
  Custom2: ""
  Custom3: ""
  Custom4: ""
  Custom5: ""
  Custom6: ""
  Custom7: ""
  Custom8: ""
  Custom9: ""
}

type InnateAbility = "Marksmanship" | "AssaultShooting" | "FieldSkills";

export interface Statistics {
  $totalCampaignsPlayed: number
  $totalMissionsWon: number
  $xp: number
  $promoted: number
  $missionFailed: number
  $mission1Star: number
  $mission2Star: number
  $mission3Star: number
  $bulletsFired: number
  $bulletsHit: number
  $kills: number
  $killsStunnedTarget: number
  $killsUnawareTarget: number
  $hitsTaken: number
  $doorsKicked: number
  $doorForcedBreaches: number
  $doorsBlownUp: number
  $explosivesUsed: number
  $distanceWalkedMeters: number
  $distanceSprintMeters: number
  $arrests: number
  $rescues: number
  $challengesCompleted: number
  $bombsDisarmed: number
  $wallsBreached: number
  $completedHealthy: number
  $perfectAccuracy: number
  $jumps: number
  $deaths: number
  $health: number
  $startingHealth: number
  $prev_total_xp: number
}

export interface ITrooper {
  $class: TrooperClassName
  Id: Id
  Equipment: TrooperEquipment
  InnateAbilities: {
    InnateAbility: { $name: InnateAbility, $percent: number }[]
  }
  Statistics: Statistics
}

export type SquadUnit = "Rangers" | "CIA" | "Nowheraki";
export interface ISquad {
  $unit: SquadUnit
  $name: string
  $id: number
  $newTroopsBitset: number
  $battleHonors: number
  Trooper: ITrooper[]
}

export interface IRoster {
  $version: number
  $gameVersion: number
  $numSquads: number
  Squad: ISquad[]
}
