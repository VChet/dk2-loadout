import { readdir, readFile, writeFile } from "fs/promises";
import { parseXml } from "../utilities/parser";
import type { EquipmentEntry } from "../types/Equipment";

function getEquipmentFields(equipment: EquipmentEntry) {
  return {
    name: equipment.name,
    img: equipment.img,
    quantity: equipment.quantity,
    unit: equipment.ClassBinding,
  };
}

readdir(`${__dirname}/xml`)
  .then((files: Array<string>) =>
    Promise.all(
      files.map((file) => readFile(`${__dirname}/xml/${file}`, "utf8"))
    )
  )
  .then((filesContent: Array<string>) =>
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
  .then(() => console.log("Finished"))
  .catch((error) => {
    console.error(error);
  });
