import styles from "./BackgroundBlur.module.scss";
import Image from "next/image";

type positionProps = "relative" | "absolute" | "fixed" | "static" | "sticky";

const BackgroundBlur = ({ position }: { position: positionProps }) => {
  return (
    <Image
      src="/svgs/round-blur.svg"
      alt="Loading"
      width={200}
      height={200}
      className={`${styles.image} ${position}`}
    />
  );
};

export default BackgroundBlur;
