import {useContext} from "react";
import {LevelContext} from "@/pages";


export function LevelPicker() {

  const {changeLevelNumber} = useContext(
    LevelContext
  );
  return (
    // TODO
    //  * For loop of levels
    //  * Hide when Level != 0
    <div>
      <button onClick={() => changeLevelNumber(1)}>Level 1</button>
      <button onClick={() => changeLevelNumber(2)}>Level 2</button>
      <button onClick={() => changeLevelNumber(3)}>Level 25</button>
    </div>
  );
}