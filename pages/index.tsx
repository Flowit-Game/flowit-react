import {createContext, useState} from 'react';

import styles from "./index.module.css";
import Head from "./head";
import {easyLevel1} from "@/levels/easy/level-01";
import {easyLevel2} from "@/levels/easy/level-02";
import {Game, Level} from "@/components/Game/Game";
import {LevelPicker} from "@/components/LevelPicker/LevelPicker";


export const levels: Array<Level> = [
  easyLevel1, // Special null level
  easyLevel1,
  easyLevel2
]

export const LevelContext = createContext({
  levelNumber: 0, changeLevelNumber: (_level: number) => {}
});

export default function Home() {
  const [levelNumber, setLevelNumber] = useState(0);

  function changeLevelNumber(level: number) {
    setLevelNumber(() => level);
  }

  return (
    <LevelContext.Provider
      value={{levelNumber, changeLevelNumber}}
    >
      <Head/>
      <main className={styles.main}>
        <LevelPicker/>
        <Game/>
      </main>
    </LevelContext.Provider>
  );
}

