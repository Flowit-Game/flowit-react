import styles from "./index.module.css";
import { Square, Color } from "@/components/Square/Square";
import Head from "./head";

export default function Home() {
  return (
    <>
      <Head />
      <main className={styles.main}>
        <table>
          <tbody>
            <tr>
              <Square color={Color.red} />
              <Square color={Color.green} />
              <Square color={Color.blue} />
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
}
