import Image from "next/image";
import styles from "./ProcessItem.module.scss";
import { sfuCentury, swiss } from "@/fonts";

type ProcessItemProps = {
  number: string;
  title: string;
  img: string;
  text: string;
};

const ProcessItem = (props: ProcessItemProps) => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["content"]}>
        <div className={styles["left-col"]}>
          <div className={`${styles["number"]} ${swiss.className}`}>
            {props.number}
          </div>
          <div className={`${styles["title"]} ${sfuCentury.className}`}>
            {props.title}
          </div>
        </div>
        <div className={styles["mid-col"]}>
          <div className={styles["img-wrapper"]}>
            <Image
              src={props.img}
              alt={props.title}
              className={styles["img"]}
              width={2000}
              height={2000}
            />
          </div>
        </div>
        <div className={styles["right-col"]}>
          <div className={`${styles["text"]} ${swiss.className}`}>
            {props.text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessItem;
