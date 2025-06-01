"use client";

import Link from "next/link";
import styles from "./NavBar.module.scss";
import { Oswald } from "next/font/google";
import { useRef } from "react";

const oswald = Oswald({
  subsets: ["latin"],
});

const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
};

const NavBar = () => {
  const aboutRef = useRef<HTMLElement | null>(null);
  const workRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  return (
    <div className={`${styles["navigation"]} ${oswald.className}`}>
      <div className={styles["center-nav"]}>
        <Link
          href=""
          className={styles["about"]}
          onClick={() => scrollToSection(aboutRef)}
        >
          <span className={styles["about-text"]}>About</span>
        </Link>
        <img className={styles["logo"]} src="/img/logo-1.png" />
        <Link
          href=""
          className={styles["work"]}
          onClick={() => scrollToSection(workRef)}
        >
          <span className={styles["work-text"]}>Works</span>
        </Link>
      </div>
      <div className={styles["right-nav"]}>
        <Link
          href=""
          className={styles["contact"]}
          onClick={() => scrollToSection(contactRef)}
        >
          <span className={styles["contact-text"]}>Contact</span>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
