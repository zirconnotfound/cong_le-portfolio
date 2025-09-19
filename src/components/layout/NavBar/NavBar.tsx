"use client";

import Link from "next/link";
import styles from "./NavBar.module.scss";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
});

const NavBar = () => {
  return (
    <div className={`${styles["navigation"]} ${oswald.className}`}>
      <div className={styles["center-nav"]}>
        <Link href="#about" className={styles["about"]}>
          <span className={styles["about-text"]}>About</span>
        </Link>
        <img className={styles["logo"]} src="/img/logo-1.png" />
        <Link href="#works" className={styles["work"]}>
          <span className={styles["work-text"]}>Works</span>
        </Link>
      </div>
      <div className={styles["right-nav"]}>
        <Link href="#contact" className={styles["contact"]}>
          <span className={styles["contact-text"]}>Contact</span>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
