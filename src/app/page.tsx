"use client";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/loading/LoadingScreen/LoadingScreen";
import { useEffect, useState } from "react";
import Hero from "./_components/Hero/Hero";

const RotatingLogo = dynamic(
  () => import("@/components/3d/RotatingLogo/RotatingLogo"),
  { ssr: false, loading: () => null }
);

const About = dynamic(() => import("./_components/About/About"), {
  ssr: false,
  loading: () => null,
});
const Works = dynamic(() => import("./_components/Works/Works"), {
  ssr: false,
  loading: () => null,
});
const Footer = dynamic(() => import("./_components/Footer/Footer"), {
  ssr: false,
  loading: () => null,
});
import NavBar from "@/components/layout/NavBar/NavBar";
import Slogan from "./_components/Slogan/Slogan";
import Process from "./_components/Process/Process";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadeout, setIsFadeout] = useState(false);
  const [isWhite, setIsWhite] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadeout(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // completely lock scrolling while the loading screen is visible
  useEffect(() => {
    let savedScrollY = 0;
    let wheelHandler: (e: Event) => void;
    let touchHandler: (e: Event) => void;
    let keyHandler: (e: KeyboardEvent) => void;

    if (isLoading && typeof window !== "undefined") {
      savedScrollY = window.scrollY || document.documentElement.scrollTop || 0;

      // prevent scroll via wheel / touch
      wheelHandler = (e: Event) => e.preventDefault();
      touchHandler = (e: Event) => e.preventDefault();
      keyHandler = (e: KeyboardEvent) => {
        const blocked = [
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
          " ",
        ];
        if (blocked.includes(e.key)) e.preventDefault();
      };

      // freeze layout at current scroll position
      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.documentElement.style.overflow = "hidden";

      window.addEventListener("wheel", wheelHandler, { passive: false });
      window.addEventListener("touchmove", touchHandler, { passive: false });
      window.addEventListener("keydown", keyHandler, { passive: false });
    }

    return () => {
      // restore scrolling & layout
      try {
        window.removeEventListener("wheel", wheelHandler as EventListener);
        window.removeEventListener("touchmove", touchHandler as EventListener);
        window.removeEventListener("keydown", keyHandler as EventListener);
      } catch {}

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";

      // restore previous scroll position
      if (typeof window !== "undefined") {
        window.scrollTo(0, savedScrollY);
      }
    };
  }, [isLoading]);

  // useEffect(() => {
  //   // remove pre-hydration no-scroll lock once loading finished so layout stabilizes
  //   if (!isLoading) {
  //     try {
  //       document.documentElement.classList.remove("no-scroll-before-hydration");
  //       document.documentElement.classList.remove("no-scroll");
  //     } catch {}

  //     // refresh GSAP ScrollTrigger measurements after layout stabilizes
  //     try {
  //       // lazy-import to avoid bundling gsap on server
  //       import("gsap").then((mod) => {
  //         const gsap = mod as unknown as {
  //           ScrollTrigger?: { refresh?: () => void };
  //         };
  //         if (
  //           gsap.ScrollTrigger &&
  //           typeof gsap.ScrollTrigger.refresh === "function"
  //         ) {
  //           gsap.ScrollTrigger.refresh();
  //         }
  //       });
  //     } catch {
  //       /* ignore if gsap isn't present */
  //     }
  //   }
  // }, [isLoading]);

  return (
    <>
      {isLoading ? <LoadingScreen fadeOut={isFadeout} /> : null}
      <div className="fixed top-0 left-0 w-full z-10 flex flex-col items-center justify-center mt-[4rem]">
        <Hero />
        <RotatingLogo />
      </div>

      {isLoading ? null : <NavBar isWhite={isWhite} />}
      <div
        className={`items-center justify-items-center min-h-screen transition-opacity duration-700 ease-out relative w-full overflow-x-hidden
          ${isLoading ? "opacity-0" : "opacity-100"} relative z-20`}
      >
        <div className="relative mt-[100vh] z-20 bg-white overflow-hidden pb-[25vh]">
          <About />
        </div>
      </div>
      <div className="z-20 bg-white relative">
        <Works />
        <Process />
        <Slogan onToggle={setIsWhite} />
        <Footer />
      </div>
    </>
  );
}
