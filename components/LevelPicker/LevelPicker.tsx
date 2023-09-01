import {useContext} from "react";
import {LevelContext, levels} from "@/pages";
import styles from "./LevelPicker.module.css"

export function LevelPicker() {

  const {changeLevelNumber, setGameStarted, levelProgress} = useContext(
    LevelContext
  );
  return (
    <div className={styles.pickerArea}>
      {levels.map((_level, index) => (
        <div
          key={index}
          onClick={() => {
            changeLevelNumber(index)
            setGameStarted(true)
          }}
          className={styles.clickableArea}
        >
          <div className={`${styles.levelStatus} ${styles[levelProgress[index].status]}`}></div>
          <div className={styles.levelNumber}>{index + 1}</div>
        </div>
      ))}
    </div>
  );
}