"use client";

import ProcessItem from "./components/ProcessItem/ProcessItem";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initLenis } from "@/lib/lenis";
import { sfuCentury } from "@/fonts";
import styles from "./Process.module.scss";
import { useEffect, useRef } from "react";
import ImageFrame from "./components/ImageFrame/ImageFrame";

const processItems = [
  {
    number: "001",
    title: "Empathize",
    img: "/img/process/empathy.png",
    text: "We learn, understand users, customer in order to approach their needs with maximum deliverable.",
  },
  {
    number: "002",
    title: "Ideate",
    img: "/img/process/ideate.png",
    text: "We define objective, think and share ideas that feasible, desirable and viable to meet users need, expectation and emotions.",
  },
  {
    number: "003",
    title: "Create",
    img: "/img/process/create.png",
    text: "Through research, wireframe and prototype, we bring visionary ideas. Each proposal generates a meaningful and lasting emotional impact.",
  },
  {
    number: "004",
    title: "Deliver",
    img: "/img/process/deliver.png",
    text: "We observe customer comment react and deliver product with highest quality.",
  },
];

const images = processItems.map((item) => item.img);

const Process = () => {
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const createdTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      await new Promise((r) => requestAnimationFrame(r));
      await new Promise((r) => requestAnimationFrame(r));
      await new Promise((r) => setTimeout(r, 4000));
      if (!mounted) return;

      gsap.registerPlugin(ScrollTrigger);
      initLenis();
      gsap.ticker.lagSmoothing(0);

      if (listWrapperRef.current) {
        const pre = ScrollTrigger.getAll().slice();

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

        const post = ScrollTrigger.getAll();
        createdTriggersRef.current = post.filter((t) => !pre.includes(t));
      }

      ScrollTrigger.refresh();
    };

    init();

    return () => {
      mounted = false;
      createdTriggersRef.current.forEach((t) => {
        try {
          t.kill();
        } catch {}
      });
    };
  }, []);

  return (
    <div className={styles["wrapper"]} id="process">
      <div className={styles["title"]}>
        <p className={`${styles["title-content"]} ${sfuCentury.className}`}>
          Our process
        </p>
      </div>
      <div className={styles["content"]}>
        <div className={styles["image-frame-wrapper"]}>
          <ImageFrame imgs={images} wrapperRef={listWrapperRef} />
        </div>
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
