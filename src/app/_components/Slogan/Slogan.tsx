"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initLenis } from "@/lib/lenis";
import { sfuCentury } from "@/fonts";
import Image from "next/image";
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
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

    gsap.registerPlugin(ScrollTrigger);
    initLenis();
    gsap.ticker.lagSmoothing(0);

    tlRef.current = gsap.timeline({ paused: true });
    if (windowWidth > 768) {
      tlRef.current.to(connectorRef.current, {
        backgroundColor: "#000",
        duration: 0.5,
        ease: "power2.out",
      });
    }

    const handleScroll = () => {
      if (!connectorRef.current || !tlRef.current) return;

      const rect = connectorRef.current.getBoundingClientRect();
      const middleY = rect.top;
      const viewportMiddle = 0;

      if (middleY <= viewportMiddle && !triggeredRef.current) {
        if (windowWidth > 768) {
          tlRef.current.play();
          try {
            ScrollTrigger.refresh();
          } catch {}
        }
        triggeredRef.current = true;
        onToggle(true);
      } else if (middleY > viewportMiddle && triggeredRef.current) {
        if (windowWidth > 768) {
          tlRef.current.reverse();
          try {
            ScrollTrigger.refresh();
          } catch {}
        }
        triggeredRef.current = false;
        onToggle(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onToggle]);
  return (
    <div className={styles["connector"]} ref={connectorRef}>
      <div className={styles["slogan-container"]}>
        <Image
          src="/svgs/logo.svg"
          alt="Logo"
          width={100}
          height={100}
          className={styles["logo"]}
        />
        <div className={styles["slogan-desktop"]}>
          <SlideIn firstLine={firstLine} secondLine={secondLine} />
        </div>
        <div className={`${styles["slogan-mobile"]} ${sfuCentury.className}`}>
          <div className={styles["first-line"]}>
            <p>Create</p>
            <p>unique stories</p>
          </div>
          <div className={styles["second-line"]}>
            <p>that people</p>
            <p>remember.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slogan;
