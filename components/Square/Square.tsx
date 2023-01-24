import { MouseEventHandler } from "react";
import styles from "./Square.module.css";

export enum Color {
  red = "#FF0000",
  green = "#00FF00",
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
}

type SquareProps = {
  color: Color;
  targetColor: Color;
  modifier: Modifier;
  onClick: MouseEventHandler;
};

export function Square(props: SquareProps) {
  return (
    <button
      className={styles.square}
      style={{ backgroundColor: props.color, borderColor: props.targetColor }}
      onClick={props.onClick}
    />
  );
}
