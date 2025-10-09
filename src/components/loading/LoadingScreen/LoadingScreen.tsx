"use client";
import { useState, useEffect, use } from "react";
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
    textList.forEach((item, index) => {
      if (index <= 4) {
        setTimeout(() => {
          setText(item);
        }, 300 * index);
      } else {
        setTimeout(() => {
          setText(item);
        }, 1200 + 200 * (index - 4));
      }
    });
  }, []);

  return (
    <div
      className={`${styles.wrapper} ${
        sfuCentury.className
      } fixed inset-0 flex flex-col justify-center items-center z-50 transition-all duration-3000 ease-in-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100 translate-y-0"
      }`}
    >
      <BackgroundBlur position="absolute" />
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default LoadingScreen;
