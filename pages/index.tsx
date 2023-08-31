import { createContext, useState } from 'react';

import styles from "./index.module.css";
import Head from "./head";
import { easyLevel1 } from "@/levels/easy/level-01";
import { easyLevel2 } from "@/levels/easy/level-02";
import { Game } from "@/components/Game/Game";
import {LevelPicker} from "@/components/LevelPicker/LevelPicker";

export const levels = {
  0: easyLevel1, // Special null level
  1: easyLevel1,
  2: easyLevel2
}

export const LevelContext = createContext({style:0, visible:false, toggleStyle:() => {}, toggleVisible:() => {}});

export default function Home() {
  const [style, setStyle] = useState(0);
  const [visible, setVisible] = useState(true);

  function toggleStyle() {
    setStyle(style => (style === 0 ? 1 : 0));
  }
  function toggleVisible() {
    setVisible(visible => !visible);
  }
  return (
    <LevelContext.Provider
      value={{ style, visible, toggleStyle, toggleVisible }}
    >
      <Head />
      <main className={styles.main}>
        <LevelPicker />
        <Game/>
      </main>
    </LevelContext.Provider>
  );
}

