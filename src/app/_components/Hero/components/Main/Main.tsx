import styles from "./Main.module.scss";
import Image from "next/image";
import { Judson, Oswald } from "next/font/google";

const judson = Judson({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const oswald = Oswald({
  subsets: ["latin"],
});

const Main = () => {
  return (
    <div className={`${styles["wrapper"]} ${judson.className}`}>
      <div className={styles["slogan"]}>
        <p className={styles["slogan-text"]}>Create exquisite web</p>
      </div>
      <div className={styles["webver"]}>
        <Image
          src="/img/webver.png"
          alt="webver"
          fill
          className={styles["webver-image"]}
        />
      </div>
      <div className={`${styles["footer"]} ${oswald.className}`}>
        <p className={styles["footer-text"]}>Scroll for more</p>
      </div>
    </div>
  );
};

export default Main;
