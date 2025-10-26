"use client";

import ProcessItem from "./components/ProcessItem";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { sfuCentury } from "@/fonts";
import styles from "./Process.module.scss";
import { useEffect, useRef } from "react";

const processItems = [
  {
    number: "001",
    title: "Empathize",
    img: "/img/process/1.webp",
    text: "We learn, understand users, customer in order to approach their needs with maximum deliverable.",
  },
  {
    number: "002",
    title: "Ideate",
    img: "/img/process/1.webp",
    text: "We define objective, think and share ideas that feasible, desirable and viable to meet users need, expectation and emotions.",
  },
  {
    number: "003",
    title: "Create",
    img: "/img/process/1.webp",
    text: "Through research, wireframe and prototype, we bring visionary ideas. Each proposal generates a meaningful and lasting emotional impact.",
  },
  {
    number: "004",
    title: "Deliver",
    img: "/img/process/1.webp",
    text: "We observe customer comment react and deliver product with highest quality.",
  },
];

const Process = () => {
  const listWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      await new Promise((r) => requestAnimationFrame(r));
      await new Promise((r) => requestAnimationFrame(r));
      await new Promise((r) => setTimeout(r, 3000));
      if (!mounted) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      if (listWrapperRef.current) {
        const sections = Array.from(
          listWrapperRef.current.children
        ) as HTMLElement[];

        sections.forEach((section) => {
          gsap.set(section, { opacity: 1 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=600",
              scrub: true,
              pin: section,
              pinSpacing: false,
              snap: 1,
            },
          });

          tl.to(section, { y: 0, ease: "none" }, 0);
          tl.to(section, { y: -40, opacity: 0, ease: "power1.out" }, 0);
        });
      }

      ScrollTrigger.refresh();
    };

    init();

    return () => {
      mounted = false;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["title"]}>
        <p className={`${styles["title-content"]} ${sfuCentury.className}`}>
          Our process
        </p>
      </div>
      <div className={styles["content"]}>
        <div className={styles["list-wrapper"]} ref={listWrapperRef}>
          {processItems.map((item) => (
            <ProcessItem
              key={item.number}
              number={item.number}
              title={item.title}
              img={item.img}
              text={item.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Process;
