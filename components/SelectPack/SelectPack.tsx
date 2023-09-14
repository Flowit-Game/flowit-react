import {useContext} from "react";
import {LevelContext, screens} from "@/pages";
import styles from "./SelectPack.module.css"

export function SelectPack() {

  const {changeCurrentScreen, changePack} = useContext(
    LevelContext
  );
  return (
    <div className={styles.contentArea}>
      <h1>Select Pack</h1>
      <div className={styles.selector}>
        <button onClick={() => {
          changeCurrentScreen(screens.SelectLevel)
          changePack("Easy")
        }}>Easy
        </button>
      </div>

      <div className={styles.selector}>
        <button onClick={() => {
          changeCurrentScreen(screens.SelectLevel)
          changePack("Medium")
        }}>Medium
        </button>
      </div>

      <div className={styles.selector}>
        <button onClick={() => {
          changeCurrentScreen(screens.SelectLevel)
          changePack("Hard")
        }}>Hard
        </button>
      </div>

      <div className={styles.selector}>
        <button onClick={() => {
          changeCurrentScreen(screens.SelectLevel)
          changePack("Community")
        }}>Community
        </button>
      </div>
    </div>
  );
}