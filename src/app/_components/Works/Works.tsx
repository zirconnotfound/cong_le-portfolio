"use client";

import WorksItem from "./components/WorksItem/WorksItem";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { sfuCentury } from "@/fonts";
import styles from "./Works.module.scss";

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
    img: "/img/works/1hub.png",
  },
  {
    title: "EZFORM",
    type: "Website",
    link: "https://1hub.network",
    img: "/img/works/ezform.png",
  },
  {
    title: "LLIEMSD",
    type: "Website",
    link: "https://1hub.network",
    img: "/img/works/1hub.png",
  },
  {
    title: "1HUB.Network",
    type: "Platform",
    link: "https://1hub.network",
    img: "/img/works/ezform.png",
  },
];

const Works = ({ onToggle } : any) => {
  const connectorRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<GSAPTimeline | null>(null);
  const triggeredRef = useRef<boolean>(false);

  useEffect(() => {
    tlRef.current = gsap.timeline({ paused: true });
    tlRef.current.to(connectorRef.current, {
      backgroundColor: "#000",
      duration: 0.5,
      ease: "power2.out",
    });

    const handleScroll = () => {
      if (!connectorRef.current || !tlRef.current) return;

      const rect = connectorRef.current.getBoundingClientRect();
      const middleY = rect.top + rect.height / 2;
      const viewportMiddle = window.innerHeight / 2;

      if (middleY <= viewportMiddle && !triggeredRef.current) {
        tlRef.current.play();
        triggeredRef.current = true;
        onToggle(true);
      } else if (middleY > viewportMiddle && triggeredRef.current) {
        tlRef.current.reverse();
        triggeredRef.current = false;
        onToggle(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={styles["wrapper"]} id="works">
        <div className={`${styles["title"]} ${sfuCentury.className}`}>
          <p className={styles["title-text"]}>Our works</p>
        </div>
        <div className={styles["work-list"]}>
          {worksList.map((item, index) => (
            <WorksItem key={index} index={index} data={item} />
          ))}
        </div>
      </div>
      <div className={styles["connector"]} ref={connectorRef}></div>
    </>
  );
};

export default Works;
