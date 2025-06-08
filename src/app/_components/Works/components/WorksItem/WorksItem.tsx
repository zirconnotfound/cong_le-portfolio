import styles from "./WorksItem.module.scss";
import Image from "next/image";
import { ItemProps } from "../../Works";
import { Judson, Oswald } from "next/font/google";

type WorksItemProps = {
  index: number;
  data: ItemProps;
};

const judson = Judson({
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  subsets: ["latin"],
});

const WorksItem = ({ index, data }: WorksItemProps) => {
  return (
    <div
      className={styles["wrapper"]}
      style={
        index % 2 === 0
          ? { flexDirection: "row" }
          : { flexDirection: "row-reverse" }
      }
    >
      <div className={styles["image-wrapper"]}>
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
          <p className={`${styles["title"]} ${judson.className}`}>
            {data.title}
          </p>
          <p className={`${styles["type"]} ${oswald.className}`}>{data.type}</p>
        </div>
        <button
          className={styles["link"]}
          type="button"
          onClick={() => window.open(data.link, "_blank")}
        >
          <Image
            src="/img/link-to.png"
            width={81}
            height={81}
            alt={data.title}
          />
        </button>
      </div>
    </div>
  );
};

export default WorksItem;
