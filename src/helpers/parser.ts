import { XMLBuilder, XMLParser } from "fast-xml-parser";

export const XMLParserInstance = new XMLParser({
  attributeNamePrefix: "$",
  ignoreAttributes: false,
  parseAttributeValue: true
});

export const XMLBuilderInstance = new XMLBuilder({
  attributeNamePrefix: "$",
  ignoreAttributes: false,
  format: true,
  suppressEmptyNode: true,
  suppressBooleanAttributes: false,
  indentBy: "    "
});

export function parseXML(xml: string) {
  return XMLParserInstance.parse(xml);
}

export function generateXML(object: object) {
  return XMLBuilderInstance.build(object);
}
