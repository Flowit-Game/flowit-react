import {useContext} from "react";
import {LevelContext} from "@/pages";


export function LevelPicker() {

  const {style, visible, toggleStyle, toggleVisible} = useContext(
    LevelContext
  );
  return (
    <div>
      <p>
        The theme is <em>{style}</em> and state of visibility is
        <em> {visible.toString()}</em>
      </p>
      <button onClick={toggleStyle}>Change Theme</button>
      <button onClick={toggleVisible}>Change Visibility</button>
    </div>
  );
}