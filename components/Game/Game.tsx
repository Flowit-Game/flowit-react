import {ReactElement, useState} from "react";
import {Color, Modifier, Square} from "../Square/Square";
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
    const levelState: Array<Array<ReactElement>> = [];
    for (const [x, row] of props.entries()) {
      levelState.push([]);
      for (const [y, square] of row.entries()) {
        levelState[x].push(
          <Square
            {...square.props}
            key={`x${x}y${y}`}
            x={x}
            y={y}
            onClick={() => updateGame(x, y)}
          />
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
        if (square.props.color !== square.props.targetColor) {
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
    } catch (err) {}
    return nextSquare;
  }

  function updateGame(x: number, y: number) {
    if (game[x][y].props.modifier !== Modifier.none) {
      setMoves((moves) => moves + 1);
    }
    if (
      game[x][y].props.modifier === Modifier.up ||
      game[x][y].props.modifier === Modifier.right ||
      game[x][y].props.modifier === Modifier.down ||
      game[x][y].props.modifier === Modifier.left ||
      game[x][y].props.modifier === Modifier.rotateUp ||
      game[x][y].props.modifier === Modifier.rotateRight ||
      game[x][y].props.modifier === Modifier.rotateDown ||
      game[x][y].props.modifier === Modifier.rotateLeft
    ) {
      let nextSquare = getNextSquare(x, y, game[x][y].props.modifier);
      const newGameState = [...game];
      const arrowColour = game[x][y].props.color;
      const targetColor =
        nextSquare?.props.color == game[x][y].props.color
          ? Color.none
          : game[x][y].props.color;
      try {
        while (
          // The next square exists on the grid
          nextSquare !== undefined &&
          // and it's not a blank space
          nextSquare?.props.targetColor !== Color.none &&
          // and it's not a modifier square
          nextSquare?.props.modifier === Modifier.none &&
          // and it's either empty, and we are adding colours
          ((nextSquare?.props.color === Color.none &&
            targetColor !== Color.none) ||
            // or it's the arrow colour and we are removing colours
            (nextSquare?.props.color === arrowColour &&
              targetColor === Color.none))
        ) {
          newGameState[nextSquare.props.x][nextSquare.props.y] = (
            <Square
              {...nextSquare.props}
              color={targetColor}
              modifier={Modifier.none}
            />
          );
          setGame(newGameState);
          nextSquare = getNextSquare(
            nextSquare.props.x,
            nextSquare.props.y,
            game[x][y].props.modifier
          );
        }
        // If it was a rotating arrow, turn it
        // TODO refactor this
        if (game[x][y].props.modifier === Modifier.rotateUp) {
          newGameState[x][y] = (
            <Square
              {...newGameState[x][y].props}
              modifier={Modifier.rotateRight}
            />
          );
          setGame(newGameState);
        } else if (game[x][y].props.modifier === Modifier.rotateRight) {
          newGameState[x][y] = (
            <Square
              {...newGameState[x][y].props}
              modifier={Modifier.rotateDown}
            />
          );
          setGame(newGameState);
        } else if (game[x][y].props.modifier === Modifier.rotateDown) {
          newGameState[x][y] = (
            <Square
              {...newGameState[x][y].props}
              modifier={Modifier.rotateLeft}
            />
          );
          setGame(newGameState);
        } else if (game[x][y].props.modifier === Modifier.rotateLeft) {
          newGameState[x][y] = (
            <Square
              {...newGameState[x][y].props}
              modifier={Modifier.rotateUp}
            />
          );
          setGame(newGameState);
        }
      } catch (error) {
        console.error(`${error} ${nextSquare}`);
      }
    } else if (game[x][y].props.modifier === Modifier.bomb) {
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
      const targetColor = game[x][y].props.color;
      try {
        squaresToUpdate.forEach((square) => {
          if (square !== undefined && square.props.targetColor !== Color.none) {
            newGameState[square.props.x][square.props.y] = (
              <Square
                {...newGameState[square.props.x][square.props.y].props}
                modifier={Modifier.none}
                color={targetColor}
              />
            );
            setGame(newGameState);
          }
        });
      } catch (error) {
        console.error(`${error}`);
      }
    } else if (game[x][y].props.modifier === Modifier.circle) {
      const newGameState = [...game];
      const queue: Array<Coordinate> = [{ x: x, y: y }];
      const visited: Array<Coordinate> = [];
      // If any neighbour is empty, but has a target colour
      const fill = (
        (getNextSquare(x,y,Modifier.up)?.props?.color === Color.none &&
        getNextSquare(x,y,Modifier.up)?.props?.targetColor !== Color.none) ||
        (getNextSquare(x,y,Modifier.right)?.props?.color === Color.none &&
        getNextSquare(x,y,Modifier.right)?.props?.targetColor !== Color.none) ||
        (getNextSquare(x,y,Modifier.down)?.props?.color === Color.none &&
        getNextSquare(x,y,Modifier.down)?.props?.targetColor !== Color.none) ||
        (getNextSquare(x,y,Modifier.left)?.props?.color === Color.none &&
        getNextSquare(x,y,Modifier.left)?.props?.targetColor !== Color.none)
      )
      const targetColor = fill ? game[x][y].props.color : Color.none;
      const replaceColour = fill ? Color.none : game[x][y].props.color;
      while (queue.length) {
        // TODO fix typescript... https://stackoverflow.com/q/65514481
        const current = queue.pop() || {x: -1, y: -1};
        // Check the 4 neighbour and add them to the queue
        [Modifier.up, Modifier.right, Modifier.down, Modifier.left].forEach(
          (neighbour) => {
            const nextSquare = getNextSquare(current.x, current.y, neighbour);
            if (
              nextSquare !== undefined &&
              nextSquare.props.color == replaceColour &&
              nextSquare.props.modifier === Modifier.none &&
              nextSquare.props.targetColor !== Color.none &&
              !includesCoordinate(visited, nextSquare.props.x, nextSquare.props.y) &&
              !includesCoordinate(queue, nextSquare.props.x, nextSquare.props.y)
            ) {
              queue.push({ x: nextSquare.props.x, y: nextSquare.props.y });
            }
          }
        );
        if (game[current.x][current.y].props.modifier === Modifier.none) {
          newGameState[current.x][current.y] = (
            <Square
              {...newGameState[current.x][current.y].props}
              color={targetColor}
            />
          );
          setGame(newGameState);
        }
        visited.push({x: current.x,y: current.y})
      }
    }
    // Finally
    checkGameIsWon();
  }
  return (
    <>
      {gameIsWon ? <div>WON!!!</div> : null}
      <div className={styles.header}>
        Current: {moves} <button onClick={() => reset()}>reset</button>
        Best: todo
      </div>
      <div className={styles.level}>
        <div className={styles.gameBoard}>
          {game.map((row, index) => (
            <div key={index} className={styles.row}>
              {row}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
