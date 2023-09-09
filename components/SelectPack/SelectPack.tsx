import {useContext} from "react";
import {LevelContext, screens} from "@/pages";

export function SelectPack() {

  const {changeCurrentScreen} = useContext(
    LevelContext
  );
  return (
    <div>
      <h1>Select Pack</h1>
      <button onClick={() => {changeCurrentScreen(screens.SelectLevel)}}>Easy</button>
      <button onClick={() => {changeCurrentScreen(screens.SelectLevel)}}>Medium</button>
      <button onClick={() => {changeCurrentScreen(screens.SelectLevel)}}>Hard</button>
      <button onClick={() => {changeCurrentScreen(screens.SelectLevel)}}>Community</button>
    </div>
  );
}