// A good test level because it has a bomb, fill and turning arrow
// 25 didn't originally have one, but I've added one as a test.
import { Color, Modifier } from "@/components/Square/Square";
import {Level} from "@/components/Game/Game";

export const easyLevel3: Level = [
  [
    {
      color: Color.none,
      targetColor: Color.red,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.red,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.blue,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.blue,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.blue,
      modifier: Modifier.none,
    },
  ],
  [
    {
      color: Color.none,
      targetColor: Color.red,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.red,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.blue,
      modifier: Modifier.none,
    },
    {
      color: Color.blue,
      targetColor: Color.blue,
      modifier: Modifier.bomb,
    },
    {
      color: Color.none,
      targetColor: Color.blue,
      modifier: Modifier.none,
    },
  ],
  [
    {
      color: Color.none,
      targetColor: Color.green,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.green,
      modifier: Modifier.none,
    },
    {
      color: Color.yellow,
      targetColor: Color.blue,
      modifier: Modifier.rotateUp,
    },
    {
      color: Color.none,
      targetColor: Color.blue,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.blue,
      modifier: Modifier.none,
    },
  ],
  [
    {
      color: Color.none,
      targetColor: Color.green,
      modifier: Modifier.none,
    },
    {
      color: Color.green,
      targetColor: Color.green,
      modifier: Modifier.bomb,
    },
    {
      color: Color.none,
      targetColor: Color.green,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.red,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.red,
      modifier: Modifier.none,
    },
  ],
  [
    {
      color: Color.none,
      targetColor: Color.green,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.green,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.green,
      modifier: Modifier.none,
    },
    {
      color: Color.none,
      targetColor: Color.red,
      modifier: Modifier.none,
    },
    {
      color: Color.red,
      targetColor: Color.red,
      modifier: Modifier.circle,
    },
  ],
];
