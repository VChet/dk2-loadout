import { j2xParser, parse } from "fast-xml-parser";

export function parseXml(xml: string) {
  return parse(xml, {
    attributeNamePrefix: "",
    ignoreAttributes: false,
    parseAttributeValue: true,
  });
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
