"use client";
import LoadingScreen from "@/components/loading/LoadingScreen/LoadingScreen";
import Image from "next/image";
import { useEffect, useState } from "react";
import Hero from "./_components/Hero/Hero";
import RotatingLogo from "@/components/3d/RotatingLogo/RotatingLogo";
import BackgroundBlur from "@/components/layout/BackgroundBlur/BackgroundBlur";
import About from "./_components/About/About";
import Works from "./_components/Works/Works";
import { useGLTF } from "@react-three/drei";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadeout, setIsFadeout] = useState(false);
  useGLTF.preload("/gltf/logo.glb");
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadeout(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
  }, [isLoading]);

  return (
    <>
      {isLoading ? <LoadingScreen fadeOut={isFadeout} /> : null}
      {/* <LoadingScreen fadeOut={isFadeout} /> */}
      <div
        className={`items-center justify-items-center min-h-screen transition-all duration-700 ease-out
          ${
            isLoading ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
          }`}
      >
        <main className="flex flex-col row-start-2 items-center sm:items-start relative z-0">
          <BackgroundBlur />
          {/* <RotatingLogo /> */}
          <Hero />
          <About />
          <Works />
        </main>
        <footer
          id="footer"
          className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"
        >
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
    </>
  );
}
