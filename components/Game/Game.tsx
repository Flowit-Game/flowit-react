import { useState, ReactElement } from "react";
import { Modifier, Color, Square } from "../Square/Square";
import styles from "./Game.module.css";

type Level = Array<Array<ReactElement>>;

type GameProps = {
  level: Level;
};

export function Game(props: GameProps) {
  const [moves, setMoves] = useState(0);
  const [game, setGame] = useState(loadLevel(props.level));

  function loadLevel(props: Level) {
    // This would load an xml file, would probably have to loop twice
    // once to load the colours, and once to load the modifiers
    // for now though just use the place holder level 0
    const levelState: Array<Array<ReactElement>> = [];
    for (const [x, row] of props.entries()) {
      levelState.push([]);
      for (const [y, square] of row.entries()) {
        levelState[x].push(
          <Square
            {...square.props}
            x={x}
            y={y}
            onClick={() => updateGame(x, y)}
          />
        );
      }
    }
    return levelState;
  }

  function updateGame(x: number, y: number) {
    // Problems:
    // * Error when there is no next cell (i.e. edge of level).
    // * Fills in cells that are meant to remain empty (i.e. targetColor is none)
    // * Need to handle all 4 directions in one statement
    // * Remove color when clicked a second time.
    setMoves((moves) => moves + 1);
    if (game[x][y].props.modifier === Modifier.up) {
      let i = x - 1;
      const newGameState = [...game];
      const color = game[x][y].props.color;
      try {
        while (game[i][y].props.color === Color.none) {
          newGameState[i][y] = (
            <Square
              {...game[i][y].props}
              color={color}
              modifier={Modifier.none}
              onClick={() => updateGame(i, y)}
            />
          );
          setGame(newGameState);
          i = i - 1;
        }
      } catch (error) {
        console.error(`${error} ${x} ${i}`);
      }
    }
  }

  return (
    <>
      <div className={styles.header}>Current: {moves} Best: todo</div>
      <div className={styles.level}>
        <div>
          {game.map((row) => (
            <div>{row}</div>
          ))}
        </div>
      </div>
    </>
  );
}
