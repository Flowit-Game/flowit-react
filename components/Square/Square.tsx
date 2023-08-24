import { MouseEventHandler } from "react";
import styles from "./Square.module.css";

export enum Color {
  red = "#FF0000",
  green = "#00FF00",
  yellow = "#F0E000",
  blue = "#0000FF",
  white = "#FFFFFF",
  none = "#00000000", // rgba transparent
}

export enum Modifier {
  none = "none",
  left = "left",
  up = "up",
  right = "right",
  down = "down",
  circle = "circle",
  bomb = "bomb"
}

type SquareProps = {
  key?: string;
  color: Color;
  targetColor: Color;
  modifier: Modifier;
  x?: number;
  y?: number;
  onClick?: MouseEventHandler;
};

export function Square(props: SquareProps) {
  return (
    <button
      className={styles.square}
      style={{ backgroundColor: props.color, borderColor: props.targetColor }}
      onClick={props.onClick}
    >
      <div className={`${styles.modifier} ${styles[props.modifier]}`}/>
      {/*{`${props.x} ${props.y}`}*/}
    </button>
  );
}
