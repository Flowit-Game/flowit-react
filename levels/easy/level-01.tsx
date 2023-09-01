// This is just a place holder to test with,
// later we will load all the levels by parsing the xml.
import { Color, Modifier } from "@/components/Square/Square";
import {Level} from "@/components/Game/Game";

export const easyLevel1: Level = [
  [
    {
      color: Color.none,
      targetColor: Color.blue,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.none,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.yellow,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.yellow,
      modifier: Modifier.none,
    },
    {
      color: Color.yellow,
      targetColor: Color.yellow,
      modifier: Modifier.left,
    },
  ],
  [
    {
      color: Color.none,
      targetColor: Color.blue,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.none,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.none,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.none,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.none,
      modifier: Modifier.none,
    },
  ],
  [
    {
      color: Color.none,
      targetColor: Color.blue,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.none,
      modifier: Modifier.none,
    },
    {
      color: Color.red,
      targetColor: Color.red,
      modifier: Modifier.down,
    },
    {
      color: Color.none,
      targetColor: Color.none,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.green,
      modifier: Modifier.none,
    },
  ],
  [
    {
      color: Color.none,
      targetColor: Color.blue,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.none,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.red,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.none,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.green,
      modifier: Modifier.none,
    },
  ],
  [
    {
      color: Color.blue,
      targetColor: Color.blue,
      modifier: Modifier.up,
    },
    {
      color: Color.none,
      targetColor: Color.none,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.red,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.none,
      modifier: Modifier.none,
    },
    {
      color: Color.green,
      targetColor: Color.green,
      modifier: Modifier.up,
    },
  ],
];
