"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Team.module.scss";
import Link from "next/link";
import { sfuCentury, swiss } from "@/fonts";

const teamData = [
  {
    name: "Cong Q La",
    position: "Founder",
    image: "/img/teams/cong_la.webp",
    email: "",
    instagram: "",
    linkedin: "",
  },
  {
    name: "Son C Nguyen",
    position: "Developer",
    image: "/img/teams/son_nguyen.webp",
    email: "",
    instagram: "",
    linkedin: "",
  },
  {
    name: "Huong T Tran",
    position: "Founder",
    image: "/img/teams/huong_tran.webp",
    email: "",
    instagram: "",
    linkedin: "",
  },
  {
    name: "Hung V Nguyen",
    position: "Founder",
    image: "",
    email: "",
    instagram: "",
    linkedin: "",
  },
];

const Team = () => {
  const [teamIndex, setTeamIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const handleTeamMemberHover = (index: number) => {
    setTeamIndex(index);
    centerOnIndex(index);
  };
  const handleTeamMemberOut = () => {};

  const centerOnIndex = (index: number) => {
    const container = containerRef.current;
    const item = itemRefs.current[index];
    if (!container || !item) return;

    if (typeof window === "undefined") return;
    if (window.innerWidth > 768) return;

    try {
      const halfItemPx = Math.round(item.clientWidth / 2);

      const padPx = Math.max(0, Math.round(window.innerWidth / 2 - halfItemPx));
      container.style.paddingLeft = `${padPx}px`;
      container.style.paddingRight = `${padPx}px`;

      container.style.scrollPaddingInline = `calc(50vw - ${halfItemPx}px)`;

      item.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    } catch {
      const itemCenter = item.offsetLeft + item.clientWidth / 2;
      const targetScrollLeft = itemCenter - container.clientWidth / 2;
      container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const id = window.setTimeout(() => centerOnIndex(teamIndex), 50);
    const onResize = () => centerOnIndex(teamIndex);
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["team-wrapper"]}>
        <div className={styles["team-details"]}>
          {teamIndex !== null ? (
            <>
              <Image
                src={teamData[teamIndex].image}
                width={400}
                height={400}
                alt={`${teamData[teamIndex].name}'s photo`}
                className={styles["member-image"]}
              />
              <div className={styles["member-info"]}>
                <div
                  className={`${styles["member-position"]} ${sfuCentury.className}`}
                >
                  <p className={styles["position-text"]}>
                    {teamData[teamIndex].position}
                  </p>
                </div>
                <div className={styles["member-link"]}>
                  <Link href={`mailto:${teamData[teamIndex].email}`}>
                    <Image
                      src="/img/email-icon.webp"
                      width={24}
                      height={24}
                      alt="Email icon"
                      className={styles["icon"]}
                    />
                  </Link>
                  <Link href={teamData[teamIndex].instagram}>
                    <Image
                      src="/img/ins-icon.webp"
                      width={24}
                      height={24}
                      alt="Instagram icon"
                      className={styles["icon"]}
                    />
                  </Link>
                  <Link href={teamData[teamIndex].linkedin}>
                    <Image
                      src="/img/linkedin-icon.webp"
                      width={24}
                      height={24}
                      alt="LinkedIn icon"
                      className={styles["icon"]}
                    />
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className={styles["team-list-wrapper"]}>
          <div
            ref={containerRef}
            className={`${styles["team-list"]} ${swiss.className}`}
          >
            {teamData.map((member, index) => (
              <div
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className={`${styles["team-member"]} ${
                  index === teamIndex ? styles["active"] : ""
                } opacity-50 hover:opacity-100 transform transition duration-300 ease-in-out cursor-pointer`}
                onMouseEnter={() => handleTeamMemberHover(index)}
                onMouseLeave={handleTeamMemberOut}
                onClick={() => {
                  setTeamIndex(index);
                  centerOnIndex(index);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setTeamIndex(index);
                    centerOnIndex(index);
                  }
                }}
              >
                <p className={styles["member-name"]}>{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
