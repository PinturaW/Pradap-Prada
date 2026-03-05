import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat, Sarabun } from "next/font/google";

import "./globals.css";
import { ChatWidget } from "@/components/chat-widget";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const sarabun = Sarabun({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PRADAP PRADA | Authentic Thai Gemstone Jewelry",
  description:
    "Bespoke gemstone jewelry, traceable gems, and fair-wage artisans from Trat, Thailand. Every piece designed just for you.",
};

export const viewport: Viewport = {
  themeColor: "#C4956A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} ${sarabun.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
