import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat, Pinyon_Script } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const script = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "BL Jewels — Maison de Joaillerie",
    template: "%s | BL Jewels",
  },
  description:
    "BL Jewels, Maison de Joaillerie à Casablanca : bijoux en or 18 carats, colliers, gourmettes et bagues. Livraison offerte et écrin signature.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "BL Jewels",
  },
};

export const viewport: Viewport = {
  themeColor: "#2C0001",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
