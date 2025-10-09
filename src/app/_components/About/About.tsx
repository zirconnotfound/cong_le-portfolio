"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./About.module.scss";
import Description from "./Description/Description";
import Team from "./Team/Team";
import { swiss, sfuCentury } from "@/fonts";
import MovingLogo from "@/components/3d/MovingLogo/MovingLogo";

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

  // 👇 In-view detection
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  // once:true → only trigger once when scrolling down

  return (
    <motion.div
      ref={ref}
      id="about"
      className={`${styles["wrapper"]} ${swiss.className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}} // will not reset when scrolling up
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className={`${
          styles["sidebar-logo"]
        } transition-transform duration-600 ${
          isAbout ? "translate-y-0 -translate-x-[5%]" : "translate-y-[55%]"
        }`}
      >
        <MovingLogo isClicked={isAbout} />
      </div>
      <div className={styles["sidebar"]}>
        <div
          className={`${styles["slogan-wrapper"]} ${sfuCentury.className} ${
            isAbout ? "invisible" : ""
          }`}
        >
          <p className={styles["slogan-text"]}>
            Great work result from great team
          </p>
        </div>
        <div
          className={styles["sidebar-content"]}
          style={
            isAbout
              ? {
                  opacity: "100%",
                  transform: "translateX(8px)",
                  transition: "all 0.3s",
                }
              : {
                  opacity: "50%",
                  transform: "translateX(0)",
                  transition: "all 0.3s",
                }
          }
        >
          <div
            className={styles["sidebar-text"]}
            onClick={handleToggle}
            style={
              isAbout
                ? {
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "90px",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    cursor: "pointer",
                  }
                : { cursor: "pointer" }
            }
          >
            About
          </div>
        </div>
        <div
          className={styles["sidebar-content"]}
          style={
            !isAbout
              ? {
                  opacity: "100%",
                  transform: "translateX(8px)",
                  transition: "all 0.3s",
                }
              : {
                  opacity: "50%",
                  transform: "translateX(0)",
                  transition: "all 0.3s",
                }
          }
        >
          <div
            className={styles["sidebar-text"]}
            onClick={handleToggle}
            style={
              !isAbout
                ? {
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "90px",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    cursor: "pointer",
                  }
                : { cursor: "pointer" }
            }
          >
            Team
          </div>
        </div>
      </div>
      <div
        className={`${styles["content"]} transition-opacity duration-300 
          ${isFading ? "opacity-0" : "opacity-100"}`}
      >
        {isAbout ? <Description /> : <Team />}
      </div>
    </motion.div>
  );
};

export default About;
