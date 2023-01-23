import styles from "./Square.module.css";

export enum Color {
  red = "#FF0000",
  green = "#00FF00",
  blue = "#0000FF",
  white = "#FFFFFF", // None
}

type SquareProps = {
  color: string;
};

export function Square(props: SquareProps) {
  return (
    <td className={styles.square} style={{ backgroundColor: props.color }}></td>
  );
}
