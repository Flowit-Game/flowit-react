import {createContext, useEffect, useState} from 'react';

import styles from "./index.module.css";
import Header from "./header";
import {Game, LevelData} from "@/components/Game/Game";
import {LevelPicker} from "@/components/LevelPicker/LevelPicker";
import {EasyLevels} from "@/levels/Easy";
import {MediumLevels} from "@/levels/Medium";
import {HardLevels} from "@/levels/Hard";
import {CommunityLevels} from "@/levels/Community";
import {levelStatus, packChoices, progressProps} from "@/levels/levelsUtils";
import {SelectPack} from "@/components/SelectPack/SelectPack";

export const enum screens {
  SelectPack = "SelectPack",
  SelectLevel = "SelectLevel",
  Game = "Game",
}

type levelsProps = {
  "Easy": Array<LevelData>,
  "Medium": Array<LevelData>,
  "Hard": Array<LevelData>,
  "Community": Array<LevelData>,
}

export const levels: levelsProps = {
  "Easy": EasyLevels,
  "Medium": MediumLevels,
  "Hard": HardLevels,
  "Community": CommunityLevels,
}

const progressStorageKey = "levelProgressById"
// Older versions stored progress per pack, indexed by level position
const legacyProgressStorageKey = "levelProgress"

function readStoredProgress(): progressProps {
  try {
    const stored = JSON.parse(localStorage.getItem(progressStorageKey) ?? "null")
    if (stored && typeof stored === "object") {
      return stored
    }
    const progress: progressProps = {}
    const legacy = JSON.parse(localStorage.getItem(legacyProgressStorageKey) ?? "null")
    if (legacy && typeof legacy === "object") {
      (Object.keys(levels) as Array<packChoices>).forEach((pack) => {
        if (!Array.isArray(legacy[pack])) {
          return
        }
        legacy[pack].forEach((levelProgress: {status?: string, best?: number | null}, index: number) => {
          const level = levels[pack][index]
          if (level && levelProgress?.status === levelStatus.complete && typeof levelProgress.best === "number") {
            progress[level.id] = {best: levelProgress.best}
          }
        })
      })
    }
    return progress
  } catch (error) {
    console.error(`Could not load level progress: ${error}`)
    return {}
  }
}

// TODO
//  Update game screen one square at a time so you get a nice flow, e.g. medium 47
//  Jest tests
//  Fix all the ts-ignore errors.
//  Handle back button (move from game back to level select)


const defaultPack: packChoices = "Easy"

export const LevelContext = createContext({
  levelNumber: 0,
  changeLevelNumber: (_level: number) => {},
  changeCurrentScreen: (_screen: screens) => {},
  levelProgress: {} as progressProps,
  changeLevelProgress: (_levelProgress: progressProps) => {},
  pack: defaultPack,
  changePack: (_pack: packChoices) => {},
});

export default function Home() {
  const [initialLoad, setInitialLoad] = useState(true)
  const [currentScreen, setCurrentScreen] = useState(screens.SelectPack)
  const [levelNumber, setLevelNumber] = useState(0);
  const [levelProgress, setLevelProgress] = useState<progressProps>({})
  const [pack, setPack] = useState<packChoices>(defaultPack)

  useEffect(() => {
    setLevelProgress(readStoredProgress());
  }, []);

  useEffect(() => {
    if(!initialLoad){
      try {
        localStorage.setItem(progressStorageKey, JSON.stringify(levelProgress));
      } catch (error) {
        console.error(`Could not save level progress: ${error}`)
      }
    }
    setInitialLoad(false)
  }, [levelProgress, initialLoad]);


  function changeLevelNumber(level: number) {
    setLevelNumber(() => level);
  }

  function changeLevelProgress(progress: progressProps) {
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
      <Header/>
      <main className={styles.main}>
        {currentScreen === screens.SelectPack ? <SelectPack/> : null}
        {currentScreen === screens.SelectLevel ? <LevelPicker/> : null}
        {currentScreen === screens.Game ? <Game/> : null}
      </main>
    </LevelContext.Provider>
  );
}

