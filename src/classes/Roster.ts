import { Squad } from "@/classes/Squad";
import type { IRoster } from "@/types/roster";

export class Roster {
  data: IRoster;

  constructor(roster: IRoster) {
    this.data = roster;
  }

  get squads(): Squad[] {
    return this.data.Squad.map((squad) => new Squad(squad));
  }
}
