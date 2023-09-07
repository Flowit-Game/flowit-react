import * as path from "path";
import fs from 'fs';

const easy = fs.readFileSync('./Levels/levelsEasy.xml', 'utf-8');
// const parser = new DOMParser()
// const easyXML = parser.parseFromString(easy,"text/xml")
console.log(easy);

const easyLevel1 = [
  [
    {
      color: "Color.none",
      targetColor: "Color.blue",
      modifier: "Modifier.none",
    },
    {
      color: "Color.none",
      targetColor: "Color.red",
      modifier: "Modifier.none",
    },
    {
      color: "Color.none",
      targetColor: "Color.red",
      modifier: "Modifier.none",
    },
    {
      color: "Color.none",
      targetColor: "Color.red",
      modifier: "Modifier.none",
    },
    {
      color: "Color.none",
      targetColor: "Color.red",
      modifier: "Modifier.none",
    },
  ],
  [
    {
      color: "Color.none",
      targetColor: "Color.blue",
      modifier: "Modifier.none",
    },
    {
      color: "Color.none",
      targetColor: "Color.red",
      modifier: "Modifier.none",
    },
    {
      color: "Color.none",
      targetColor: "Color.red",
      modifier: "Modifier.none",
    },
    {
      color: "Color.none",
      targetColor: "Color.red",
      modifier: "Modifier.none",
    },
    {
      color: "Color.none",
      targetColor: "Color.red",
      modifier: "Modifier.none",
    },
  ],
  [
    {
      color: "Color.none",
      targetColor: "Color.blue",
      modifier: "Modifier.none",
    },
    {
      color: "Color.none",
      targetColor: "Color.red",
      modifier: "Modifier.none",
    },
    {
      color: "Color.red",
      targetColor: "Color.red",
      modifier: "Modifier.circle",
    },
    {
      color: "Color.none",
      targetColor: "Color.red",
      modifier: "Modifier.none",
    },
    {
      color: "Color.none",
      targetColor: "Color.red",
      modifier: "Modifier.none",
    },
  ],
  [
    {
      color: "Color.none",
      targetColor: "Color.blue",
      modifier: "Modifier.none",
    },
    {
      color: "Color.none",
      targetColor: "Color.red",
      modifier: "Modifier.none",
    },
    {
      color: "Color.none",
      targetColor: "Color.red",
      modifier: "Modifier.none",
    },
    {
      color: "Color.none",
      targetColor: "Color.red",
      modifier: "Modifier.none",
    },
    {
      color: "Color.none",
      targetColor: "Color.red",
      modifier: "Modifier.none",
    },
  ],
  [
    {
      color: "Color.blue",
      targetColor: "Color.blue",
      modifier: "Modifier.up",
    },
    {
      color: "Color.none",
      targetColor: "Color.red",
      modifier: "Modifier.none",
    },
    {
      color: "Color.none",
      targetColor: "Color.red",
      modifier: "Modifier.none",
    },
    {
      color: "Color.none",
      targetColor: "Color.red",
      modifier: "Modifier.none",
    },
    {
      color: "Color.none",
      targetColor: "Color.red",
      modifier: "Modifier.none",
    },
  ],
];

const json = JSON.stringify(easyLevel1);  // {"name":"John Smith"}
console.log(json);
const unquoted = json.replace(/"+/g, '');
console.log(unquoted);

const easyString = `
import { Color, Modifier } from "@/components/Square/Square";
import {Level} from "@/components/Game/Game";

export const easyLevels: Array<Level> = ${unquoted}`

fs.writeFileSync('./levels/easy.ts', easyString)


console.log(path.resolve(__dirname, ".."));