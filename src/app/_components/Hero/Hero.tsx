import NavBar from "@/components/layout/NavBar/NavBar";
import styles from "./Hero.module.scss";
import BackgroundBlur from "@/components/layout/BackgroundBlur/BackgroundBlur";
import Main from "./components/Main/Main";

const Hero = () => {
  return (
    <div className={styles["wrapper"]}>
      <NavBar />
      <Main />
    </div>
  );
};

export default Hero;
