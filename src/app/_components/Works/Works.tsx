"use client";

import WorksItem from "./components/WorksItem/WorksItem";
import { useState } from "react";
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

  // const tooltipRef = useRef<HTMLDivElement>(null);
  // const areaRef = useRef<HTMLDivElement>(null);

  // if (tooltipRef.current && areaRef.current) {
  //   const tooltip = tooltipRef.current;
  //   const area = areaRef.current;

  //   area.onmouseover = (e) => {
  //     tooltip.style.display = "block";
  //     area.style.cursor = "pointer";
  //   };

  //   area.onmousemove = (e) => {
  //     tooltip.style.left = e.pageX + "px";
  //     tooltip.style.top = e.pageY + "px";
  //   };

  //   area.onmouseout = (e) => {
  //     tooltip.style.display = "none";
  //   };
  // }

  return (
    <>
      <div className={styles["wrapper"]} id="works">
        <div className={`${styles["title"]} ${sfuCentury.className}`}>
          <p className={styles["title-text"]}>Our works</p>
        </div>
        <div className={styles["work-list"]}>
          {worksList.map((item, index) => (
            <WorksItem
              key={index}
              index={index}
              data={item}
              onHover={(e: any) => {
                setTooltip({ x: e.pageX, y: e.pageY });
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
            ? { top: tooltip.y - 10, left: tooltip.x - 10 }
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
