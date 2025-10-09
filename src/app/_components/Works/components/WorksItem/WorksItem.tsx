"use client";

import styles from "./WorksItem.module.scss";
import Image from "next/image";
import { ItemProps } from "../../Works";
import { sfuCentury, swiss } from "@/fonts";

type WorksItemProps = {
  index: number;
  data: ItemProps;
  onHover: (e: any) => void;
  onLeave: () => void;
};

const WorksItem = ({ index, data, onHover, onLeave }: WorksItemProps) => {
  return (
    <>
      <div
        className={styles["wrapper"]}
        style={
          index % 2 === 0
            ? { flexDirection: "row" }
            : { flexDirection: "row-reverse" }
        }
      >
        <div
          className={styles["image-wrapper"]}
          onClick={() =>
            window.open(data.link, "_blank", "noopener,noreferrer")
          }
          onMouseMove={onHover}
          onMouseLeave={onLeave}
        >
          <Image
            src={data.img}
            fill
            alt={data.title}
            className={styles["image"]}
          />
        </div>
        <div className={styles["content"]}>
          <div className={styles["content-text"]}>
            <p className={`${styles["title"]} ${sfuCentury.className}`}>
              {data.title}
            </p>
            <p className={`${styles["type"]} ${swiss.className}`}>
              {data.type}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorksItem;
