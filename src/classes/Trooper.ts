import { Equipment } from "@/classes/Equipment";
import localization from "@/data/localization.json";
import ranksData from "@/data/ranksData.json";
import { extractPathSegment, getAbilityName } from "@/helpers/data-getter";
import type { ComputedLevel } from "@/types/parsed";
import type { ITrooper } from "@/types/roster";

export class Trooper {
  data: ITrooper;

  constructor(trooper: ITrooper) {
    this.data = trooper;
  }

  get ranks(): { name: string, xpNeeded: number }[] {
    if (["Assault", "Support", "Marksman", "Grenadier"].includes(this.class)) {
      return ranksData.Rangers;
    } else if (["Undercover", "BlackOps"].includes(this.class)) {
      return ranksData.CIA;
    }
    return ranksData.Nowheraki;
  }
  get defaultConcealment(): number {
    // Concealment values from entities/humans_goodguys.xml
    switch (this.class) {
      case "Undercover": return 10;
      case "BlackOps": return 7;
      default: return 0;
    }
  }
  get portraitFile(): string {
    return extractPathSegment(this.data.Id.$portrait);
  }
  get level(): ComputedLevel {
    const level = this.statistics.xp ? this.ranks.findIndex((rank) => rank.xpNeeded > this.statistics.xp) : 1;
    if (level < 0) {
      return {
        rank: (localization as Record<string, string>)[this.ranks[9].name],
        nextLevel: 10
      };
    } else if (this.statistics.xp) {
      const earnedXp = this.statistics.xp - this.ranks[level - 1].xpNeeded;
      const nextLevelXp = this.ranks[level].xpNeeded - this.ranks[level - 1].xpNeeded;
      return {
        rank: (localization as Record<string, string>)[this.ranks[level - 1].name],
        earnedXp,
        nextLevelXp,
        nextLevel: level
      };
    }
    return {
      rank: (localization as Record<string, string>)[this.ranks[0].name],
      nextLevel: 1
    };
  }
  get abilities(): { name: string, acquired: number }[] {
    return this.data.InnateAbilities.InnateAbility.map(({ $name, $percent }) => ({
      name: getAbilityName($name),
      acquired: Math.round(Number($percent) / 10)
    }));
  }
  get concealment(): number {
    let concealment = this.defaultConcealment;
    Object.values(this.equipment).forEach((item) => {
      concealment += Equipment.getConcealment(item.$name);
    });
    return concealment;
  }
  get mobility(): number {
    let mobility: number = 110;
    Object.values(this.equipment).forEach((item) => {
      mobility += Equipment.getMobility(item.$name);
    });
    return Math.floor(mobility / 10);
  }

  get id() {
    return this.data.Id;
  }
  get name() {
    return this.data.Id.$name;
  }
  get portraitBig() {
    return `img/${this.portraitFile}_large.webp`;
  }
  get portraitSmall() {
    return `img/${this.portraitFile}.webp`;
  }
  get class() {
    return this.data.$class;
  }
  get statistics() {
    return {
      xp: this.data.Statistics.$xp || 0,
      totalMissionsWon: this.data.Statistics.$totalMissionsWon || 0,
      kills: this.data.Statistics.$kills || 0,
      bulletsFired: this.data.Statistics.$bulletsFired || 0,
      doorsKicked: this.data.Statistics.$doorsKicked || 0,
      doorsBlownUp: this.data.Statistics.$doorsBlownUp || 0,
      wallsBreached: this.data.Statistics.$wallsBreached || 0,
      distanceWalkedMeters: this.data.Statistics.$distanceWalkedMeters || 0
    };
  }
  get equipment() {
    return this.data.Equipment;
  }

  static GetRankProgress({ nextLevel, earnedXp, nextLevelXp }: ComputedLevel) {
    if (earnedXp === 0) return 0;
    if (!earnedXp || !nextLevelXp) return nextLevel === 10 ? 100 : 0;
    return ((earnedXp / nextLevelXp) * 100).toFixed(2);
  }
}
