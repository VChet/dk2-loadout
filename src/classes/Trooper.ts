import ranksData from "@/data/ranksData.json";
import localization from "@/data/localization.json";
import { getFileName } from "@/utilities/getters";
import { Equipment } from "@/classes/Equipment";
import type { ITrooper } from "@/types/Roster";
import type { ComputedLevel } from "@/types/Parsed";

export class Trooper {
  #trooper: ITrooper;
  #ranks;
  #defaultConcealment: number;
  portraitFile: string;
  level: ComputedLevel;
  abilities: { name: string; acquired: number }[];
  concealment: number;
  mobility: number;

  constructor(trooper: ITrooper) {
    this.#trooper = trooper;

    if (["Assault", "Support", "Marksman", "Grenadier"].includes(this.class)) {
      this.#ranks = ranksData["Rangers"];
    } else if (["Undercover", "BlackOps"].includes(this.class)) {
      this.#ranks = ranksData["CIA"];
    } else {
      this.#ranks = ranksData["Nowheraki"];
    }

    // Concealment values from entities/humans_goodguys.xml
    if (this.class === "Undercover") {
      this.#defaultConcealment = 10;
    } else if (this.class === "BlackOps") {
      this.#defaultConcealment = 7;
    } else {
      this.#defaultConcealment = 0;
    }

    this.portraitFile = getFileName(this.#trooper.Id.$portrait);
    this.level = this.getLevel();
    this.abilities = this.getAbilities();
    this.concealment = this.getConcealment();
    this.mobility = this.getMobility();
  }

  get id() {
    return this.#trooper.Id;
  }
  get name() {
    return this.#trooper.Id.$name;
  }
  get portraitBig() {
    return `images/portraits/${this.portraitFile}_large.webp`;
  }
  get portraitSmall() {
    return `images/portraits/${this.portraitFile}.webp`;
  }
  get class() {
    return this.#trooper.$class;
  }
  get statistics() {
    return {
      xp: this.#trooper.Statistics.$xp || 0,
      totalMissionsWon: this.#trooper.Statistics.$totalMissionsWon || 0,
      kills: this.#trooper.Statistics.$kills || 0,
      bulletsFired: this.#trooper.Statistics.$bulletsFired || 0,
      doorsKicked: this.#trooper.Statistics.$doorsKicked || 0,
      doorsBlownUp: this.#trooper.Statistics.$doorsBlownUp || 0,
      wallsBreached: this.#trooper.Statistics.$wallsBreached || 0,
      distanceWalkedMeters: this.#trooper.Statistics.$distanceWalkedMeters || 0,
    };
  }
  private getLevel() {
    const level = this.statistics.xp ? this.#ranks.findIndex((rank) => rank.xpNeeded > this.statistics.xp) : 1;
    if (level < 0) {
      return {
        rank: (localization as { [key: string]: string })[this.#ranks[9].name],
        nextLevel: 10,
      };
    } else if (this.statistics.xp) {
      const earnedXp = this.statistics.xp - this.#ranks[level - 1].xpNeeded;
      const nextLevelXp = this.#ranks[level].xpNeeded - this.#ranks[level - 1].xpNeeded;
      return {
        rank: (localization as { [key: string]: string })[this.#ranks[level - 1].name],
        earnedXp,
        nextLevelXp,
        nextLevel: level,
      };
    } else {
      return {
        rank: (localization as { [key: string]: string })[this.#ranks[0].name],
        nextLevel: 1,
      };
    }
  }
  get equipment() {
    return this.#trooper.Equipment;
  }
  private getMobility() {
    let mobility: number = 110;
    Object.values(this.equipment).forEach((item) => {
      mobility += Equipment.getMobility(item.$name);
    });
    return Math.floor(mobility / 10);
  }
  private getConcealment() {
    let concealment = this.#defaultConcealment;
    Object.values(this.equipment).forEach((item) => {
      concealment += Equipment.getConcealment(item.$name);
    });
    return concealment;
  }
  private abilityName(name: string): string {
    switch (name) {
      case "AssaultShooting":
        return "Assault shooting";
      case "FieldSkills":
        return "Field skills";
      default:
        return name;
    }
  }
  private getAbilities() {
    return this.#trooper.InnateAbilities.InnateAbility.map(({ $name, $percent }) => ({
      name: this.abilityName($name),
      acquired: Math.round(Number($percent) / 10),
    }));
  }

  static GetRankProgress({ nextLevel, earnedXp, nextLevelXp }: ComputedLevel) {
    if (earnedXp === 0) return 0;
    if (!earnedXp || !nextLevelXp) return nextLevel === 10 ? 100 : 0;
    return ((earnedXp / nextLevelXp) * 100).toFixed(2);
  }
}
