"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./NavBar.module.scss";
import { swiss } from "@/fonts";

const NavBar = ({ isBlack }: { isBlack: boolean }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // allow one frame so CSS transition runs
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <div
      className={`${styles["navigation"]} ${swiss.className} ${
        isBlack ? styles["black"] : styles["white"]
      } ${visible ? styles.visible : ""}`}
    >
      <Link href="#about" className={styles["about"]}>
        <span className={styles["about-text"]}>About</span>
      </Link>
      <Link href="#works" className={styles["work"]}>
        <span className={styles["work-text"]}>Works</span>
      </Link>
      <Link href="#process" className={styles["process"]}>
        <span className={styles["process-text"]}>Process</span>
      </Link>
      <Link href="#contact" className={styles["contact"]}>
        <span className={styles["contact-text"]}>Contact</span>
      </Link>
    </div>
  );
};

export default NavBar;
