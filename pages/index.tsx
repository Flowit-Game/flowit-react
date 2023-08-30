import styles from "./index.module.css";
import Head from "./head";
import { level } from "@/levels/level-00";
import { Game } from "@/components/Game/Game";

export default function Home() {
  return (
    <>
      <Head />
      <main className={styles.main}>
        <Game level={level}/>
      </main>
    </>
  );
}
