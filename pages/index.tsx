import {createContext, useState} from 'react';

import styles from "./index.module.css";
import Head from "./head";
import {Game, Level} from "@/components/Game/Game";
import {LevelPicker} from "@/components/LevelPicker/LevelPicker";
import {easyLevels} from "@/levels/easy";

export const levels: Array<Level> = easyLevels;

type levelStatus = "unlocked" | "locked" | "complete"
type levelProgressProps = {status: levelStatus, best: number | null }
// TODO placeholder for now, load this from local storage and make it editable
export const levelProgressDefault: Array<levelProgressProps> = []
for (let i = 0; i < levels.length; i++) {
  levelProgressDefault.push({status: i < 4 ? "unlocked" : "locked", best: null})
}

export const LevelContext = createContext({
  levelNumber: 0,
  changeLevelNumber: (_level: number) => {},
  setGameStarted: (_start: boolean) => {},
  levelProgress: levelProgressDefault,
  changeLevelProgress: (_levelProgress: Array<levelProgressProps>) => {},
});

export default function Home() {
  const [levelNumber, setLevelNumber] = useState(0);
  const [gameStarted, setGameStarted] = useState(false)
  const [levelProgress, setLevelProgress] = useState(levelProgressDefault)


  function changeLevelNumber(level: number) {
    setLevelNumber(() => level);
  }

  function changeLevelProgress(progress: Array<levelProgressProps>) {
    setLevelProgress(() => progress);
  }
  // TODO there is a bug with level 14, something to do will the fill check?
  return (
    <LevelContext.Provider
      value={{levelNumber, changeLevelNumber, setGameStarted, levelProgress, changeLevelProgress}}
    >
      <Head/>
      <main className={styles.main}>
        {gameStarted ?  <Game/> : <LevelPicker/>}
      </main>
    </LevelContext.Provider>
  );
}

