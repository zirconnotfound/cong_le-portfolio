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
import Slogan from "./_components/Slogan/Slogan";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadeout, setIsFadeout] = useState(false);
  const [isBlack, setIsBlack] = useState(false);

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
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
  }, [isLoading]);

  return (
    <>
      {isLoading ? <LoadingScreen fadeOut={isFadeout} /> : null}
      <div className="fixed top-0 left-0 w-full z-10 flex flex-col items-center justify-center">
        <Hero />
        <RotatingLogo />
      </div>

      <NavBar isBlack={isBlack} />
      <div
        className={`items-center justify-items-center min-h-screen transition-opacity duration-700 ease-out relative w-full overflow-x-hidden
          ${isLoading ? "opacity-0" : "opacity-100"} relative z-20`}
      >
        <div className="relative mt-[100vh] z-20 bg-white overflow-hidden">
          <BackgroundBlur position="absolute" />
          <About />
        </div>
      </div>
      <div className="z-20 bg-white relative">
        <BackgroundBlur position="sticky" />
        <div className="-mt-[150vh]">
          <Works />
          <Slogan onToggle={setIsBlack} />
          <Footer />
        </div>
      </div>
    </>
  );
}
