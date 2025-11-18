"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { initLenis } from "@/lib/lenis";
import styles from "./ImageFrame.module.scss";

type ImageFrameProps = {
  imgs: string[];
  wrapperRef: React.RefObject<HTMLDivElement | null>;
};

const ImageFrame = ({ imgs, wrapperRef }: ImageFrameProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const createdTriggersRef = useRef<any[]>([]);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      await new Promise((r) => requestAnimationFrame(r));
      await new Promise((r) => requestAnimationFrame(r));
      await new Promise((r) => setTimeout(r, 3000));
      if (!mounted) return;

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.defaults({ scroller: window });

      const yOffset = window.innerHeight * 0.1;
      const height = window.innerHeight;

      initLenis();
      gsap.ticker.lagSmoothing(0);

      if (!containerRef.current) return;

      const pre = ScrollTrigger.getAll().slice();

      const container = containerRef.current;
      const layers = Array.from(container.children) as HTMLElement[];

      gsap.set(layers[0], { clipPath: "inset(0% 0% 0% 0%)" });

      layers.forEach((layer, i) => {
        if (i === 0) return;

        gsap.to(layer, {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef?.current,
            start: `top+=${(i - 1) * height + yOffset} top`,
            end: `+=${height * 0.8}`,
            scrub: true,
          },
        });
      });

      const post = ScrollTrigger.getAll();
      createdTriggersRef.current = post.filter((t) => !pre.includes(t));

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
    <div className={styles["scroll-container"]}>
      <div className={styles["stack"]} ref={containerRef}>
        {imgs.map((src, index) => (
          <Image
            className={styles["layer"]}
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            /* increase intrinsic size & quality to avoid browser upscaling a tiny image */
            width={1920}
            height={1080}
            quality={90}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageFrame;
