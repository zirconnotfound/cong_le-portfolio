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
    // register plugin once
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    const scrollText = scrollTextRef.current;
    const title = titleRef.current;
    const viewHeight = window.innerHeight;

    if (scrollText && title) {
      const yOffset = (title.offsetHeight / 3) * 2;
      const distance = 0.7 * viewHeight - title.offsetHeight;

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

      // ensure ScrollTrigger measurements are correct after fonts / full load
      const onFontsReady = () => {
        try {
          ScrollTrigger.refresh();
        } catch {
          /* ignore */
        }
      };
      if (typeof document !== "undefined" && "fonts" in document) {
        // refresh once fonts are ready (prevents layout-shift measuring issues)
        document.fonts.ready.then(onFontsReady).catch(() => {});
      }
      window.addEventListener("load", onFontsReady);

      // watch for body attribute/style/class changes (e.g., loading overlay toggles)
      let bodyObserver: MutationObserver | null = null;
      try {
        if (typeof document !== "undefined" && document.body) {
          bodyObserver = new MutationObserver(() => {
            try {
              ScrollTrigger.refresh();
            } catch {}
          });
          bodyObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ["style", "class"],
          });
        }
      } catch {
        /* ignore */
      }

      // fallback timed refresh to cover the 3s loader + fade duration
      const fallbackTimer = window.setTimeout(() => {
        try {
          ScrollTrigger.refresh();
        } catch (e) {}
      }, 4000);

      return () => {
        timeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        window.removeEventListener("load", onFontsReady);
        if (bodyObserver) bodyObserver.disconnect();
        clearTimeout(fallbackTimer);
      };
    }
  }, []);
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
