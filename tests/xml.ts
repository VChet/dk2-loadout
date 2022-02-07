import path from "path";
import { fileURLToPath } from 'url';
import { readFileSync } from "fs";
import { expect, use } from "chai";
import chaiXml from "chai-xml";
import { generateXml, parseXml } from "../src/utilities/parser.js";

use(chaiXml);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rosterFile = path.resolve(__dirname, "test-roster.xml");

describe("XML parser", () => {
  const initialXML = readFileSync(rosterFile, "utf-8");
  it("Initial XML should be valid", () => {
    expect(initialXML).xml.to.be.valid();
  });

  const roster = parseXml(initialXML.toString()).Roster;
  const finalXML = generateXml({ Roster: roster });
  it("Generated XML should be valid", () => {
    expect(finalXML).xml.to.be.valid();
  });
  it("Generated XML should equal initial XML", () => {
    expect(finalXML).xml.to.equal(initialXML);
  });
});
