import styles from "./Description.module.scss";
import { sfuCentury, swiss } from "@/fonts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { initLenis } from "@/lib/lenis";
import Paragraph from "./components/Paragraph/Paragraph";

const text =
  "We're fueled by curiosity and creativity. We seek to improve the quality of the built environment with subtle, yet confident designs characterised by clean lines and forms linked inextricably with function. Each design is unique, crafted to add commercial, social and aesthetic value.";

const Description = () => {
  const scrollTextRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const createdTriggersRef = useRef<any[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    initLenis();
    gsap.ticker.lagSmoothing(0);
  }, []);

  useEffect(() => {
    const scrollText = scrollTextRef.current;
    const title = titleRef.current;
    const viewHeight = window.innerHeight;
    let mounted = true;

    const init = async () => {
      await new Promise((r) => requestAnimationFrame(r));
      await new Promise((r) => requestAnimationFrame(r));

      // run long delay only on the first initialization during THIS page load.
      // Use an in-memory window-global flag + promise so:
      // - a full page load / reload triggers the delay
      // - client-side toggles (component mounts within same page) skip the delay
      // - React Strict Mode double-mounts share a single promise and won't re-run the timer
      const isClient = typeof window !== "undefined";
      if (isClient) {
        type DescriptionInitWindow = Window & {
          __descriptionInitDone?: boolean;
          __descriptionInitPromise?: Promise<void>;
        };
        const globalWindow = window as DescriptionInitWindow;

        const alreadyDone = !!globalWindow.__descriptionInitDone;
        if (!alreadyDone) {
          if (!globalWindow.__descriptionInitPromise) {
            // create the one-time delay promise and store it on window
            globalWindow.__descriptionInitPromise = new Promise<void>(
              (resolve) => {
                const delay = 3400;
                setTimeout(() => {
                  try {
                    globalWindow.__descriptionInitDone = true;
                  } catch {}
                  resolve();
                }, delay);
              }
            );
          }
          // wait for the one-time delay to complete (no-op if already resolved)
          await globalWindow.__descriptionInitPromise;
        }
      }
      if (!mounted) return;

      if (scrollText && title) {
        const yOffset = (title.offsetHeight / 3) * 2;
        const distance = 0.7 * viewHeight - title.offsetHeight;
        const pre = ScrollTrigger.getAll().slice();

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

        const post = ScrollTrigger.getAll();
        createdTriggersRef.current = post.filter((t) => !pre.includes(t));

        ScrollTrigger.refresh();
      }
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
    <div
      className={`${styles["wrapper"]} animate-fade-in transition-all duration-700 ease-out`}
    >
      <div className={styles["title-container"]}>
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
      </div>
      <div className={`${styles["content"]} ${swiss.className}`}>
        <Paragraph text={text} />
      </div>
    </div>
  );
};

export default Description;
