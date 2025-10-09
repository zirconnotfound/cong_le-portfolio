"use client";

import WorksItem from "./components/WorksItem/WorksItem";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sfuCentury } from "@/fonts";
import styles from "./Works.module.scss";
import { LiquidGlass } from "@liquidglass/react";

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
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

  console.log(tooltip);

  useEffect(() => {
    if (wrapperRef.current && titleRef.current) {
      gsap.registerPlugin(ScrollTrigger);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "start+=300px bottom",
          scrub: 1,
          markers: true,
        },
      });

      const wordList = titleRef.current.querySelectorAll(
        ":scope > div > div > p"
      );

      console.log(wordList);

      wordList.forEach((word, index) => {
        tl.fromTo(
          word,
          {
            y: 90,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            ease: "none",
          },
          "<"
        );
      });
    }
  }, []);

  return (
    <>
      <div className={styles["wrapper"]} id="works" ref={wrapperRef}>
        <div
          className={`${styles["title-container"]} ${sfuCentury.className}`}
          ref={titleRef}
        >
          <div className={styles["title"]}>
            <div className={styles["title-line"]}>
              <p className={styles["title-text"]}>Our works</p>
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
                // use viewport coordinates so tooltip can be fixed and follow cursor
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
          saturation={1}
          shadowIntensity={0.2}
          displacementScale={1.4}
          elasticity={0.5}
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
