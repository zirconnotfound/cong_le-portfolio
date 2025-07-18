"use client";
import { useState, useEffect, use } from "react";
import { Judson } from "next/font/google";
import BackgroundBlur from "@/components/layout/BackgroundBlur/BackgroundBlur";
import styles from "./LoadingScreen.module.scss";

const textList = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Hallo",
  "Salve",
  "你好",
  "Xin chào",
];

const judson = Judson({
  subsets: ["latin"],
  weight: "700",
});

interface LoadingScreenProps {
  fadeOut: boolean;
}

const LoadingScreen = ({ fadeOut }: LoadingScreenProps) => {
  const [text, setText] = useState<string>(textList[0]);
  useEffect(() => {
    textList.forEach((item, index) => {
      setTimeout(() => {
        setText(item);
      }, 500 * index);
    });
  }, []);

  return (
    <div
      className={`${styles.wrapper} ${
        judson.className
      } fixed inset-0 flex flex-col justify-center items-center bg-white z-50 transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <BackgroundBlur />
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default LoadingScreen;
