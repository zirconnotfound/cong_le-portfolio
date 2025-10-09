"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Slogan.module.scss";
import SlideIn from "./components/SlideIn/SlideIn";

const firstLine = "Create unique stories";
const secondLine = "that people remember.";

type SloganProps = {
  onToggle: (active: boolean) => void;
};

const Slogan = ({ onToggle }: SloganProps) => {
  const connectorRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<GSAPTimeline | null>(null);
  const triggeredRef = useRef<boolean>(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    tlRef.current = gsap.timeline({ paused: true });
    tlRef.current.to(connectorRef.current, {
      backgroundColor: "#000",
      duration: 0.5,
      ease: "power2.out",
    });

    const handleScroll = () => {
      if (!connectorRef.current || !tlRef.current) return;

      const rect = connectorRef.current.getBoundingClientRect();
      const middleY = rect.top;
      const viewportMiddle = 0;

      if (middleY <= viewportMiddle && !triggeredRef.current) {
        tlRef.current.play();
        // refresh ScrollTrigger positions since layout/style changed
        try {
          ScrollTrigger.refresh();
        } catch (e) {}
        triggeredRef.current = true;
        onToggle(true);
      } else if (middleY > viewportMiddle && triggeredRef.current) {
        tlRef.current.reverse();
        try {
          ScrollTrigger.refresh();
        } catch (e) {}
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
    <div className={styles["connector"]} ref={connectorRef}>
      <div className={styles["slogan-container"]}>
        <SlideIn firstLine={firstLine} secondLine={secondLine} />
      </div>
    </div>
  );
};

export default Slogan;
