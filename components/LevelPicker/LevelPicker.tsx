import {useContext} from "react";
import {LevelContext, levels, screens} from "@/pages";
import styles from "./LevelPicker.module.css"

export function LevelPicker() {

  const {changeLevelNumber, changeCurrentScreen, levelProgress, pack} = useContext(
    LevelContext
  );
  return (
    <div className={styles.contentArea}>
      <div className={styles.selector}>
        <button onClick={() => changeCurrentScreen(screens.SelectPack)}>{pack}</button>
      </div>
      <h1>Select Level</h1>
      <div className={styles.pickerArea}>
        {levels[pack].map((_level, index) => (
          <div
            key={index}
            onClick={() => {
              changeLevelNumber(index)
              changeCurrentScreen(screens.Game)
            }}
            className={styles.clickableArea}
          >
            <div className={`${styles.levelStatus} ${styles[levelProgress[pack][index].status]}`}></div>
            <div className={styles.levelNumber}>{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}