import {useContext, useEffect, useState} from "react";
import {Color, Modifier, Square, SquareProps} from "../Square/Square";
import styles from "./Game.module.css";
import {LevelContext, levels} from "@/pages";
import {MessageModal} from "@/components/MessageModal/MessageModal";
import {levelStatus} from "@/levels/levelsUtils";

export type Level = Array<Array<SquareProps>>;

type Coordinate = {
  x: number;
  y: number;
};

const includesCoordinate = function (
  elements: Array<Coordinate>,
  x: number,
  y: number
) {
  return elements.some((element) => element.x === x && element.y === y);
}

const checkGameIsWon = function (gameState: Level) {
  const freshGameState = loadLevel(gameState)
  let won = true;
  freshGameState.forEach((row) => {
    row.forEach((square) => {
      if (square.color !== square.targetColor) {
        won = false;
      }
    });
  });
  return won
}

const getNextSquare = function (x: number, y: number, direction: Modifier, gameState: Level) {
  const freshGameState = loadLevel(gameState)
  let nextSquare = undefined;
  try {
    if (
      direction === Modifier.up ||
      direction === Modifier.rotateUp
    ) {
      nextSquare = freshGameState[x - 1][y];
    } else if (
      direction === Modifier.right ||
      direction === Modifier.rotateRight
    ) {
      nextSquare = freshGameState[x][y + 1];
    } else if (
      direction === Modifier.down ||
      direction === Modifier.rotateDown
    ) {
      nextSquare = freshGameState[x + 1][y];
    } else if (
      direction === Modifier.left ||
      direction === Modifier.rotateLeft
    ) {
      nextSquare = gameState[x][y - 1];
    } else if (direction === Modifier.none) {
      nextSquare = freshGameState[x][y];
    }
  } catch (err) {
  }
  return nextSquare;
}

const loadLevel = function (props: Level) {
  const levelState: Array<Array<SquareProps>> = [];
  for (const [x, row] of props.entries()) {
    levelState.push([]);
    for (const [y, square] of row.entries()) {
      levelState[x].push(
        {
          key: `x${x}y${y}`,
          color: square.color,
          targetColor: square.targetColor,
          modifier: square.modifier,
          x: x,
          y: y,
        }
      );
    }
  }
  return levelState;
}

