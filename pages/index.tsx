import {createContext, useState} from 'react';

import styles from "./index.module.css";
import Head from "./head";
import {easyLevel1} from "@/levels/easy/level-01";
import {easyLevel2} from "@/levels/easy/level-02";
import {easyLevel3} from "@/levels/easy/level-25";
import {Game, Level} from "@/components/Game/Game";
import {LevelPicker} from "@/components/LevelPicker/LevelPicker";


export const levels: Array<Level> = [
  easyLevel1,
  easyLevel2,
  easyLevel3,
]

export const LevelContext = createContext({
  levelNumber: 0,
  changeLevelNumber: (_level: number) => {},
  setGameStarted: (_start: boolean) => {},
});

export default function Home() {
  const [levelNumber, setLevelNumber] = useState(0);
  const [gameStarted, setGameStarted] = useState(false)

  function changeLevelNumber(level: number) {
    setLevelNumber(() => level);
  }

  return (
    <LevelContext.Provider
      value={{levelNumber, changeLevelNumber, setGameStarted}}
    >
      <Head/>
      <main className={styles.main}>
        {gameStarted ?  <Game/> : <LevelPicker/>}
      </main>
    </LevelContext.Provider>
  );
}

