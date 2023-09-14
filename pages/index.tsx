import {createContext, useEffect, useState} from 'react';

import styles from "./index.module.css";
import Head from "./head";
import {Game, Level} from "@/components/Game/Game";
import {LevelPicker} from "@/components/LevelPicker/LevelPicker";
import {EasyLevels, EasyDefaultProgress} from "@/levels/Easy";
import {MediumLevels, MediumDefaultProgress} from "@/levels/Medium";
import {HardLevels, HardDefaultProgress} from "@/levels/Hard";
import {CommunityLevels, CommunityDefaultProgress} from "@/levels/Community";
import {levelProgressProps, packChoices} from "@/levels/levelsUtils";
import {SelectPack} from "@/components/SelectPack/SelectPack";

export const enum screens {
  SelectPack = "SelectPack",
  SelectLevel = "SelectLevel",
  Game = "Game",
}

type levelsProps = {
  "Easy": Array<Level>,
  "Medium": Array<Level>,
  "Hard": Array<Level>,
  "Community": Array<Level>,
}

export const levels: levelsProps = {
  "Easy": EasyLevels,
  "Medium": MediumLevels,
  "Hard": HardLevels,
  "Community": CommunityLevels,
}

type levelPackProgressProps = {
  "Easy": Array<levelProgressProps>,
  "Medium": Array<levelProgressProps>,
  "Hard": Array<levelProgressProps>,
  "Community": Array<levelProgressProps>
}

export const levelProgressDefault: levelPackProgressProps = {
  "Easy": EasyDefaultProgress,
  "Medium": MediumDefaultProgress,
  "Hard": HardDefaultProgress,
  "Community": CommunityDefaultProgress,
}

// TODO
//  Update game screen one square at a time so you get a nice flow, e.g. medium 47
//  Jest tests
//  Fix all the ts-ignore errors.
//  Make the convert levels script better either error gracefully when xml files
//    are missing, or better, do a git clone.
//  Favicon

const defaultPack: packChoices = "Easy"

export const LevelContext = createContext({
  levelNumber: 0,
  changeLevelNumber: (_level: number) => {},
  changeCurrentScreen: (_screen: screens) => {},
  levelProgress: levelProgressDefault,
  changeLevelProgress: (_levelProgress: levelPackProgressProps) => {},
  pack: defaultPack,
  changePack: (_pack: packChoices) => {},
});

export default function Home() {
  const [initialLoad, setInitialLoad] = useState(true)
  const [currentScreen, setCurrentScreen] = useState(screens.SelectPack)
  const [levelNumber, setLevelNumber] = useState(0);
  const [levelProgress, setLevelProgress] = useState(levelProgressDefault)
  const [pack, setPack] = useState<packChoices>(defaultPack)

  useEffect(() => {
    // @ts-ignore
    const progress = JSON.parse(localStorage.getItem('levelProgress'));
    if (progress) {
      setLevelProgress(progress);
    }
  }, []);

  useEffect(() => {
    if(!initialLoad){
      localStorage.setItem('levelProgress', JSON.stringify(levelProgress));
    }
    setInitialLoad(false)
  }, [levelProgress, initialLoad]);


  function changeLevelNumber(level: number) {
    setLevelNumber(() => level);
  }

  function changeLevelProgress(progress: levelPackProgressProps) {
    setLevelProgress(() => progress);
  }

  function changeCurrentScreen(screen: screens) {
    setCurrentScreen(() => screen)
  }

  function changePack(pack: packChoices) {
    setPack(() => pack)
  }

  return (
    <LevelContext.Provider
      value={{
        levelNumber,
        changeLevelNumber,
        changeCurrentScreen,
        levelProgress,
        changeLevelProgress,
        // @ts-ignore
        pack,
        changePack,
      }}
    >
      <Head/>
      <main className={styles.main}>
        {currentScreen === screens.SelectPack ? <SelectPack/> : null}
        {currentScreen === screens.SelectLevel ? <LevelPicker/> : null}
        {currentScreen === screens.Game ? <Game/> : null}
      </main>
    </LevelContext.Provider>
  );
}

