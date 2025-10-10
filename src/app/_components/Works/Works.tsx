"use client";

import WorksItem from "./components/WorksItem/WorksItem";
import { useRef, useState } from "react";
import { sfuCentury } from "@/fonts";
import styles from "./Works.module.scss";
import { LiquidGlass } from "@liquidglass/react";
import { motion, useScroll, useTransform } from "framer-motion";

export type ItemProps = {
  title: string;
  type: string;
  link: string;
  img: string;
};

const worksList: ItemProps[] = [
  {
    title: "1HUB.Network",
    type: "Platform",
    link: "https://1hub.network",
    img: "/img/works/1hub.webp",
  },
  {
    title: "EZFORM",
    type: "Website",
    link: "https://1hub.network",
    img: "/img/works/ezform.webp",
  },
  {
    title: "LLIEMSD",
    type: "Website",
    link: "https://1hub.network",
    img: "/img/works/1hub.webp",
  },
  {
    title: "1HUB.Network",
    type: "Platform",
    link: "https://1hub.network",
    img: "/img/works/ezform.webp",
  },
];

const Works = () => {
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Observe scroll progress relative to the section
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start 0.4", "start 0"],
  });

  // Map scroll progress (0 → 1) to motion values
  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <div className={styles["wrapper"]} id="works" ref={wrapperRef}>
        <div className={`${styles["title-container"]} ${sfuCentury.className}`}>
          <div className={styles["title"]}>
            <div className={styles["title-line"]}>
              <motion.p
                className={styles["title-text"]}
                style={{ y, opacity }}
                transition={{ ease: "linear" }}
              >
                Our works
              </motion.p>
            </div>
          </div>
        </div>

        <div className={styles["work-list"]}>
          {worksList.map((item, index) => (
            <WorksItem
              key={index}
              index={index}
              data={item}
              onHover={(e: any) => {
                const cx = e.clientX ?? e.pageX ?? 0;
                const cy = e.clientY ?? e.pageY ?? 0;
                setTooltip({ x: cx, y: cy });
              }}
              onLeave={() => setTooltip(null)}
            />
          ))}
        </div>
      </div>

      <div
        className={styles["tooltip-div"]}
        style={
          tooltip
            ? {
                position: "fixed",
                top: `${tooltip.y + 120}px`,
                left: `${tooltip.x + 50}px`,
                transform: "translate(-50%, -120%)",
                pointerEvents: "none",
                cursor: "pointer",
                zIndex: 9999,
              }
            : { display: "none" }
        }
      >
        <LiquidGlass
          borderRadius={200}
          blur={4}
          contrast={0.8}
          brightness={1.2}
        >
          <div className={styles["tooltip"]}>
            <p className={styles["tooltip-text"]}>Details</p>
          </div>
        </LiquidGlass>
      </div>
    </>
  );
};

export default Works;
