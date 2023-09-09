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
import {SelectPack} from "@/components/SelectPack/SelectPack";

export const enum screens {
  SelectPack ="SelectPack",
  SelectLevel = "SelectLevel",
  Game = "Game",
}

export const levels: Array<Level> = EasyLevels;
export const levelProgressDefault: Array<levelProgressProps> = EasyDefaultProgress

// TODO
//  Save to and load from local storage for progress
//  Level pack selector
//  Fix weird alignment in level selector where levels < 9 are one character
//  Update game screen one square at a time so you get a nice flow, e.g. medium 47

export const LevelContext = createContext({
  levelNumber: 0,
  changeLevelNumber: (_level: number) => {},
  changeCurrentScreen: (_screen: screens) => {},
  setGameStarted: (_start: boolean) => {},
  levelProgress: levelProgressDefault,
  changeLevelProgress: (_levelProgress: Array<levelProgressProps>) => {},
});

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState(screens.SelectPack)
  const [levelNumber, setLevelNumber] = useState(0);
  const [gameStarted, setGameStarted] = useState(false)
  const [levelProgress, setLevelProgress] = useState(levelProgressDefault)


  function changeLevelNumber(level: number) {
    setLevelNumber(() => level);
  }

  function changeLevelProgress(progress: Array<levelProgressProps>) {
    setLevelProgress(() => progress);
  }

  function changeCurrentScreen(screen: screens) {
    setCurrentScreen(() => screen)
  }

  return (
    <LevelContext.Provider
      value={{
        levelNumber,
        changeLevelNumber,
        changeCurrentScreen,
        setGameStarted,
        levelProgress,
        changeLevelProgress
    }}
    >
      <Head/>
      <main className={styles.main}>
        { currentScreen === screens.SelectPack ? <SelectPack /> : null}
        { currentScreen === screens.SelectLevel ? <LevelPicker/> : null}
        { currentScreen === screens.Game ? <Game/> : null}
      </main>
    </LevelContext.Provider>
  );
}

