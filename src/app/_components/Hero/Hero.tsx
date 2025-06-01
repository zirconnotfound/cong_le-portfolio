import NavBar from "@/components/layout/NavBar/NavBar";
import styles from "./Hero.module.scss";
import BackgroundBlur from "@/components/layout/BackgroundBlur/BackgroundBlur";

const Hero = () => {
  return (
    <div className={styles["wrapper"]}>
      <BackgroundBlur />
      <NavBar />
    </div>
  );
};

export default Hero;
