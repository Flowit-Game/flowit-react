import fs from "fs";
import path from "path";
import {XMLParser} from "fast-xml-parser";
import {LevelData} from "@/components/Game/Game";
import {levelsProps, packChoices} from "@/levels/levelsUtils";

// Only used at build time (getStaticProps), reads the XML files from the levels-source submodule

type levelDataProps = {
  "@_number": string;
  "@_color": string;
  "@_modifier": string;
  "@_solution"?: string;
};

const toLines = (attribute: string) => attribute.split("\n").map((line) => line.trim()).filter((line) => line);

function loadPack(levelPack: packChoices, seenLevelIds: Set<number>): Array<LevelData> {
  const XMLFile = fs.readFileSync(path.join(process.cwd(), "levels-source", `levels${levelPack}.xml`), "utf-8");
  const parser = new XMLParser({ignoreAttributes: false});
  const levelObj = parser.parse(XMLFile);

  return levelObj["levels"]["level"].map((levelData: levelDataProps) => {
    // Level numbers are unique across all packs and are used as level IDs to store progress
    const id = Number(levelData["@_number"]);
    if (!Number.isInteger(id) || seenLevelIds.has(id)) {
      throw new Error(`Missing or duplicate level number "${levelData["@_number"]}" in ${levelPack} pack`);
    }
    seenLevelIds.add(id);
    const solution = levelData["@_solution"]?.split(/[\s,]+/).filter((move) => move);
    return {
      id,
      color: toLines(levelData["@_color"]),
      modifier: toLines(levelData["@_modifier"]),
      optimalMoves: solution?.length ? solution.length : null,
    };
  });
}

export function loadLevels(): levelsProps {
  const seenLevelIds = new Set<number>();
  return {
    "Easy": loadPack("Easy", seenLevelIds),
    "Medium": loadPack("Medium", seenLevelIds),
    "Hard": loadPack("Hard", seenLevelIds),
    "Community": loadPack("Community", seenLevelIds),
  };
}
