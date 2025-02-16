export interface Id {
  $name: string
  $portrait: string
  $gender: number
  $voicePack: string
}

export type TrooperEquipmentEntry = { $name: string };
export interface TrooperEquipment {
  PrimaryWeapon: TrooperEquipmentEntry
  PrimaryWeaponScope: TrooperEquipmentEntry
  PrimaryWeaponAmmo: TrooperEquipmentEntry
  PrimaryWeaponMuzzle: TrooperEquipmentEntry | ""
  SecondaryWeapon: TrooperEquipmentEntry
  SecondaryWeaponScope: TrooperEquipmentEntry
  SecondaryWeaponAmmo: TrooperEquipmentEntry
  SecondaryWeaponMuzzle: TrooperEquipmentEntry | ""
  Armor: TrooperEquipmentEntry
  Helmet: TrooperEquipmentEntry
  HelmetNVG: TrooperEquipmentEntry
  UtilityPouch1: TrooperEquipmentEntry
  UtilityPouch2: TrooperEquipmentEntry
  SupportGear1: TrooperEquipmentEntry | ""
  SupportGear2: TrooperEquipmentEntry | ""
  SupportGear3: TrooperEquipmentEntry | ""
}

export interface Statistics {
  $xp: number
  $totalMissionsWon: number
  $missionFailed: number
  $mission1Star: number
  $mission2Star: number
  $mission3Star: number
  $bulletsFired: number
  $bulletsHit: number
  $kills: number
  $killsStunnedTarget: number
  $killsUnawareTarget: number
  $injuries: number
  $doorsKicked: number
  $doorForcedBreaches: number
  $doorsBlownUp: number
  $grenadesUsed: number
  $distanceWalkedMeters: number
  $completedHealthy: number
  $perfectAccuracy: number
  $challengesCompleted: number
  $bombsDisarmed: number
  $wallsBreached: number
  $arrests: number
  $rescues: number
  $prev_xp: number
}

export type TrooperClass = "Assault" | "Support" | "Marksman" | "Grenadier" | "Undercover" | "BlackOps" | "Nowheraki";
export interface ITrooper {
  $class: TrooperClass
  Id: Id
  Equipment: TrooperEquipment
  InnateAbilities: {
    InnateAbility: { $name: string, $percent: number }[]
  }
  Statistics: Statistics
}

export type SquadUnit = "Rangers" | "CIA" | "Nowheraki";

export interface ISquad {
  $id: number
  $name: string
  $unit: SquadUnit
  Trooper: ITrooper[]
}

export interface IRoster {
  $version: number
  $numSquads: number
  Squad: ISquad[]
}
