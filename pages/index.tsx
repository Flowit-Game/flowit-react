import styles from "./index.module.css";
import { Square, Color, Modifier } from "@/components/Square/Square";
import Head from "./head";
import { useState } from "react";

export default function Home() {
  const [game, setGame] = useState([
    [
      <Square
        color={Color.red}
        targetColor={Color.red}
        modifier={Modifier.right}
        onClick={() => updateGame(0, 0)}
      />,
      <Square
        color={Color.white}
        targetColor={Color.red}
        modifier={Modifier.none}
        onClick={() => updateGame(0, 1)}
      />,
      <Square
        color={Color.none}
        targetColor={Color.none}
        modifier={Modifier.none}
        onClick={() => updateGame(0, 2)}
      />,
    ],
    [
      <Square
        color={Color.red}
        targetColor={Color.red}
        modifier={Modifier.right}
        onClick={() => updateGame(1, 0)}
      />,
      <Square
        color={Color.white}
        targetColor={Color.red}
        modifier={Modifier.none}
        onClick={() => updateGame(1, 1)}
      />,
      <Square
        color={Color.none}
        targetColor={Color.none}
        modifier={Modifier.none}
        onClick={() => updateGame(1, 2)}
      />,
    ],
  ]);

  function updateGame(x: number, y: number) {
    if (game[x][y].props.modifier === Modifier.right) {
      let i = y + 1;
      while (game[x][i].props.color === Color.white) {
        game[x][i] = (
          <Square
            color={Color.red}
            targetColor={Color.red}
            modifier={Modifier.none}
            onClick={() => updateGame(x, i)}
          />
        );
        // Not working, this doesn't trigger a render
        // but committing what I've got because I'm going to bed.
        setGame(game);
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
