import {MouseEventHandler} from "react";
import styles from "./MessageModal.module.css";


type MessageModalProps = {
  onClick: MouseEventHandler<HTMLDivElement> | undefined
  message: "complete" | "locked"
}

export function MessageModal(props: MessageModalProps) {
  let text = <></>
  if (props.message === "locked") {
    text = <div>
      <p>Complete</p>
      <p>others</p>
      <p>first</p>
    </div>
  } else if (props.message === "complete") {
    text = <div>
      <p>Level Complete</p>
      <p>Tap to continue</p>
    </div>
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modalBanner} onClick={props.onClick}>
        <div className={styles.modalContent}>
          <div className={styles[props.message]}></div>
          {text}
        </div>
      </div>
    </div>
  );
}
