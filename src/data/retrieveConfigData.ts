import { readdir, readFile, writeFile } from "fs/promises";
import { parseXml } from "../utilities/parser";
import type { EquipmentEntry } from "../types/Equipment";

function getEquipmentFields(equipment: EquipmentEntry) {
  return {
    name: equipment.name,
    tooltip: equipment.tooltip,
    img: equipment.img,
    unit: equipment.ClassBinding,
    inventoryBinding: equipment.inventoryBinding,
  };
}

function readFiles(
  dirContent: Array<string>,
  extension: string
): Promise<Array<string>> {
  const files = dirContent.filter((file) => file.endsWith(extension));
  if (!files.length) throw new Error(`Empty ${extension} folder`);
  return Promise.all(
    files.map((file) => readFile(`${__dirname}/${extension}/${file}`, "utf8"))
  );
}

readdir(`${__dirname}/xml`)
  .then((files) => readFiles(files, "xml"))
  .then((filesContent) =>
    Promise.all(filesContent.map((file) => parseXml(file)))
  )
  .then((data: Array<any>) => {
    const equipment = [];
    data.forEach((entry) => {
      if (typeof entry !== "object") return;
      Object.values(entry.Equipment).forEach(
        (value: EquipmentEntry | Array<EquipmentEntry>) => {
          if (typeof value !== "object") return;
          if (Array.isArray(value)) {
            value.forEach((groupEntry: EquipmentEntry) => {
              equipment.push(getEquipmentFields(groupEntry));
            });
          } else {
            equipment.push(getEquipmentFields(value));
          }
        }
      );
    });
    return writeFile(
      `${__dirname}/equipmentData.json`,
      JSON.stringify(equipment),
      "utf-8"
    );
  })
  .then(() => console.log("Finished equipment parsing"))
  .catch((error) => {
    console.error(error);
  });

readdir(`${__dirname}/txt`)
  .then((files) => readFiles(files, "txt"))
  .then((filesContent) => filesContent.reduce((acc, item) => (acc += item), ""))
  .then((string: string) => {
    const mappings: { [key: string]: string } = {};
    string.split("\n").forEach((line) => {
      if (!line.startsWith("@")) return;
      const [key, value] = line.split("=");
      mappings[key] = value;
    });
    return mappings;
  })
  .then((mappings) =>
    writeFile(
      `${__dirname}/localization.json`,
      JSON.stringify(mappings),
      "utf-8"
    )
  )
  .then(() => console.log("Finished localization parsing"))
  .catch((error) => {
    console.error(error);
  });
