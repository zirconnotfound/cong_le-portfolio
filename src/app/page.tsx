"use client";
import LoadingScreen from "@/components/loading/LoadingScreen/LoadingScreen";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Hero from "./_components/Hero/Hero";
const RotatingLogo = dynamic(
  () => import("@/components/3d/RotatingLogo/RotatingLogo"),
  { ssr: false, loading: () => null }
);

import About from "./_components/About/About";
import Works from "./_components/Works/Works";
import Footer from "./_components/Footer/Footer";
import { useGLTF } from "@react-three/drei";
import NavBar from "@/components/layout/NavBar/NavBar";
import Slogan from "./_components/Slogan/Slogan";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadeout, setIsFadeout] = useState(false);
  const [isBlack, setIsBlack] = useState(false);

  useGLTF.preload("/gltf/logo.glb");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadeout(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
    }, 2300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // remove pre-hydration no-scroll lock once loading finished so layout stabilizes
    if (!isLoading) {
      try {
        document.documentElement.classList.remove("no-scroll-before-hydration");
        document.documentElement.classList.remove("no-scroll");
      } catch (e) {}

      // refresh GSAP ScrollTrigger measurements after layout stabilizes
      try {
        // lazy-import to avoid bundling gsap on server
        const gsap = require("gsap");
        if (gsap && gsap.ScrollTrigger) {
          gsap.ScrollTrigger.refresh();
        }
      } catch (e) {
        /* ignore if gsap isn't present */
      }
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? <LoadingScreen fadeOut={isFadeout} /> : null}
      <div className="fixed top-0 left-0 w-full z-10 flex flex-col items-center justify-center mt-[4rem]">
        <Hero />
        <RotatingLogo />
      </div>

      <NavBar isBlack={isBlack} />
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
        <Slogan onToggle={setIsBlack} />
        <Footer />
      </div>
    </>
  );
}
