import {useContext} from "react";
import {LevelContext, screens} from "@/pages";
import styles from "./SelectPack.module.css"
import {packChoices} from "@/levels/levelsUtils";

export function SelectPack() {

  const {changeCurrentScreen, changePack} = useContext(
    LevelContext
  );
  const packs: Array<packChoices> = ["Easy", "Medium", "Hard", "Community"]
  return (
    <div className={styles.contentArea}>
      <h1>Select Pack</h1>
      {packs.map((packName, index) => (
        <div className={styles.selector} key={index}>
          <button
            data-testid={`${packName}-pack-button`}
            onClick={() => {
            changeCurrentScreen(screens.SelectLevel)
            changePack(packName)
          }}>{packName}
          </button>
        </div>
      ))}
    </div>
  );
}