const updateGame = function (x: number, y: number, gameState: Level) {
  const freshGameState = loadLevel(gameState)
  if (
    freshGameState[x][y].modifier === Modifier.up ||
    freshGameState[x][y].modifier === Modifier.right ||
    freshGameState[x][y].modifier === Modifier.down ||
    freshGameState[x][y].modifier === Modifier.left ||
    freshGameState[x][y].modifier === Modifier.rotateUp ||
    freshGameState[x][y].modifier === Modifier.rotateRight ||
    freshGameState[x][y].modifier === Modifier.rotateDown ||
    freshGameState[x][y].modifier === Modifier.rotateLeft
  ) {
    let nextSquare = getNextSquare(x, y, freshGameState[x][y].modifier, freshGameState);
    const arrowColour = freshGameState[x][y].color;
    const targetColor = nextSquare?.color == arrowColour ? Color.none : arrowColour;
    const replaceColour = nextSquare?.color == arrowColour ? arrowColour : Color.none;
    try {
      while (
        // The next square exists on the grid
      nextSquare !== undefined &&
      // and it's not a blank space
      nextSquare.targetColor !== Color.none &&
      // and it's not a modifier square
      nextSquare.modifier === Modifier.none &&
      // and it's either empty, and we are adding colors
      nextSquare.color === replaceColour) {
        freshGameState[nextSquare.x!][nextSquare.y!].color = targetColor
        nextSquare = getNextSquare(
          nextSquare.x!,
          nextSquare.y!,
          freshGameState[x][y].modifier,
          freshGameState
        );
      }
      // If it was a rotating arrow, turn it
      if (freshGameState[x][y].modifier === Modifier.rotateUp) {
        freshGameState[x][y].modifier = Modifier.rotateRight
      } else if (freshGameState[x][y].modifier === Modifier.rotateRight) {
        freshGameState[x][y].modifier = Modifier.rotateDown
      } else if (freshGameState[x][y].modifier === Modifier.rotateDown) {
        freshGameState[x][y].modifier = Modifier.rotateLeft
      } else if (freshGameState[x][y].modifier === Modifier.rotateLeft) {
        freshGameState[x][y].modifier = Modifier.rotateUp
      }
    } catch (error) {
      console.error(`${error} ${nextSquare}`);
    }
  } else if (freshGameState[x][y].modifier === Modifier.bomb) {
    const squaresToUpdate = [
      // Top row
      getNextSquare(x - 1, y - 1, Modifier.none, freshGameState),
      getNextSquare(x - 1, y, Modifier.none, freshGameState),
      getNextSquare(x - 1, y + 1, Modifier.none, freshGameState),
      // Middle row
      getNextSquare(x, y - 1, Modifier.none, freshGameState),
      getNextSquare(x, y, Modifier.none, freshGameState),
      getNextSquare(x, y + 1, Modifier.none, freshGameState),
      // Bottom row
      getNextSquare(x + 1, y - 1, Modifier.none, freshGameState),
      getNextSquare(x + 1, y, Modifier.none, freshGameState),
      getNextSquare(x + 1, y + 1, Modifier.none, freshGameState),
    ];
    const targetColor = freshGameState[x][y].color;
    try {
      squaresToUpdate.forEach((square) => {
        if (square !== undefined && square.targetColor !== Color.none) {
          freshGameState[square.x!][square.y!].color = targetColor
          freshGameState[square.x!][square.y!].modifier = Modifier.none
        }
      });
    } catch (error) {
      console.error(`${error}`);
    }
  } else if (freshGameState[x][y].modifier === Modifier.circle) {
    const queue: Array<Coordinate> = [{x: x, y: y}];
    const visited: Array<Coordinate> = [];
    // If any neighbour is empty, but has a target color
    const fill = (
      (getNextSquare(x, y, Modifier.up, freshGameState)?.color === Color.none &&
        getNextSquare(x, y, Modifier.up, freshGameState)?.targetColor !== Color.none) ||
      (getNextSquare(x, y, Modifier.right, freshGameState)?.color === Color.none &&
        getNextSquare(x, y, Modifier.right, freshGameState)?.targetColor !== Color.none) ||
      (getNextSquare(x, y, Modifier.down, freshGameState)?.color === Color.none &&
        getNextSquare(x, y, Modifier.down, freshGameState)?.targetColor !== Color.none) ||
      (getNextSquare(x, y, Modifier.left, freshGameState)?.color === Color.none &&
        getNextSquare(x, y, Modifier.left, freshGameState)?.targetColor !== Color.none)
    )
    const targetColor = fill ? freshGameState[x][y].color : Color.none;
    const replaceColour = fill ? Color.none : freshGameState[x][y].color;
    while (queue.length) {
      const current = queue.pop()!;
      // Check the 4 neighbour and add them to the queue
      [Modifier.up, Modifier.right, Modifier.down, Modifier.left].forEach(
        (neighbour) => {
          const nextSquare = getNextSquare(current.x, current.y, neighbour, freshGameState);
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
      if (freshGameState[current.x][current.y].modifier === Modifier.none) {
        freshGameState[current.x][current.y].color = targetColor
      }
      visited.push({x: current.x, y: current.y})
    }
  }
  // Finally
  return freshGameState
}


export function Game() {
  const {levelNumber, changeLevelNumber, levelProgress, setGameStarted, changeLevelProgress} = useContext(
    LevelContext
  );
  const [moves, setMoves] = useState(0);
  const [game, setGame] = useState(loadLevel(levels[levelNumber]));
  const [gameIsWon, setGameIsWon] = useState(false);

  useEffect(() => {
    // Reset the game every time the level changes
    reset()
    //TODO fix? or just ignore?
  }, [levelNumber]);

  useEffect(() => {
    if (gameIsWon) {
      if (levelProgress[levelNumber].best === null || moves < levelProgress[levelNumber].best!) {
        const newProgress = [...levelProgress]
        newProgress[levelNumber].best = moves
        newProgress[levelNumber].status = levelStatus.complete
        // Unlock the next 5 levels
        for (let i = 1; i < Math.min(newProgress.length - levelNumber, 6); i++) {
          if (newProgress[levelNumber + i].status === levelStatus.locked) {
            newProgress[levelNumber + i].status = levelStatus.unlocked
          }
        }
        changeLevelProgress(newProgress)
      }
    }
  }, [gameIsWon, levelProgress, levelNumber, moves, changeLevelProgress]);

  function reset() {
    setGameIsWon(false)
    setGame(loadLevel(levels[levelNumber]));
    setMoves(0);
  }

  function incrementLevelNumber() {
    // Unset gameIsWon before changing level, so we don't accidentally mark the level as complete
    // when the new game is loaded before gameIsWon is recalculated
    setGameIsWon(false)
    if (levelNumber + 1 === levels.length) {
      setGameStarted(false);
    } else {
      changeLevelNumber(levelNumber + 1)
    }
  }

  function decrementLevelNumber() {
    setGameIsWon(false)
    if (levelNumber === 0) {
      setGameStarted(false);
    } else {
      changeLevelNumber(levelNumber - 1)
    }
  }

  function onClick(x: number, y: number) {
    if (game[x][y].modifier !== Modifier.none) {
      setMoves(moves => moves + 1)
      setGame(game => {
        const newState = updateGame(x, y, game);
        const won = checkGameIsWon(newState)
        setGameIsWon(won)
        return newState
      })
    }
  }

  game.forEach((row) => {
    row.forEach((square) => {
      square.onClick = () => onClick(square.x!, square.y!)
    })
  })

  return (
    <>
      {gameIsWon ? <MessageModal onClick={incrementLevelNumber} message={"complete"}/> : null}
      {levelProgress[levelNumber].status === "locked" ? <MessageModal onClick={undefined} message={"locked"}/> : null}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <button onClick={decrementLevelNumber} className={styles.previous}></button>
          <button onClick={reset} className={styles.reset}></button>
          <div>
            <p>Current: {moves}</p>
            <p>Best: {levelProgress[levelNumber].best}</p>
          </div>
          <button onClick={() => setGameStarted(false)} className={styles.home}></button>
          <button onClick={incrementLevelNumber} className={styles.next}></button>
        </div>
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
