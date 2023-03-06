import styles from "./index.module.css";
import { Square, Color, Modifier } from "@/components/Square/Square";
import Head from "./head";
import { useState } from "react";
import { level } from "@/levels/level-00";

export default function Home() {
  const [game, setGame] = useState(level);

  function updateGame(x: number, y: number) {
    if (game[x][y].props.modifier === Modifier.right) {
      let i = y + 1;
      const newGameState = [...game];
      while (game[x][i].props.color === Color.white) {
        newGameState[x][i] = (
          <Square
            color={Color.red}
            targetColor={Color.red}
            modifier={Modifier.none}
            onClick={() => updateGame(x, i)}
          />
        );
        setGame(newGameState);
        i++;
      }
    }
  }
  return (
    <>
      <Head />
      <main className={styles.main}>
        <div>
          {game.map((row) => (
            <div>{row}</div>
          ))}
        </div>
      </main>
    </>
  );
}
