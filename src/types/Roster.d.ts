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

export interface Trooper {
  class: string;
  Id: { name: string; portrait: string; gender: string; voicePack: string };
  Equipment: Partial<TrooperEquipment>;
  InnateAbilities: {
    InnateAbility: Array<{ name: string; percent: string }>;
  };
  Statistics: { [key: string]: string };
}

export interface Squad {
  id: string;
  name: string;
  unit: string;
  Trooper: Array<Trooper>;
}

export interface Roster {
  version: string;
  numSquads: string;
  Squad: Array<Squad>;
}

export interface TrooperConcealment {
  value: number;
  text: string;
  color: string;
}
