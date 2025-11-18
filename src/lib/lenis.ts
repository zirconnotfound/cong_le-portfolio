import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let instance: Lenis | null = null;
let rafCb: ((time: number) => void) | null = null;

export function initLenis() {
  if (instance) return instance;

  instance = new Lenis();

  // Drive Lenis via GSAP ticker so timings stay consistent
  rafCb = (time: number) => {
    try {
      // Lenis expects seconds in this version (we pass ms to raf in some setups), keep using seconds
      instance!.raf(time * 1000);
    } catch (e) {
      // ignore
    }
  };

  gsap.ticker.add(rafCb);

  // ensure ScrollTrigger updates when Lenis scrolls
  try {
    instance.on("scroll", () => {
      try {
        ScrollTrigger.update();
      } catch {}
    });
  } catch {}

  return instance;
}

export function destroyLenis() {
  if (!instance) return;
  if (rafCb) gsap.ticker.remove(rafCb);
  try {
    instance.destroy();
  } catch {}
  instance = null;
  rafCb = null;
}
