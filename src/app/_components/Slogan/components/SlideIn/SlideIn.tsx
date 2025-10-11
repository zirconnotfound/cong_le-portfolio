"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { sfuCentury } from "@/fonts";
import styles from "./SlideIn.module.scss";

type SlideInProps = {
  firstLine: string;
  secondLine: string;
};

const SlideIn = ({ firstLine, secondLine }: SlideInProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 1.3", "start 0"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  return (
    <div ref={ref} className={`${styles["container"]} ${sfuCentury.className}`}>
      <div className={`${styles["line"]} ${styles["first-line"]}`}>
        <motion.h1 style={{ x: x1 }}>{firstLine}</motion.h1>
      </div>
      <div className={`${styles["line"]} ${styles["second-line"]}`}>
        <motion.h1 style={{ x: x2 }}>{secondLine}</motion.h1>
      </div>
    </div>
  );
};

export default SlideIn;
