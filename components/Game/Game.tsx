import { useState, useEffect } from "react";
import { Modifier, Color, Square } from "../Square/Square";

type GameProps = {
  level: Array<Array<any>>;
};

export function Game(props: GameProps) {
  const [game, setGame] = useState(props.level);
  // TODO: this section is not working, doesn't seem to trigger on load.
  // Add onclick events to all the squares, I don't think this is the right way to 
  // do it anyway, maybe better to do it when loading the level? like build the level
  useEffect(() => {
    for (const [x, row] of game.entries()) {
      for (const [y, square] of row.entries()) {
        // square.props.color=Color.blue;
        // game[x][y].props.onClick = () => updateGame(x, y);
        // console.log(`${x} ${y} ${square} ${square.props.onClick}`)
        game[x][y] = (
          <Square {...square.props} onClick={() => updateGame(x, y)} />
        );
      }
    }
  }, [game]);

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
    if (game[x][y].props.modifier === Modifier.up) {
      let i = x + 1;
      const newGameState = [...game];
      while (game[i][y].props.color === Color.none) {
        newGameState[i][y] = (
          <Square
            color={Color.red}
            targetColor={Color.red}
            modifier={Modifier.none}
            onClick={() => updateGame(i, y)}
          />
        );
        setGame(newGameState);
        i++;
      }
    }
  }
  return (
    <div>
      {game.map((row) => (
        <div>{row}</div>
      ))}
    </div>
  );
}
