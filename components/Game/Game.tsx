import {ReactElement, useState} from "react";
import {Color, Modifier, Square, SquareProps} from "../Square/Square";
import styles from "./Game.module.css";

type Level = Array<Array<ReactElement>>;

type GameProps = {
  level: Level;
};

type Coordinate = {
  x: number;
  y: number;
};

export function Game(props: GameProps) {
  const [moves, setMoves] = useState(0);
  const [game, setGame] = useState(loadLevel(props.level));
  const [gameIsWon, setGameIsWon] = useState(false);

  function loadLevel(props: Level) {
    // This would load an xml file, would probably have to loop twice
    // once to load the colours, and once to load the modifiers
    // for now though just use the place holder level 0
    const levelState: Array<Array<SquareProps>> = [];
    for (const [x, row] of props.entries()) {
      levelState.push([]);
      for (const [y, square] of row.entries()) {
        levelState[x].push(
          {
            key: `x${x}y${y}`,
            color: square.props.color,
            targetColor: square.props.targetColor,
            modifier: square.props.modifier,
            x: x,
            y: y,
            onClick: _event => {
              updateGame(x, y)
            }
          }
        );
      }
    }
    return levelState;
  }

  function reset() {
    // TODO This doesn't work... but WHY!?!
    setGame(() => [...loadLevel(props.level)]);
    setMoves(() => 0);
  }

  function includesCoordinate(
    elements: Array<Coordinate>,
    x: number,
    y: number
  ) {
    return elements.some((element) => element.x === x && element.y === y);
  }

  function checkGameIsWon() {
    let won = true;
    game.forEach((row) => {
      row.forEach((square) => {
        if (square.color !== square.targetColor) {
          won = false;
        }
      });
    });
    setGameIsWon(won);
  }

  function getNextSquare(x: number, y: number, direction: Modifier) {
    let nextSquare = undefined;
    try {
      if (direction === Modifier.up || direction === Modifier.rotateUp) {
        nextSquare = game[x - 1][y];
      } else if (
        direction === Modifier.right ||
        direction === Modifier.rotateRight
      ) {
        nextSquare = game[x][y + 1];
      } else if (
        direction === Modifier.down ||
        direction === Modifier.rotateDown
      ) {
        nextSquare = game[x + 1][y];
      } else if (
        direction === Modifier.left ||
        direction === Modifier.rotateLeft
      ) {
        nextSquare = game[x][y - 1];
      } else if (direction === Modifier.none) {
        nextSquare = game[x][y];
      }
    } catch (err) {
    }
    return nextSquare;
  }

  function updateGame(x: number, y: number) {
    if (game[x][y].modifier !== Modifier.none) {
      setMoves((moves) => moves + 1);
    }
    if (
      game[x][y].modifier === Modifier.up ||
      game[x][y].modifier === Modifier.right ||
      game[x][y].modifier === Modifier.down ||
      game[x][y].modifier === Modifier.left ||
      game[x][y].modifier === Modifier.rotateUp ||
      game[x][y].modifier === Modifier.rotateRight ||
      game[x][y].modifier === Modifier.rotateDown ||
      game[x][y].modifier === Modifier.rotateLeft
    ) {
      let nextSquare = getNextSquare(x, y, game[x][y].modifier);
      const newGameState = [...game];
      const arrowColour = game[x][y].color;
      const targetColor =
        nextSquare?.color == game[x][y].color
          ? Color.none
          : game[x][y].color;
      try {
        while (
        // The next square exists on the grid
        nextSquare !== undefined &&
        // and it's not a blank space
        nextSquare.targetColor !== Color.none &&
        // and it's not a modifier square
        nextSquare.modifier === Modifier.none &&
        // and it's either empty, and we are adding colours
        ((nextSquare.color === Color.none &&
            targetColor !== Color.none) ||
          // or it's the arrow colour and we are removing colours
          (nextSquare.color === arrowColour &&
            targetColor === Color.none))
          ) {
          newGameState[nextSquare.x!][nextSquare.y!] =
            {
              key: nextSquare.key,
              targetColor: nextSquare.targetColor,
              modifier: nextSquare.modifier,
              x: nextSquare.x,
              y: nextSquare.y,
              onClick: nextSquare.onClick,
              // Changed values
              color: targetColor,
            };
          setGame(newGameState);
          nextSquare = getNextSquare(
            nextSquare.x!,
            nextSquare.y!,
            game[x][y].modifier
          );
        }
        // If it was a rotating arrow, turn it
        // TODO refactor this
        if (game[x][y].modifier === Modifier.rotateUp) {
          newGameState[x][y] =
            {
              key: game[x][y].key,
              color: game[x][y].color,
              targetColor: game[x][y].targetColor,
              x: game[x][y].x,
              y: game[x][y].y,
              onClick: game[x][y].onClick,
              // Changed values
              modifier: Modifier.rotateRight,
            };
          setGame(newGameState);
        } else if (game[x][y].modifier === Modifier.rotateRight) {
          newGameState[x][y] =
            {
              key: game[x][y].key,
              color: game[x][y].color,
              targetColor: game[x][y].targetColor,
              x: game[x][y].x,
              y: game[x][y].y,
              onClick: game[x][y].onClick,
              // Changed values
              modifier: Modifier.rotateDown,
            };
          setGame(newGameState);
        } else if (game[x][y].modifier === Modifier.rotateDown) {
          newGameState[x][y] =
            {
              key: game[x][y].key,
              color: game[x][y].color,
              targetColor: game[x][y].targetColor,
              x: game[x][y].x,
              y: game[x][y].y,
              onClick: game[x][y].onClick,
              // Changed values
              modifier: Modifier.rotateLeft,
            };
          setGame(newGameState);
        } else if (game[x][y].modifier === Modifier.rotateLeft) {
          newGameState[x][y] =
            {
              key: game[x][y].key,
              color: game[x][y].color,
              targetColor: game[x][y].targetColor,
              x: game[x][y].x,
              y: game[x][y].y,
              onClick: game[x][y].onClick,
              // Changed values
              modifier: Modifier.rotateUp,
            };
          setGame(newGameState);
        }
      } catch (error) {
        console.error(`${error} ${nextSquare}`);
      }
    } else if (game[x][y].modifier === Modifier.bomb) {
      const squaresToUpdate = [
        // Top row
        getNextSquare(x - 1, y - 1, Modifier.none),
        getNextSquare(x - 1, y, Modifier.none),
        getNextSquare(x - 1, y + 1, Modifier.none),
        // Middle row
        getNextSquare(x, y - 1, Modifier.none),
        getNextSquare(x, y, Modifier.none),
        getNextSquare(x, y + 1, Modifier.none),
        // Bottom row
        getNextSquare(x + 1, y - 1, Modifier.none),
        getNextSquare(x + 1, y, Modifier.none),
        getNextSquare(x + 1, y + 1, Modifier.none),
      ];
      const newGameState = [...game];
      const targetColor = game[x][y].color;
      try {
        squaresToUpdate.forEach((square) => {
          if (square !== undefined && square.targetColor !== Color.none) {
            newGameState[square.x!][square.y!] =
              {
                key: game[x][y].key,
                targetColor: game[x][y].targetColor,
                x: game[x][y].x,
                y: game[x][y].y,
                onClick: game[x][y].onClick,
                // Changed values
                color: targetColor,
                modifier: Modifier.none,
              };
            setGame(newGameState);
          }
        });
      } catch (error) {
        console.error(`${error}`);
      }
    } else if (game[x][y].modifier === Modifier.circle) {
      const newGameState = [...game];
      const queue: Array<Coordinate> = [{x: x, y: y}];
      const visited: Array<Coordinate> = [];
      // If any neighbour is empty, but has a target colour
      const fill = (
        (getNextSquare(x, y, Modifier.up)?.color === Color.none &&
          getNextSquare(x, y, Modifier.up)?.targetColor !== Color.none) ||
        (getNextSquare(x, y, Modifier.right)?.color === Color.none &&
          getNextSquare(x, y, Modifier.right)?.targetColor !== Color.none) ||
        (getNextSquare(x, y, Modifier.down)?.color === Color.none &&
          getNextSquare(x, y, Modifier.down)?.targetColor !== Color.none) ||
        (getNextSquare(x, y, Modifier.left)?.color === Color.none &&
          getNextSquare(x, y, Modifier.left)?.targetColor !== Color.none)
      )
      const targetColor = fill ? game[x][y].color : Color.none;
      const replaceColour = fill ? Color.none : game[x][y].color;
      while (queue.length) {
        const current = queue.pop()!;
        // Check the 4 neighbour and add them to the queue
        [Modifier.up, Modifier.right, Modifier.down, Modifier.left].forEach(
          (neighbour) => {
            const nextSquare = getNextSquare(current.x, current.y, neighbour);
            if (
              nextSquare !== undefined &&
              nextSquare.color === replaceColour &&
              nextSquare.modifier === Modifier.none &&
              nextSquare.targetColor !== Color.none &&
              !includesCoordinate(visited, nextSquare.x!, nextSquare.y!) &&
              !includesCoordinate(queue, nextSquare.x!, nextSquare.y!)
            ) {
              queue.push({x: nextSquare.x!, y: nextSquare.y!});
            }
          }
        );
        if (game[current.x][current.y].modifier === Modifier.none) {
          newGameState[current.x][current.y] =
            {
              key: game[current.x][current.y].key,
              targetColor: game[current.x][current.y].targetColor,
              modifier: game[current.x][current.y].modifier,
              x: game[current.x][current.y].x,
              y: game[current.x][current.y].y,
              onClick: game[current.x][current.y].onClick,
              // Changed values
              color: targetColor,
            };
          setGame(newGameState);
        }
        visited.push({x: current.x, y: current.y})
      }
    }
    // Finally
    checkGameIsWon();
  }

  return (
    <>
      {gameIsWon ? <div>WON!!!</div> : null}
      <div className={styles.header}>
        Current: {moves}
        <button onClick={() => reset()}>reset</button>
        Best: todo
      </div>
      <div className={styles.level}>
        <div className={styles.gameBoard}>
          {game.map((row, index) => (
            <div key={index} className={styles.row}>
              {row.map((square) => (
                <Square key={square.key} {...square} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
