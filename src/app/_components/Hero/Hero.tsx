import styles from "./Hero.module.scss";
import Main from "./components/Main/Main";
import BackgroundBlur from "@/components/layout/BackgroundBlur/BackgroundBlur";

const Hero = () => {
  return (
    <div className={styles["wrapper"]}>
      <BackgroundBlur position="absolute" />
      <Main />
    </div>
  );
};

export default Hero;
