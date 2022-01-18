import { XMLBuilder, XMLParser } from "fast-xml-parser";

export function parseXml(xml: string) {
  const parser = new XMLParser({
    attributeNamePrefix: "",
    ignoreAttributes: false,
    parseAttributeValue: true,
  });
  return parser.parse(xml);
}

export function generateXml(object: object) {
  const builder = new XMLBuilder({
    attributeNamePrefix: "",
    attributesGroupName: false,
    ignoreAttributes: false,
    format: true,
    suppressEmptyNode: true,
    indentBy: "    ",
  });
  return builder.build(object);
}
