import { readdir, readFile, writeFile } from "fs/promises";
import { EOL } from "os";
import { parseXml } from "../utilities/parser";
import type { EquipmentEntry, FileData, ParsedEquipment } from "../types/Equipment";

function getEquipmentFields(equipment: EquipmentEntry): ParsedEquipment {
  const data: ParsedEquipment = {
    name: equipment.name,
    tooltip: equipment.tooltip,
    img: equipment.img,
    mobility: {
      move: equipment.MobilityModifiers?.moveSpeedModifierPercent,
      turn: equipment.MobilityModifiers?.turnSpeedModifierPercent,
    },
    concealment: equipment.ConcealmentModifier?.add,
  };
  if (["rifle", "pistol"].includes(equipment.category ?? "")) {
    data.suppressorAvailable = Boolean(equipment.Params?.suppressedSwitch);
    data.suppressed = Boolean(equipment.Params?.suppressedImg);
  }
  return data;
}

function readFiles(dirContent: Array<string>, extension: string): Promise<Array<string>> {
  const files = dirContent.filter((file) => file.endsWith(extension));
  if (!files.length) throw new Error(`Empty ${extension} folder`);
  return Promise.all(files.map((file) => readFile(`${__dirname}/${extension}/${file}`, "utf8")));
}

readdir(`${__dirname}/xml`)
  .then((files) => readFiles(files, "xml"))
  .then((filesContent) => Promise.all(filesContent.map((file) => parseXml(file))))
  .then((data: FileData) => {
    const equipment: Array<ParsedEquipment> = [];
    data.forEach((entry) => {
      if (typeof entry !== "object") return;
      if (entry.Equipment) {
        Object.values(entry.Equipment).forEach((value) => {
          if (typeof value !== "object") return;
          if (Array.isArray(value)) {
            value.forEach((groupEntry) => {
              if (groupEntry.name === "DarknessPenalty") return; // Stub from equipment/firearm_scopes.xml
              equipment.push(getEquipmentFields(groupEntry));
            });
          } else {
            equipment.push(getEquipmentFields(value));
          }
        });
      }
    });
    return writeFile(`${__dirname}/equipmentData.json`, JSON.stringify(equipment, null, 2) + EOL, "utf-8");
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
