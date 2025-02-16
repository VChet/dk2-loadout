import { Squad } from "@/classes/Squad";
import type { IRoster } from "@/types/roster";

export class Roster {
  squads: Squad[];

  constructor(roster: IRoster) {
    this.squads = roster.Squad.map((squad) => squad && new Squad(squad));
  }
}
