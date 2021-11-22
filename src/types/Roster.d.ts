export interface Id {
  name: string;
  portrait: string;
  gender: number;
  voicePack: string;
}

export interface TrooperEquipment {
  PrimaryWeapon: { name: string };
  PrimaryWeaponScope: { name: string };
  PrimaryWeaponAmmo: { name: string };
  SecondaryWeapon: { name: string };
  SecondaryWeaponScope: { name: string };
  SecondaryWeaponAmmo: { name: string };
  Armor: { name: string };
  UtilityPouch1: { name: string };
  UtilityPouch2: { name: string };
  SupportGear1: { name: string };
  SupportGear2: { name: string };
  SupportGear3: { name: string };
}

export interface Statistics {
  xp: number;
  totalMissionsWon: number;
  missionFailed: number;
  mission1Star: number;
  mission2Star: number;
  mission3Star: number;
  bulletsFired: number;
  bulletsHit: number;
  kills: number;
  killsStunnedTarget: number;
  killsUnawareTarget: number;
  injuries: number;
  doorsKicked: number;
  doorForcedBreaches: number;
  doorsBlownUp: number;
  grenadesUsed: number;
  distanceWalkedMeters: number;
  completedHealthy: number;
  perfectAccuracy: number;
  challengesCompleted: number;
  bombsDisarmed: number;
  arrests: number;
  rescues: number;
  prev_xp: number;
}

export interface Trooper {
  class: string;
  Id: Id;
  Equipment: Partial<TrooperEquipment>;
  InnateAbilities: {
    InnateAbility: Array<{ name: string; percent: number }>;
  };
  Statistics: Statistics;
}

export interface Squad {
  id: number;
  name: string;
  unit: string;
  Trooper: Array<Trooper>;
}

export interface Roster {
  version: number;
  numSquads: number;
  Squad: Array<Squad>;
}

export interface TrooperConcealment {
  value: number;
  text: string;
  color: string;
}
