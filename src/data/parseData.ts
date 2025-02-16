import { readdir, readFile, writeFile } from "node:fs/promises";
import { EOL } from "node:os";
import { fileURLToPath } from "node:url";
import { parseXML } from "../helpers/parser.js";
import type { EquipmentEntry, FileData } from "@/types/equipment.js";
import type { ParsedEquipment } from "@/types/parsed.js";
import type { UnitEntry } from "@/types/unit.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const XML_DIR = `${__dirname}/xml`;
const TXT_DIR = `${__dirname}/txt`;
const EXCLUDED_EQUIPMENT = new Set(["BlackHood", "DarknessPenalty", "Extra_MolotovShrapnel", "FeetOfSteel"]);
const SUPPRESSED_SLOTS = new Set(["PrimaryWeapon", "PrimaryWeaponMuzzle", "SecondaryWeapon", "SecondaryWeaponMuzzle"]);

function composeEquipmentFields(equipment: EquipmentEntry): ParsedEquipment {
  const data: ParsedEquipment = {
    name: equipment.$name,
    tooltip: equipment.$tooltip,
    img: equipment.$img,
    concealment: equipment.ConcealmentModifier?.$add
  };
  if (equipment.MobilityModifiers) {
    data.mobility = {
      move: equipment.MobilityModifiers?.$moveSpeedModifierPercent,
      turn: equipment.MobilityModifiers?.$turnSpeedModifierPercent
    };
  }
  if (equipment.$inventoryBinding === "Helmet") {
    data.NVGAvailable = equipment.Params?.$allowNVG !== false;
  }
  if (equipment.$inventoryBinding && SUPPRESSED_SLOTS.has(equipment.$inventoryBinding)) {
    data.suppressorAvailable = Boolean(equipment.Params?.$suppressedSwitch);
    data.suppressed = Boolean(equipment.Params?.$suppressedImg);
  }
  return data;
}

function composeUnitRanks(unit: UnitEntry) {
  return unit.TrooperRanks.Rank.map(({ $name, $xpNeeded }) => ({ name: $name, xpNeeded: $xpNeeded }));
}

async function readFiles(dir: string, extension: string): Promise<string[]> {
  const files = (await readdir(dir)).filter((file) => file.endsWith(extension));
  if (!files.length) throw new Error(`Empty ${extension} folder`);
  return Promise.all(files.map((file) => readFile(`${dir}/${file}`, "utf8")));
}

async function parseEquipmentData() {
  try {
    const filesContent = await readFiles(XML_DIR, "xml");
    const data: FileData = await Promise.all(filesContent.map(parseXML));
    const equipment: ParsedEquipment[] = [];
    const ranks: Record<string, { name: string, xpNeeded: number }[]> = {};

    for (const entry of data) {
      if (typeof entry !== "object") continue;
      if (entry.Equipment) {
        for (const [key, value] of Object.entries(entry.Equipment)) {
          if (key === "Bind" || typeof value !== "object") continue;
          const groups = Array.isArray(value) ? value : [value];
          for (const group of groups) {
            if (!EXCLUDED_EQUIPMENT.has(group.$name)) { equipment.push(composeEquipmentFields(group)); }
          }
        }
      }
      if (entry.Units) {
        for (const units of Object.values(entry.Units)) {
          if (!Array.isArray(units)) { continue; }
          for (const unit of units) { ranks[unit.$name] = composeUnitRanks(unit); }
        }
      }
    }

    await Promise.all([
      writeFile(`${__dirname}/equipmentData.json`, JSON.stringify(equipment, null, 2) + EOL, "utf-8"),
      writeFile(`${__dirname}/ranksData.json`, JSON.stringify(ranks, null, 2) + EOL, "utf-8")
    ]);
    console.info("✅ Finished equipment parsing");
  } catch (error) {
    console.error("❌ Error parsing equipment data:", error);
  }
}

async function parseLocalization() {
  try {
    const filesContent = await readFiles(TXT_DIR, "txt");
    const mappings: Record<string, string> = {};
    const lines = filesContent.join("").split("\n").filter((line) => line.startsWith("@"));
    for (const line of lines) {
      const [key, value] = line.split("=");
      mappings[key] = value;
    }
    await writeFile(`${__dirname}/localization.json`, JSON.stringify(mappings, null, 2) + EOL, "utf-8");
    console.info("✅ Finished localization parsing");
  } catch (error) {
    console.error("❌ Error parsing localization:", error);
  }
}

parseEquipmentData();
parseLocalization();
