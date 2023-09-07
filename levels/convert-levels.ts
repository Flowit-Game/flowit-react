import fs from "fs";
import { XMLParser } from "fast-xml-parser";
import { SquareProps } from "components/Square/Square";

type levelDataProps = {
  "@_number": string;
  "@_color": string;
  "@_modifier": string;
};

const colorMapping = {
  r: "Color.red",
  g: "Color.green",
  b: "Color.blue",
  o: "Color.yellow ",
  d: "Color.indigo ",
  "0": "Color.none",
  X: "Color.none",
};

const modifierMapping = {
  "0": "Modifier.none",
  U: "Modifier.up",
  R: "Modifier.right",
  D: "Modifier.down",
  L: "Modifier.left",
  w: "Modifier.rotateUp",
  d: "Modifier.rotateRight",
  s: "Modifier.rotateDown",
  a: "Modifier.rotateLeft",
  F: "Modifier.circle",
  B: "Modifier.bomb",
};

const easy = fs.readFileSync("./Levels/levelsEasy.xml", "utf-8");

const easyLevels: Array<Array<Array<SquareProps>>> = [];
const parser = new XMLParser({ ignoreAttributes: false });
const levelObj = parser.parse(easy);

levelObj["levels"]["level"].forEach(
  (levelData: levelDataProps, levelNumber: number) => {
    easyLevels.push([]);
    const colours = levelData["@_color"].split("\n");
    colours.forEach((line, lineNumber: number) => {
      easyLevels[levelNumber].push([]);
      Array.from(line.trim()).forEach((color) => {
        //@ts-ignore
        easyLevels[levelNumber][lineNumber].push({
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
        easyLevels[levelNumber][lineNumber][squareNumber].modifier = mod;
        // TODO this doesn't cover cells already filled.
        if (mod !== "Modifier.none") {
          easyLevels[levelNumber][lineNumber][squareNumber].color =
            easyLevels[levelNumber][lineNumber][squareNumber].targetColor;
        } else {
          //@ts-ignore
          easyLevels[levelNumber][lineNumber][squareNumber].color =
            "Color.none";
        }
      });
    });
  }
);

// Stringify, and remove double quotes
const json = JSON.stringify(easyLevels);
const unquoted = json.replace(/"+/g, "");

const easyString = `import { Color, Modifier } from "@/components/Square/Square";
import {Level} from "@/components/Game/Game";

export const easyLevels: Array<Level> = ${unquoted}`;

fs.writeFileSync("./levels/easy.ts", easyString);
