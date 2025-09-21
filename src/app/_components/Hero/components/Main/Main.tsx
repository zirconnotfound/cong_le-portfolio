import styles from "./Main.module.scss";
import { sfuCentury, swiss } from "@/fonts";

const Main = () => {
  return (
    <div className={`${styles["wrapper"]} ${sfuCentury.className}`}>
      <div className={styles["slogan"]}>
        <p className={styles["slogan-text"]}>Create exquisite web</p>
      </div>
      <div className={`${styles["footer"]} ${swiss.className}`}>
        <p className={styles["footer-text"]}>Scroll for more</p>
      </div>
    </div>
  );
};

export default Main;
