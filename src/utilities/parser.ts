import { parse, j2xParser } from "fast-xml-parser";

export function parseXml(xml: string) {
  const parsedObject = parse(xml, {
    attributeNamePrefix: "",
    ignoreAttributes: false,
    parseAttributeValue: true,
  });
  return parsedObject;
}

export function generateXml(object: object) {
  const parser = new j2xParser({
    attributeNamePrefix: "",
    attrNodeName: false,
    ignoreAttributes: false,
    format: true,
    supressEmptyNode: true,
    indentBy: "    ",
  });
  return parser.parse(object);
}
