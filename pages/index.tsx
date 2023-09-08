import {createContext, useState} from 'react';

import styles from "./index.module.css";
import Head from "./head";
import {Game, Level} from "@/components/Game/Game";
import {LevelPicker} from "@/components/LevelPicker/LevelPicker";
import {EasyLevels, EasyDefaultProgress} from "@/levels/Easy";
import {MediumLevels, MediumDefaultProgress} from "@/levels/Medium";
import {HardLevels, HardDefaultProgress} from "@/levels/Hard";
import {CommunityLevels, CommunityDefaultProgress} from "@/levels/Community";
import {levelProgressProps} from "@/levels/levelsUtils";

export const levels: Array<Level> = EasyLevels;
export const levelProgressDefault: Array<levelProgressProps> = EasyDefaultProgress

// TODO
//  Save to and load from local storage for progress
//  Level pack selector
//  Fix weird alignment in level selector where levels < 9 are one character

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

