import type { Roster } from "./types/Roster";

export function parseXml(xml: string): Roster {
  if (!window.DOMParser) throw new Error("Cannot parse XML");
  const dom: XMLDocument = new DOMParser().parseFromString(xml, "text/xml");

  function parseNode(xmlNode, result: { [key: string]: any }) {
    if (xmlNode.nodeName === "#text") {
      const v = xmlNode.nodeValue;
      if (v.trim()) result["#text"] = v;
      return;
    }

    const jsonNode = {};
    const existing = result[xmlNode.nodeName];

    if (existing) {
      if (!Array.isArray(existing)) {
        result[xmlNode.nodeName] = [existing, jsonNode];
      } else {
        result[xmlNode.nodeName].push(jsonNode);
      }
    } else {
      result[xmlNode.nodeName] = jsonNode;
    }

    if (xmlNode.attributes) {
      for (let attribute of xmlNode.attributes) {
        jsonNode[attribute.nodeName] = attribute.nodeValue;
      }
    }

    for (let node of xmlNode.childNodes) parseNode(node, jsonNode);
  }

  const result: { Roster: Roster } = {} as { Roster: Roster };
  for (let node of dom.childNodes) parseNode(node, result);

  return result.Roster;
}
