import { MouseEventHandler } from "react";
import styles from "./MessageModal.module.css";

// TODO take props so we can use the same modal for level is locked.
export function MessageModal(props: { onClick: MouseEventHandler<HTMLDivElement>} ) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalBanner} onClick={props.onClick}>
        <div className={styles.modalContent}>
          <div className={styles.tick}></div>
          <div>
            <p>Level Complete</p>
            <p>Tap to continue</p>
          </div>
        </div>
      </div>
    </div>
  );
}
