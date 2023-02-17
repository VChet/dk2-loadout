export interface Id {
  $name: string;
  $portrait: string;
  $gender: number;
  $voicePack: string;
}

export interface TrooperEquipment {
  PrimaryWeapon: { $name: string };
  PrimaryWeaponScope: { $name: string };
  PrimaryWeaponAmmo: { $name: string };
  PrimaryWeaponMuzzle: { $name: string } | "";
  SecondaryWeapon: { $name: string };
  SecondaryWeaponScope: { $name: string };
  SecondaryWeaponAmmo: { $name: string };
  SecondaryWeaponMuzzle: { $name: string } | "";
  Armor: { $name: string };
  Helmet: { $name: string };
  HelmetNVG: { $name: string };
  UtilityPouch1: { $name: string };
  UtilityPouch2: { $name: string };
  SupportGear1: { $name: string } | "";
  SupportGear2: { $name: string } | "";
  SupportGear3: { $name: string } | "";
}

export interface Statistics {
  $xp: number;
  $totalMissionsWon: number;
  $missionFailed: number;
  $mission1Star: number;
  $mission2Star: number;
  $mission3Star: number;
  $bulletsFired: number;
  $bulletsHit: number;
  $kills: number;
  $killsStunnedTarget: number;
  $killsUnawareTarget: number;
  $injuries: number;
  $doorsKicked: number;
  $doorForcedBreaches: number;
  $doorsBlownUp: number;
  $grenadesUsed: number;
  $distanceWalkedMeters: number;
  $completedHealthy: number;
  $perfectAccuracy: number;
  $challengesCompleted: number;
  $bombsDisarmed: number;
  $wallsBreached: number;
  $arrests: number;
  $rescues: number;
  $prev_xp: number;
}

export type TrooperClass = "Assault" | "Support" | "Marksman" | "Grenadier" | "Undercover" | "BlackOps" | "Nowheraki";
export interface ITrooper {
  $class: TrooperClass;
  Id: Id;
  Equipment: Partial<TrooperEquipment>;
  InnateAbilities: {
    InnateAbility: Array<{ $name: string; $percent: number }>;
  };
  Statistics: Statistics;
}

export type SquadUnit = "Rangers" | "CIA" | "Nowheraki";

export interface ISquad {
  $id: number;
  $name: string;
  $unit: SquadUnit;
  Trooper: Array<ITrooper>;
}

export interface IRoster {
  $version: number;
  $numSquads: number;
  Squad: Array<ISquad>;
}
