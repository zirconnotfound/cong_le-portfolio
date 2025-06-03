"use client";

import { useState } from "react";
import styles from "./About.module.scss";
import Description from "./Description/Description";
import Team from "./Team/Team";
import { Oswald, Judson } from "next/font/google";

const judson = Judson({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const About = () => {
  const [isAbout, setIsAbout] = useState(true);
  const [rendered, setRendered] = useState(true);
  const [isFading, setIsFading] = useState(false);

  const handleToggle = () => {
    setIsFading(true);

    setTimeout(() => {
      setRendered(!rendered);
      setIsFading(false);
      setIsAbout((prev) => !prev);
    }, 300);
  };

  return (
    <div id="about" className={`${styles["wrapper"]} ${oswald.className}`}>
      <div className={styles["sidebar"]}>
        <div
          className={`${styles["slogan-wrapper"]} ${judson.className} ${
            isAbout ? "invisible" : ""
          }`}
        >
          <p className={styles["slogan-text"]}>
            Great work result from great team
          </p>
        </div>
        <div
          className={styles["sidebar-content"]}
          onClick={handleToggle}
          style={isAbout ? { opacity: "100%" } : { opacity: "50%" }}
        >
          <p className={styles["sidebar-text"]}>About</p>
        </div>
        <div
          className={styles["sidebar-content"]}
          style={!isAbout ? { opacity: "100%" } : { opacity: "50%" }}
          onClick={handleToggle}
        >
          <p className={styles["sidebar-text"]}>Team</p>
        </div>
      </div>
      <div
        className={`${styles["content"]} transition-opacity duration-300 
          ${isFading ? "opacity-0" : "opacity-100"}`}
      >
        {isAbout ? <Description /> : <Team />}
      </div>
    </div>
  );
};

export default About;
