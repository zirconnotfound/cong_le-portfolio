"use client";
import React, { useEffect, useRef } from "react";
import styles from "./Paragraph.module.scss";
import { useScroll, motion, useTransform, MotionValue } from "framer-motion";

type ParagraphProps = {
  text: string;
};

type WordProps = {
  children: string;
  range: Array<number>;
  progress: MotionValue<number>;
};

type CharacterProps = {
  children: string;
  range: Array<number>;
  progress: MotionValue<number>;
};

const Paragraph = ({ text }: ParagraphProps) => {
  const element = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 1", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <div className={styles["paragraph"]} ref={element}>
      {words.map((word, index) => {
        const range = [index / words.length, (index + 1) / words.length];
        return (
          <Word key={index} range={range} progress={scrollYProgress}>
            {word}
          </Word>
        );
      })}
    </div>
  );
};

const Word = ({ children, range, progress }: WordProps) => {
  const characters = children.split("");
  const amount = range[1] - range[0];
  const step = amount / children.length;

  return (
    <span className={styles["word"]}>
      {characters.map((char, index) => {
        const charRange = [
          range[0] + step * index,
          range[0] + step * (index + 1),
        ];
        return (
          <Character key={index} range={charRange} progress={progress}>
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
    <span className={styles["character"]}>
      <span className={styles["shadow"]}>{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

export default Paragraph;
