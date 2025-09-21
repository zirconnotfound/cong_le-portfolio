import localFont from "next/font/local";

export const sfuCentury = localFont({
  src: [
    {
      path: "./fonts/sfucentury_boldcondensed.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/sfucentury_bold.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/sfucentury_italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-sfu-century",
});

export const swiss = localFont({
  src: [
    {
      path: "./fonts/swiss_condensed.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/swiss_condensed_bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-swiss",
});
