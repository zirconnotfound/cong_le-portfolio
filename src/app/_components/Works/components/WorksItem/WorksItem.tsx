"use client";

import styles from "./WorksItem.module.scss";
import Image from "next/image";
import { useRef } from "react";
import { ItemProps } from "../../Works";
import { sfuCentury, swiss } from "@/fonts";

type WorksItemProps = {
  index: number;
  data: ItemProps;
};

const WorksItem = ({ index, data }: WorksItemProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  if (tooltipRef.current && areaRef.current) {
    const tooltip = tooltipRef.current;
    const area = areaRef.current;

    area.onmouseover = (e) => {
      tooltip.style.display = "block";
    };

    area.onmousemove = (e) => {
      tooltip.style.left = e.pageX + "px";
      tooltip.style.top = e.pageY + "px";
    };

    area.onmouseout = (e) => {
      tooltip.style.display = "none";
    };
  }

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
          ref={areaRef}
        >
          <Image
            src={data.img}
            width={300}
            height={200}
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
      <div className={styles["tooltip"]} ref={tooltipRef}>
        Details
      </div>
    </>
  );
};

export default WorksItem;
