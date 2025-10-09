import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`no-scroll-before-hydration antialiased`}>
      <body>
        {/* Prevent browser restoring scroll and lock scroll before hydration */}
        <Script id="scroll-restoration" strategy="beforeInteractive">
          {`try{ if('scrollRestoration' in history) history.scrollRestoration='manual'; document.documentElement.classList.add('no-scroll-before-hydration') }catch(e){} `}
        </Script>
        {children}
      </body>
    </html>
  );
}
