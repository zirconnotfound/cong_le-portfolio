import styles from "./BackgroundBlur.module.scss";
import Image from "next/image";

const BackgroundBlur = () => {
  return (
    <Image
      src="/svgs/round-blur.svg"
      alt="Loading"
      width={200}
      height={200}
      className={styles.image}
    />
  );
};

export default BackgroundBlur;
