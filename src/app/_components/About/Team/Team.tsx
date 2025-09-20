"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Team.module.scss";
import Link from "next/link";
import { Oswald, Judson } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
});

const judson = Judson({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const teamData = [
  {
    name: "Cong Q La",
    position: "Founder",
    image: "/img/teams/cong_la.png",
    email: "",
    instagram: "",
    linkedin: "",
  },
  {
    name: "Son C Nguyen",
    position: "Developer",
    image: "/img/teams/son_nguyen.png",
    email: "",
    instagram: "",
    linkedin: "",
  },
  {
    name: "Huong T Tran",
    position: "Founder",
    image: "/img/teams/huong_tran.png",
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
  const [teamIndex, setTeamIndex] = useState<number | null>(null);
  const handleTeamMemberHover = (index: number) => {
    setTeamIndex(index);
  };
  const handleTeamMemberOut = () => {
    // setTeamIndex(0);
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["team-wrapper"]}>
        <div className={`${styles["team-list"]} ${oswald.className}`}>
          {teamData.map((member, index) => (
            <div
              key={index}
              className={`${styles["team-member"]} opacity-50 hover:opacity-100 transform transition duration-300 ease-in-out hover:translate-x-10 cursor-pointer`}
              onMouseEnter={() => handleTeamMemberHover(index)}
              onMouseLeave={handleTeamMemberOut}
            >
              <p className={styles["member-name"]}>{member.name}</p>
            </div>
          ))}
        </div>
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
                  className={`${styles["member-position"]} ${judson.className}`}
                >
                  <p className={styles["position-text"]}>
                    {teamData[teamIndex].position}
                  </p>
                </div>
                <div className={styles["member-link"]}>
                  <Link href={`mailto:${teamData[teamIndex].email}`}>
                    <Image
                      src="/img/email-icon.png"
                      width={24}
                      height={24}
                      alt="Email icon"
                      className={styles["icon"]}
                    />
                  </Link>
                  <Link href={teamData[teamIndex].instagram}>
                    <Image
                      src="/img/ins-icon.png"
                      width={24}
                      height={24}
                      alt="Instagram icon"
                      className={styles["icon"]}
                    />
                  </Link>
                  <Link href={teamData[teamIndex].linkedin}>
                    <Image
                      src="/img/linkedin-icon.png"
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
      </div>
    </div>
  );
};

export default Team;
