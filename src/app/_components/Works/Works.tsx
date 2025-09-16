import BackgroundBlur from "@/components/layout/BackgroundBlur/BackgroundBlur";
import WorksItem from "./components/WorksItem/WorksItem";
import { Judson } from "next/font/google";
import styles from "./Works.module.scss";

const judson = Judson({
  subsets: ["latin"],
  weight: "400",
});

export type ItemProps = {
  title: string;
  type: string;
  link: string;
  img: string;
};

const worksList: ItemProps[] = [
  {
    title: "1HUB.Network",
    type: "Platform",
    link: "https://1hub.network",
    img: "/img/works/1hub.png",
  },
  {
    title: "EZFORM",
    type: "Website",
    link: "https://1hub.network",
    img: "/img/works/ezform.png",
  },
  {
    title: "LLIEMSD",
    type: "Website",
    link: "https://1hub.network",
    img: "/img/works/1hub.png",
  },
  {
    title: "1HUB.Network",
    type: "Platform",
    link: "https://1hub.network",
    img: "/img/works/ezform.png",
  },
];

const Works = () => {
  return (
    <div className={styles["wrapper"]}>
      <div className={`${styles["title"]} ${judson.className}`}>
        {/* <div className={styles["background-blur"]} style={{ opacity: 0.8 }}>
          <BackgroundBlur />
        </div> */}
        <p className={styles["title-text"]}>Our works</p>
      </div>
      <div className={styles["work-list"]}>
        {worksList.map((item, index) => (
          <WorksItem key={index} index={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Works;
