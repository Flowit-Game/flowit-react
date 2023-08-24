import styles from "./index.module.css";
import Head from "./head";
import { level } from "@/levels/test-level";
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
