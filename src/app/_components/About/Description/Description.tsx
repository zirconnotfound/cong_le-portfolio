import styles from "./Description.module.scss";
import { Judson, Oswald } from "next/font/google";

const judson = Judson({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const oswald = Oswald({
  subsets: ["latin"],
});

const Description = () => {
  return (
    <div
      className={`${styles["wrapper"]} animate-fade-in transition-all duration-700 ease-out`}
    >
      <div className={`${styles["title-wrapper"]} ${judson.className}`}>
        <p className={styles["scroll-text"]}>We</p>
        <div className={styles["title"]}>
          <p className={styles["title-text"]}>think. Find solution.</p>
          <p className={styles["title-text"]}>create the exquisite.</p>
          <p className={styles["title-text"]}>desire to grow</p>
        </div>
      </div>
      <div className={`${styles["content"]} ${oswald.className}`}>
        <p className={styles["content-text"]}>
          We’re fueled by curiosity and creativity. We seek to improve the
          quality of the built environment with subtle, yet confident designs
          characterised by clean lines and forms linked inextricably with
          function. Each design is unique, crafted to add commercial, social and
          aesthetic value while expressing our responsibility to safeguard the
          planet, nurture our team and enhance the lives of people who use the
          spaces we create.
        </p>
      </div>
    </div>
  );
};

export default Description;
