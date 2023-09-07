import fs from 'fs';
import {XMLParser} from "fast-xml-parser";

const easy = fs.readFileSync('./Levels/levelsEasy.xml', 'utf-8');

// @ts-ignore
const easyLevels = [[]]
const parser = new XMLParser({ignoreAttributes: false});
const levelObj = parser.parse(easy);


type levelDataProps = {
  '@_number': string,
  '@_color': string
  '@_modifier': string,
}

levelObj['levels']['level'].forEach((levelData: levelDataProps) => {
  console.log(levelData)
  const colours = levelData["@_color"].split("\n")
  colours.forEach((line) => {
    console.log(line.trim())
  })
})


// Stringify, and remove double quotes
const json = JSON.stringify(easyLevels);
const unquoted = json.replace(/"+/g, '');

const easyString = `import { Color, Modifier } from "@/components/Square/Square";
import {Level} from "@/components/Game/Game";

export const easyLevels: Array<Level> = ${unquoted}`

fs.writeFileSync('./levels/easy.ts', easyString)