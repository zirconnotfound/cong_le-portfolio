"use client";

import Link from "next/link";
import styles from "./NavBar.module.scss";
import { swiss } from "@/fonts";
import { LiquidGlass } from "@liquidglass/react";

const NavBar = ({ isBlack }: { isBlack: boolean }) => {
  return (
    <div
      className={`${styles["navigation"]} ${swiss.className} ${
        isBlack ? styles["black"] : styles["white"]
      }`}
    >
      <div className={styles["center-nav"]}>
        <LiquidGlass
          borderRadius={200}
          blur={2}
          contrast={0.8}
          brightness={1.1}
          saturation={1}
          shadowIntensity={0.05}
          displacementScale={1.4}
          elasticity={0.5}
        >
          <Link href="#about" className={styles["about"]}>
            <span className={styles["about-text"]}>About</span>
          </Link>
          <img className={styles["logo"]} src="/img/logo-1.webp" />
          <Link href="#works" className={styles["work"]}>
            <span className={styles["work-text"]}>Works</span>
          </Link>
        </LiquidGlass>
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
