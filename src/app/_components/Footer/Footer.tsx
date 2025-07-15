"use client";
import styles from "./Footer.module.scss";
import { Oswald, Judson } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500"],
});

const judson = Judson({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Footer = () => {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer-head"]}>
        <p className={`${styles["email"]} ${oswald.className}`}>
          INFO@WEBVER.COM
        </p>
        <div className={styles["socials"]}>
          <i className={styles["social-icon"]}>
            <img src="/img/icons/email.png" alt="Email" />
          </i>
          <i className={styles["social-icon"]}>
            <img src="/img/icons/fb.png" alt="Facebook" />
          </i>
          <i className={styles["social-icon"]}>
            <img src="/img/icons/linkedin.png" alt="LinkedIn" />
          </i>
        </div>
      </div>
      <div className={styles["footer-content"]}>
        <div className={styles["container"]}>
          <p className={`${styles["text"]} ${oswald.className}`}>
            Let's create something unique together
          </p>
          <p className={`${styles["contact"]} ${judson.className}`}>
            Contact us
          </p>
        </div>
      </div>
      <div className={`${styles["footer-end"]} ${oswald.className}`}>
        <p className={styles["copyright"]}>2025 All right RESERVED</p>
        <button className={styles["button"]} onClick={scrollToTop}>
          Back to top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
