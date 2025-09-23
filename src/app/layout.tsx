import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Webver",
  description: "",
  openGraph: {
    title: "",
    description: "",
    url: "",
    type: "website",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "",
        type: "image/jpeg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
