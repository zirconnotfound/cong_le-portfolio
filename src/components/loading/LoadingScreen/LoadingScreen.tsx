"use client";
import { useState, useEffect } from "react";
import { sfuCentury } from "@/fonts";
import styles from "./LoadingScreen.module.scss";
import BackgroundBlur from "@/components/layout/BackgroundBlur/BackgroundBlur";

const textList = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Hallo",
  "Salve",
  "你好",
  "Xin chào",
];

interface LoadingScreenProps {
  fadeOut: boolean;
}

const LoadingScreen = ({ fadeOut }: LoadingScreenProps) => {
  const [text, setText] = useState<string>(textList[0]);
  useEffect(() => {
    const timers: number[] = [];
    textList.forEach((item, index) => {
      const delay = index <= 4 ? 500 * index : 2000 + 400 * (index - 4);
      const id = window.setTimeout(() => setText(item), delay);
      timers.push(id);
    });
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <div
      className={`${styles.wrapper} ${sfuCentury.className} ${
        fadeOut ? styles.fadeOut : styles.visible
      }`}
    >
      <BackgroundBlur position="absolute" />
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default LoadingScreen;
