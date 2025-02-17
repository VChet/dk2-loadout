import { Trooper } from "@/classes/Trooper";
import type { ISquad, TrooperClassName } from "@/types/roster";

export class Squad {
  data: ISquad;

  constructor(squad: ISquad) {
    this.data = squad;
  }

  get classMap(): Record<TrooperClassName, Trooper[]> {
    return this.data.Trooper.reduce((acc: Record<string, Trooper[]>, trooper) => {
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
    return this.data.$name;
  }
  get unit() {
    return this.data.$unit;
  }
}
