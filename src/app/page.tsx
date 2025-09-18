"use client";
import LoadingScreen from "@/components/loading/LoadingScreen/LoadingScreen";
import { useEffect, useState } from "react";
import Hero from "./_components/Hero/Hero";
import RotatingLogo from "@/components/3d/RotatingLogo/RotatingLogo";
import BackgroundBlur from "@/components/layout/BackgroundBlur/BackgroundBlur";
import About from "./_components/About/About";
import Works from "./_components/Works/Works";
import Footer from "./_components/Footer/Footer";
import { useGLTF } from "@react-three/drei";
import NavBar from "@/components/layout/NavBar/NavBar";

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
      }, 200);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
  }, [isLoading]);

  return (
    <>
      <BackgroundBlur />
      {isLoading ? <LoadingScreen fadeOut={isFadeout} /> : null}
      {/* <LoadingScreen fadeOut={isFadeout} /> */}
      <div
        className={`items-center justify-items-center min-h-screen transition-all duration-700 ease-out z-1 relative
          ${
            isLoading ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
          }`}
      >
        <main className="flex flex-col row-start-2 items-center sm:items-start relative z-1">
          <NavBar />
          <RotatingLogo />
          <Hero />
          <About />
          <Works />
        </main>
        <Footer />
      </div>
    </>
  );
}
