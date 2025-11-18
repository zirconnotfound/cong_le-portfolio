"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./NavBar.module.scss";
import { swiss } from "@/fonts";

const NavBar = ({ isWhite }: { isWhite: boolean }) => {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // allow one frame so CSS transition runs
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const links = (
    <>
      <Link href="#about" className={styles["link"]}>
        <span className={styles["text"]}>About</span>
      </Link>
      <Link href="#works" className={styles["link"]}>
        <span className={styles["text"]}>Works</span>
      </Link>
      <Link href="#process" className={styles["link"]}>
        <span className={styles["text"]}>Process</span>
      </Link>
      <Link href="#contact" className={styles["link"]}>
        <span className={styles["text"]}>Contact</span>
      </Link>
    </>
  );

  return (
    <>
      {/* Desktop / wide navigation */}
      <div
        className={`${styles["navigation"]} ${swiss.className} ${
          visible ? styles.visible : ""
        }`}
      >
        {links}
      </div>

      {/* Mobile: burger button + slide-down panel */}
      <div className={styles["mobile"]}>
        <button
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          className={`${styles["burger"]} ${mobileOpen ? styles["open"] : ""} ${
            isWhite ? "" : styles["black"]
          }`}
          onClick={() => setMobileOpen((s) => !s)}
        >
          {/* simple burger icon: three bars */}
          <span className={styles["burger-bar"]} aria-hidden />
          <span className={styles["burger-bar"]} aria-hidden />
          <span className={styles["burger-bar"]} aria-hidden />
        </button>

        <nav
          id="mobile-nav"
          className={`${styles["mobile-nav"]} ${
            mobileOpen ? styles["open"] : ""
          } ${swiss.className}`}
          onClick={() => setMobileOpen(false)}
        >
          <div className={styles["mobile-nav-content"]}>{links}</div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
