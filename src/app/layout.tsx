import type { Metadata } from "next";
import { Bebas_Neue, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

const display = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getsplifft.com"),
  title: {
    default: "Splifft — Stop Rolling. Start Smoking.",
    template: "%s | Splifft",
  },
  description:
    "Splifft makes your sesh easier — Roll Up and Fresh Hit done inside the Roll Wagon, curated packs, and events. Quick handoff, ready to smoke.",
  openGraph: {
    title: "Splifft",
    description:
      "Stop Rolling. Start Smoking. Roll Up, Fresh Hit, packs & events — hassle-free, built for an easier sesh.",
    url: "https://getsplifft.com",
    siteName: "Splifft",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          <SiteHeader />
          <main className="flex flex-1 flex-col">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
