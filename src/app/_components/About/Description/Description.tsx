import styles from "./Description.module.scss";
import { sfuCentury, swiss } from "@/fonts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Paragraph from "./components/Paragraph/Paragraph";

const text =
  "We're fueled by curiosity and creativity. We seek to improve the quality of the built environment with subtle, yet confident designs characterised by clean lines and forms linked inextricably with function. Each design is unique, crafted to add commercial, social and aesthetic value.";

const Description = () => {
  const scrollTextRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scrollText = scrollTextRef.current;
    const title = titleRef.current;

    if (scrollText && title) {
      const speed = 1.15;
      const yOffset = (title.offsetHeight / 3) * 2;
      const distance = yOffset * speed;

      // gsap.to(scrollText, {
      //   y: yOffset,
      //   ease: "none",
      //   scrollTrigger: {
      //     trigger: scrollText,
      //     start: "top bottom-=" + scrollText.offsetHeight / 2,
      //     end: "bottom bottom-=" + distance,
      //     scrub: true,
      //     markers: true,
      //   },
      // });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrollText,
          start: "top bottom-=" + scrollText.offsetHeight / 2,
          end: "bottom bottom-=" + distance,
          scrub: true,
          invalidateOnRefresh: true,
        },
        defaults: {
          ease: "none",
        },
      });

      timeline.to(scrollText, { y: yOffset });

      return () => {
        timeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  });
  return (
    <div
      className={`${styles["wrapper"]} animate-fade-in transition-all duration-700 ease-out`}
    >
      <div className={`${styles["title-wrapper"]} ${sfuCentury.className}`}>
        <p className={styles["scroll-text"]} ref={scrollTextRef}>
          We
        </p>
        <div className={styles["title"]} ref={titleRef}>
          <p className={styles["title-text"]}>think, find solution.</p>
          <p className={styles["title-text"]}>create the exquisite.</p>
          <p className={styles["title-text"]}>desire to grow</p>
        </div>
      </div>
      <div className={`${styles["content"]} ${swiss.className}`}>
        <Paragraph text={text} />
      </div>
    </div>
  );
};

export default Description;
