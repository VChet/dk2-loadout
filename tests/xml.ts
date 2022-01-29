import path from "path";
import { readFileSync } from "fs";
import { expect, use } from "chai";
import chaiXml from "chai-xml";
import { generateXml, parseXml } from "../src/utilities/parser";

use(chaiXml);

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
