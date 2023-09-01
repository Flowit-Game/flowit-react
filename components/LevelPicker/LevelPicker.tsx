import {useContext} from "react";
import {LevelContext, levels} from "@/pages";
import styles from "./LevelPicker.module.css"

export function LevelPicker() {

  const {changeLevelNumber, setGameStarted} = useContext(
    LevelContext
  );
  return (
    <div className={styles.pickerArea}>
      {levels.map((_level, index) => (
        <button key={index} onClick={() => {
          changeLevelNumber(index)
          setGameStarted(true)
        }}>Level {index + 1}</button>
      ))}
    </div>
  );
}