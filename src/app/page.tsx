"use client";

import LoadingScreen from "@/components/loading/LoadingScreen/LoadingScreen";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Hero from "./_components/Hero/Hero";
import RotatingLogo from "@/components/3d/RotatingLogo/RotatingLogo";
import BackgroundBlur from "@/components/layout/BackgroundBlur/BackgroundBlur";
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

  // prevent scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // handle loading fade sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadeout(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 400); // keep a slight delay for fade animation
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // disable scrolling while loading
  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
  }, [isLoading]);

  return (
    <>
      <BackgroundBlur />

      {isLoading && <LoadingScreen fadeOut={isFadeout} />}
      <div
        className={`transition-opacity duration-700 ease-out ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="fixed top-0 left-0 w-full z-30 pointer-events-auto">
          <NavBar isBlack={isBlack} />
        </div>

        <div className="fixed top-0 left-0 w-full z-10 flex flex-col items-center justify-center">
          <Hero />
        </div>

        <main className="relative w-full overflow-x-hidden">
          <RotatingLogo />
          <SectionWithFloatingBackground setIsBlack={setIsBlack} />
        </main>
      </div>
    </>
  );
}

function SectionWithFloatingBackground({
  setIsBlack,
}: {
  setIsBlack: (v: boolean) => void;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const shouldBeFixed = rect.top <= 0 && rect.bottom >= vh;

      setIsFixed((prev) => {
        if (prev !== shouldBeFixed) {
          // trigger animation when state changes
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 600);
        }
        return shouldBeFixed;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      ref={parentRef}
      className="relative mt-[100vh] z-20 bg-white overflow-hidden"
    >
      {/* ✅ Floating background layer with smooth transition */}
      <div
        className={`${
          isFixed ? "fixed top-0 left-0" : "absolute top-0 left-0"
        } w-full h-screen z-0 pointer-events-none
          transition-all duration-700 ease-in-out
          ${isFixed ? "opacity-100 scale-100" : "opacity-80 scale-105"}
          ${isAnimating ? "will-change-transform" : ""}
        `}
      >
        <Image
          src="/svgs/round-blur.svg"
          alt="blur background"
          width={200}
          height={200}
          className="absolute top-[-25vh] left-0 h-[150vh] w-[150vw]
                     filter blur-[200px] opacity-70
                     transition-transform duration-700 ease-out"
        />
      </div>

      {/* ✅ Foreground content */}
      <div className="relative z-10">
        <About />
        <Works />
        <Slogan onToggle={setIsBlack} />
        <Footer />
      </div>
    </div>
  );
}
