import { readdir, readFile, writeFile } from "node:fs/promises";
import { EOL } from "node:os";
import { fileURLToPath } from "node:url";
import { parseXML } from "../helpers/parser";
import type { EquipmentEntry, FileData, Firearm, Helmet } from "@/types/equipment";
import type { ParsedEquipment } from "@/types/parsed";
import type { UnitEntry } from "@/types/unit";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const XML_DIR = `${__dirname}/xml`;
const TXT_DIR = `${__dirname}/txt`;
const EXCLUDED_EQUIPMENT = new Set(["DarknessPenalty", "Extra_MolotovShrapnel", "FeetOfSteel"]);

function hasNVGParam(equipment: EquipmentEntry): equipment is Helmet {
  return "$inventoryBinding" in equipment && equipment.$inventoryBinding === "Helmet";
}
function isSuppressorAvailable(equipment: EquipmentEntry): equipment is Firearm {
  return "$inventoryBinding" in equipment && ["PrimaryWeapon", "SecondaryWeapon"].includes(equipment.$inventoryBinding);
}
function isSuppressed(equipment: EquipmentEntry): equipment is Firearm {
  return "$inventoryBinding" in equipment && ["PrimaryWeaponMuzzle", "SecondaryWeaponMuzzle"].includes(equipment.$inventoryBinding);
}

function composeEquipmentFields(equipment: EquipmentEntry): ParsedEquipment {
  const data: ParsedEquipment = {
    name: equipment.$name,
    tooltip: equipment.$tooltip,
    img: equipment.$img,
    concealment: "ConcealmentModifier" in equipment ? equipment.ConcealmentModifier?.$add : undefined
  };
  if ("MobilityModifiers" in equipment) {
    data.mobility = {
      move: equipment.MobilityModifiers.$moveSpeedModifierPercent,
      turn: equipment.MobilityModifiers.$turnSpeedModifierPercent
    };
  }
  if (hasNVGParam(equipment)) { data.NVGAvailable = equipment.Params.$allowNVG !== false; }
  if (isSuppressorAvailable(equipment)) { data.suppressorAvailable = !!equipment.Params.$suppressedSwitch; }
  if (isSuppressed(equipment)) { data.suppressed = true; }
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
