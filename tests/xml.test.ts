import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { generateXML, parseXML, XMLParserInstance } from "../src/helpers/parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROSTER_FILE = resolve(__dirname, "stub-roster.xml");
const initialXML = readFileSync(ROSTER_FILE, "utf-8");

describe("xml parser", () => {
  it("should parse valid XML without errors", () => {
    expect(() => XMLParserInstance.parse(initialXML)).not.toThrow();
  });

  const roster = parseXML(initialXML.toString()).Roster;
  const resultXML = generateXML({ Roster: roster });

  it("should generate valid XML from parsed data", () => {
    expect(() => XMLParserInstance.parse(resultXML)).not.toThrow();
  });

  it("should generate identical XML", () => {
    const initialLines = initialXML.split(/\r?\n/);
    const resultLines = resultXML.split(/\r?\n/);
    expect(initialLines.length).toBe(resultLines.length);
    initialLines.forEach((line, index) => { expect(resultLines[index]).toBe(line); });
  });
});
