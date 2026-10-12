import fs from "fs";
import {XMLParser} from "fast-xml-parser";

type levelDataProps = {
  "@_number": string;
  "@_color": string;
  "@_modifier": string;
};

type levelSquareProps = {
  targetColor: string,
  modifier?: string,
  color?: string,
}

const colorMapping = {
  "r": "Color.red",
  "g": "Color.green",
  "b": "Color.blue",
  "o": "Color.yellow ",
  "d": "Color.indigo ",
  "0": "Color.none",
  "X": "Color.none",
};

const modifierMapping = {
  "0": "Modifier.none",
  "U": "Modifier.up",
  "R": "Modifier.right",
  "D": "Modifier.down",
  "L": "Modifier.left",
  "w": "Modifier.rotateUp",
  "x": "Modifier.rotateRight",
  "s": "Modifier.rotateDown",
  "a": "Modifier.rotateLeft",
  "F": "Modifier.circle",
  "B": "Modifier.bomb",
};


// Level numbers are unique across all packs and are used as level IDs to store progress
const seenLevelIds = new Set<number>();

["Easy", "Medium", "Hard", "Community"].forEach((levelPack) => {
  const XMLFile = fs.readFileSync(`./Levels/levels${levelPack}.xml`, "utf-8");
  const levels: Array<{id: number, board: Array<Array<levelSquareProps>>}> = [];
  const parser = new XMLParser({ignoreAttributes: false});
  const levelObj = parser.parse(XMLFile);

  levelObj["levels"]["level"].forEach(
    (levelData: levelDataProps, levelNumber: number) => {
      const id = Number(levelData["@_number"]);
      if (!Number.isInteger(id) || seenLevelIds.has(id)) {
        throw new Error(`Missing or duplicate level number "${levelData["@_number"]}" in ${levelPack} pack`);
      }
      seenLevelIds.add(id);
      levels.push({id, board: []});
      const colours = levelData["@_color"].split("\n");
      colours.forEach((line, lineNumber: number) => {
        levels[levelNumber].board.push([]);
        Array.from(line.trim()).forEach((color) => {
          levels[levelNumber].board[lineNumber].push({
            //@ts-ignore
            targetColor: colorMapping[color] || "Color.none",
          });
        });
      });
      const modifiers = levelData["@_modifier"].split("\n");
      modifiers.forEach((line, lineNumber: number) => {
        Array.from(line.trim()).forEach((modifier, squareNumber: number) => {
          //@ts-ignore
          const mod = modifierMapping[modifier] || "Modifier.none";
          //@ts-ignore
          const color = colorMapping[modifier] || "Color.none"
          levels[levelNumber].board[lineNumber][squareNumber].modifier = mod;
          if (mod !== "Modifier.none") {
            levels[levelNumber].board[lineNumber][squareNumber].color =
              levels[levelNumber].board[lineNumber][squareNumber].targetColor;
          } else {
            levels[levelNumber].board[lineNumber][squareNumber].color = color
          }
        });
      });
    }
  );

  // Stringify, and remove double quotes
  const unquotedLevels = JSON.stringify(levels).replace(/"+/g, "");
  const outputString = `import { Color, Modifier } from "@/components/Square/Square";
  import {LevelData} from "@/components/Game/Game";
  export const ${levelPack}Levels: Array<LevelData> = ${unquotedLevels}`;
  fs.writeFileSync(`./levels/${levelPack}.ts`, outputString);
})
