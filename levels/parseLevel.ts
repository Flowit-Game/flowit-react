import {Color, Modifier} from "@/components/Square/Square";
import {Level, LevelData} from "@/components/Game/Game";

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

export function parseLevel(levelData: LevelData): Level {
  const board: Level = levelData.color.map((line) =>
    Array.from(line).map((color) => ({
      targetColor: colorMapping[color] || Color.none,
      modifier: Modifier.none,
      color: Color.none,
    }))
  );
  levelData.modifier.forEach((line, lineNumber: number) => {
    Array.from(line).forEach((modifier, squareNumber: number) => {
      const square = board[lineNumber][squareNumber];
      square.modifier = modifierMapping[modifier] || Modifier.none;
      if (square.modifier !== Modifier.none) {
        square.color = square.targetColor;
      } else {
        // Modifier characters can also give a square its starting color
        square.color = colorMapping[modifier] || Color.none;
      }
    });
  });
  return board;
}
