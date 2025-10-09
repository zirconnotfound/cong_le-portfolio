"use client";
import React, { useRef } from "react";
import styles from "./Paragraph.module.scss";
import { useScroll, motion, useTransform, MotionValue } from "framer-motion";

type ParagraphProps = { text: string };
type WordProps = {
  children: string;
  range: number[];
  progress: MotionValue<number>;
};
type CharacterProps = {
  children: string;
  range: number[];
  progress: MotionValue<number>;
};

const Paragraph = ({ text }: ParagraphProps) => {
  const element = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 1.4", "start 0.4"],
  });

  const words = text.split(" ");

  return (
    <div className={styles.paragraph} ref={element}>
      {words.map((word, i) => {
        const range = [i / words.length, (i + 1) / words.length];
        return (
          <Word key={i} range={range} progress={scrollYProgress}>
            {word}
          </Word>
        );
      })}
    </div>
  );
};

const Word = ({ children, range, progress }: WordProps) => {
  const chars = children.split("");
  const amount = range[1] - range[0];
  const step = amount / Math.max(chars.length, 1);

  return (
    <span className={styles.word}>
      {chars.map((char, idx) => {
        const charRange = [range[0] + step * idx, range[0] + step * (idx + 1)];
        return (
          <Character key={idx} range={charRange} progress={progress}>
            {char === " " ? "\u00A0" : char}
          </Character>
        );
      })}
    </span>
  );
};

const Character = ({ children, range, progress }: CharacterProps) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className={styles.character}>
      <span className={styles.shadow}>{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

export default Paragraph;
