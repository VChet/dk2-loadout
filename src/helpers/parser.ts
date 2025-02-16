import { XMLBuilder, XMLParser } from "fast-xml-parser";

export const XMLParserInstance = new XMLParser({
  attributeNamePrefix: "$",
  ignoreAttributes: false,
  parseAttributeValue: true
});

export const XMLBuilderInstance = new XMLBuilder({
  attributeNamePrefix: "$",
  attributesGroupName: false,
  ignoreAttributes: false,
  format: true,
  suppressEmptyNode: true,
  indentBy: "    "
});

export function parseXML(xml: string) {
  return XMLParserInstance.parse(xml);
}

export function generateXML(object: object) {
  return XMLBuilderInstance.build(object);
}
