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
        {/* Performance hints: preconnect only for external origins. Avoid manual preloading of images that are handled by next/image (use priority prop on NextImage for LCP images). */}
        <Script id="preconnect-hints" strategy="beforeInteractive">
          {`try{const head=document.getElementsByTagName('head')[0];
            // Only add preconnect for external domains (no-op for local '/').
            // If you rely on next/image for LCP images, prefer next/image's priority prop
            // or use <link rel="preload" as="image"> only for true LCP assets that are not managed by Next.
            // Example (external): const pc=document.createElement('link'); pc.rel='preconnect'; pc.href='https://example-cdn.com'; head.appendChild(pc);
          }catch(e){};`}
        </Script>
        {children}
      </body>
    </html>
  );
}
