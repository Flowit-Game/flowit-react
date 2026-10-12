import fs from "fs";
import path from "path";
import {XMLParser} from "fast-xml-parser";
import {Color, Modifier, SquareProps} from "@/components/Square/Square";
import {LevelData} from "@/components/Game/Game";
import {levelsProps, packChoices} from "@/levels/levelsUtils";

// Only used at build time (getStaticProps), reads the XML files from the levels-source submodule

type levelDataProps = {
  "@_number": string;
  "@_color": string;
  "@_modifier": string;
};

const colorMapping: Record<string, Color> = {
  "r": Color.red,
  "g": Color.green,
  "b": Color.blue,
  "o": Color.yellow,
  "d": Color.indigo,
  "0": Color.none,
  "X": Color.none,
};

const modifierMapping: Record<string, Modifier> = {
  "0": Modifier.none,
  "U": Modifier.up,
  "R": Modifier.right,
  "D": Modifier.down,
  "L": Modifier.left,
  "w": Modifier.rotateUp,
  "x": Modifier.rotateRight,
  "s": Modifier.rotateDown,
  "a": Modifier.rotateLeft,
  "F": Modifier.circle,
  "B": Modifier.bomb,
};

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

    const board: Array<Array<SquareProps>> = levelData["@_color"].split("\n").map((line) =>
      Array.from(line.trim()).map((color) => ({
        targetColor: colorMapping[color] || Color.none,
        modifier: Modifier.none,
        color: Color.none,
      }))
    );
    levelData["@_modifier"].split("\n").forEach((line, lineNumber: number) => {
      Array.from(line.trim()).forEach((modifier, squareNumber: number) => {
        const square = board[lineNumber][squareNumber];
        square.modifier = modifierMapping[modifier] || Modifier.none;
        if (square.modifier !== Modifier.none) {
          square.color = square.targetColor;
        } else {
          square.color = colorMapping[modifier] || Color.none;
        }
      });
    });
    return {id, board};
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
