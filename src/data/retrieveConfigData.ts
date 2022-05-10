import { readdir, readFile, writeFile } from "fs/promises";
import { EOL } from "os";
import { parseXml } from "../utilities/parser";
import type { EquipmentEntry, FileData } from "../types/Equipment";
import type { ParsedEquipment } from "../types/Parsed";
import type { UnitEntry } from "../types/Unit";

function getEquipmentFields(equipment: EquipmentEntry): ParsedEquipment {
  const data: ParsedEquipment = {
    name: equipment.$name,
    tooltip: equipment.$tooltip,
    img: equipment.$img,
    concealment: equipment.ConcealmentModifier?.$add,
  };
  if (equipment.MobilityModifiers) {
    data.mobility = {
      move: equipment.MobilityModifiers?.$moveSpeedModifierPercent,
      turn: equipment.MobilityModifiers?.$turnSpeedModifierPercent
    };
  }
  if (equipment.$inventoryBinding === "Helmet") {
    // allowNVG attr is either false or not exists
    data.NVGAvailable = equipment.Params?.$allowNVG !== false;
  }
  if (
    equipment.$inventoryBinding === "PrimaryWeapon" ||
    equipment.$inventoryBinding === "PrimaryWeaponMuzzle" ||
    equipment.$inventoryBinding === "SecondaryWeapon" ||
    equipment.$inventoryBinding === "SecondaryWeaponMuzzle"
  ) {
    data.suppressorAvailable = Boolean(equipment.Params?.$suppressedSwitch);
    data.suppressed = Boolean(equipment.Params?.$suppressedImg);
  }
  return data;
}

function getUnitRanks(unit: UnitEntry) {
  return unit.TrooperRanks.Rank.map((rank) => ({ name: rank.$name, xpNeeded: rank.$xpNeeded }));
}

function readFiles(dirContent: Array<string>, extension: string): Promise<Array<string>> {
  const files = dirContent.filter((file) => file.endsWith(extension));
  if (!files.length) throw new Error(`Empty ${extension} folder`);
  return Promise.all(files.map((file) => readFile(`${__dirname}/${extension}/${file}`, "utf8")));
}

const excludedEquipment: string[] = ["BlackHood", "DarknessPenalty", "Extra_MolotovShrapnel", "FeetOfSteel"];

readdir(`${__dirname}/xml`)
  .then((files) => readFiles(files, "xml"))
  .then((filesContent) => Promise.all(filesContent.map((file) => parseXml(file))))
  .then((data: FileData) => {
    const equipment: Array<ParsedEquipment> = [];
    const ranks: { [key: string]: Array<{ name: string; xpNeeded: number }> } = {};
    data.forEach((entry) => {
      if (typeof entry !== "object") return;
      if (entry.Equipment) {
        Object.entries(entry.Equipment).forEach(([key, value]) => {
          if (key === "Bind") return;
          if (typeof value !== "object") return;
          if (Array.isArray(value)) {
            value.forEach((groupEntry) => {
              if (excludedEquipment.includes(groupEntry.$name)) return;
              equipment.push(getEquipmentFields(groupEntry));
            });
          } else {
            if (excludedEquipment.includes(value.$name)) return;
            equipment.push(getEquipmentFields(value));
          }
        });
      }
      if (entry.Units) {
        Object.values(entry.Units).forEach((value: Array<UnitEntry>) => {
          if (typeof value !== "object") return;
          value.forEach((unit) => {
            ranks[unit.$name] = getUnitRanks(unit);
          });
        });
      }
    });

    return Promise.all([
      writeFile(`${__dirname}/equipmentData.json`, JSON.stringify(equipment, null, 2) + EOL, "utf-8"),
      writeFile(`${__dirname}/ranksData.json`, JSON.stringify(ranks, null, 2) + EOL, "utf-8"),
    ]);
  })
  .then(() => console.log("Finished equipment parsing"))
  .catch((error) => {
    console.error(error);
  });

readdir(`${__dirname}/txt`)
  .then((files) => readFiles(files, "txt"))
  .then((filesContent) => filesContent.reduce((acc, item) => acc + item, ""))
  .then((string: string) => {
    const mappings: { [key: string]: string } = {};
    string.split("\n").forEach((line) => {
      if (!line.startsWith("@")) return;
      const [key, value] = line.split("=");
      mappings[key] = value;
    });
    return mappings;
  })
  .then((mappings) => writeFile(`${__dirname}/localization.json`, JSON.stringify(mappings, null, 2) + EOL, "utf-8"))
  .then(() => console.log("Finished localization parsing"))
  .catch((error) => {
    console.error(error);
  });
