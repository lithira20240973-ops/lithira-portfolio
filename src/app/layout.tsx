import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans, Space_Grotesk, Dancing_Script } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    template: "%s — Lithira Kalubowila",
    default: "Lithira Kalubowila — Web Developer & Creative Media",
  },
  description: "Portfolio of Lithira Kalubowila, a Web Developer & Creative Media specialist. Crafting premium digital experiences, seamless UI, and robust systems.",
  openGraph: {
    title: "Lithira Kalubowila — Web Developer & Creative Media",
    description: "Portfolio of Lithira Kalubowila, a Web Developer & Creative Media specialist based in Sri Lanka.",
    url: "/",
    siteName: "Lithira Kalubowila Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lithira Kalubowila — Web Developer & Creative Media",
    description: "Portfolio of Lithira Kalubowila, a Web Developer & Creative Media specialist.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexSans.variable} ${spaceGrotesk.variable} ${dancingScript.variable} font-sans antialiased bg-[#e2e2e2] text-black`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
