"use client";
import Image from "next/image";
import styles from "./Footer.module.scss";
import { sfuCentury, swiss } from "@/fonts";

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
        <p className={`${styles["email"]} ${swiss.className}`}>
          INFO@WEBVER.COM
        </p>
        <div className={styles["socials"]}>
          <i className={styles["social-icon"]}>
            <Image
              src="/img/icons/email.webp"
              alt="Email"
              width={40}
              height={40}
            />
          </i>
          <i className={styles["social-icon"]}>
            <Image
              src="/img/icons/fb.webp"
              alt="Facebook"
              width={40}
              height={40}
            />
          </i>
          <i className={styles["social-icon"]}>
            <Image
              src="/img/icons/linkedin.webp"
              alt="LinkedIn"
              width={40}
              height={40}
            />
          </i>
        </div>
      </div>
      <div className={styles["footer-content"]}>
        <div className={styles["container"]}>
          <p className={`${styles["text"]} ${swiss.className}`}>
            Let&apos;s create together
          </p>
          <p className={`${styles["contact"]} ${sfuCentury.className}`}>
            Contact us
            <span className={styles["underline"]}></span>
          </p>
        </div>
      </div>
      <div className={`${styles["footer-end"]} ${swiss.className}`}>
        <p className={styles["copyright"]}>2025 All right RESERVED</p>
        <button className={styles["button"]} onClick={scrollToTop}>
          Back to top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
