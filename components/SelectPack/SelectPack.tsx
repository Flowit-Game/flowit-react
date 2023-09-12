import {useContext} from "react";
import {LevelContext, screens} from "@/pages";

export function SelectPack() {

  const {changeCurrentScreen, changePack} = useContext(
    LevelContext
  );
  return (
    <div>
      <h1>Select Pack</h1>
      <button onClick={() => {
        changeCurrentScreen(screens.SelectLevel)
        changePack("Easy")
      }}>Easy
      </button>

      <button onClick={() => {
        changeCurrentScreen(screens.SelectLevel)
        changePack("Medium")
      }}>Medium
      </button>

      <button onClick={() => {
        changeCurrentScreen(screens.SelectLevel)
        changePack("Hard")
      }}>Hard
      </button>

      <button onClick={() => {
        changeCurrentScreen(screens.SelectLevel)
        changePack("Community")
      }}>Community
      </button>
    </div>
  );
}