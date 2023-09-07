import { MouseEventHandler } from "react";
import styles from "./Square.module.css";

export enum Color {
  red = "#f51518",
  green = "#689f38",
  blue = "#68a6e5",
  yellow = "#f6ca18",
  indigo = "#7d6a6c",
  none = "#00000000", // rgba transparent
}

export enum Modifier {
  none = "none",
  up = "up",
  right = "right",
  down = "down",
  left = "left",
  rotateUp = "rotateUp",
  rotateRight = "rotateRight",
  rotateDown = "rotateDown",
  rotateLeft = "rotateLeft",
  circle = "circle",
  bomb = "bomb"
}

export type SquareProps = {
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
