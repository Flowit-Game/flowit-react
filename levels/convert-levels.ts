import fs from "fs";
import {XMLParser} from "fast-xml-parser";
import {levelProgressProps} from "@/pages";

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


["Easy", "Medium", "Hard", "Community"].forEach((category) => {
  const XMLFile = fs.readFileSync(`./Levels/levels${category}.xml`, "utf-8");
  const levels: Array<Array<Array<levelSquareProps>>> = [];
  const defaultLevelProgress: Array<levelProgressProps> = [];
  const parser = new XMLParser({ignoreAttributes: false});
  const levelObj = parser.parse(XMLFile);

  levelObj["levels"]["level"].forEach(
    (levelData: levelDataProps, levelNumber: number) => {
      levels.push([]);
      //@ts-ignore
      defaultLevelProgress.push({status: levelNumber < 5 ? "levelStatus.unlocked" : "levelStatus.locked", best: null})
      const colours = levelData["@_color"].split("\n");
      colours.forEach((line, lineNumber: number) => {
        levels[levelNumber].push([]);
        Array.from(line.trim()).forEach((color) => {
          levels[levelNumber][lineNumber].push({
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
          levels[levelNumber][lineNumber][squareNumber].modifier = mod;
          if (mod !== "Modifier.none") {
            levels[levelNumber][lineNumber][squareNumber].color =
              levels[levelNumber][lineNumber][squareNumber].targetColor;
          } else {
            levels[levelNumber][lineNumber][squareNumber].color = color
          }
        });
      });
    }
  );

  // Stringify, and remove double quotes
  const unquotedLevels = JSON.stringify(levels).replace(/"+/g, "");
  const unquotedProgress = JSON.stringify(defaultLevelProgress).replace(/"+/g, "");
  const outputString = `import { Color, Modifier } from "@/components/Square/Square";
  import {Level} from "@/components/Game/Game";
  import {levelProgressProps} from "@/pages";
  enum levelStatus {unlocked = "unlocked",locked = "locked",complete = "complete"}
  export const ${category}Levels: Array<Level> = ${unquotedLevels}
  export const ${category}DefaultProgress: Array<levelProgressProps> = ${unquotedProgress}`;
  fs.writeFileSync(`./levels/${category}.ts`, outputString);
})
