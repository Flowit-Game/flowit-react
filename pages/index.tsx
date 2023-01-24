import styles from "./index.module.css";
import { Square, Color } from "@/components/Square/Square";
import Head from "./head";
import { useState } from "react";

export default function Home() {
  const [game, setGame] = useState([
    [
      <Square color={Color.red} targetColor={Color.red} />,
      <Square color={Color.white} targetColor={Color.red} />,
      <Square color={Color.white} targetColor={Color.red} />,
    ],
  ]);
  return (
    <>
      <Head />
      <main className={styles.main}>
        <table>
          <tbody>
            <tr>{game}</tr>
          </tbody>
        </table>
      </main>
    </>
  );
}
