import { Trooper } from "@/classes/Trooper";
import type { ISquad } from "@/types/Roster";

export class Squad {
  #squad: ISquad;
  classMap: Record<string, Trooper[]>;

  constructor(squad: ISquad) {
    this.#squad = squad;
    this.classMap = squad.Trooper.reduce((acc: Record<string, Trooper[]>, trooper) => {
      const newTrooper = new Trooper(trooper);
      if (!acc[newTrooper.class]) {
        acc[newTrooper.class] = [newTrooper];
      } else {
        acc[newTrooper.class].push(newTrooper);
      }
      return acc;
    }, {});
  }

  get name() {
    return this.#squad.$name;
  }
  get unit() {
    return this.#squad.$unit;
  }
}
