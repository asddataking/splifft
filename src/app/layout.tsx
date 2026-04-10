import type { Metadata } from "next";
import { Bebas_Neue, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import {
  OG_IMAGE_PATH,
  SITE_URL,
  SOCIAL_SHARE_DESCRIPTION,
  defaultOpenGraphImage,
} from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Splifft — Stop Rolling. Start Smoking.",
    template: "%s | Splifft",
  },
  description:
    "Splifft makes your sesh easier — Roll Up, Fresh Hit, packs, events, and Club. Mobile handoff: we prep it and hand it back ready. Michigan.",
  applicationName: "Splifft",
  authors: [{ name: "Splifft", url: SITE_URL }],
  creator: "Splifft",
  publisher: "Splifft",
  category: "business",
  keywords: [
    "Splifft",
    "Roll Up",
    "mobile handoff",
    "cannabis prep",
    "Michigan",
    "pre-rolls",
    "cannabis packs",
    "event cannabis prep",
    "Fresh Hit",
    "getsplifft",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Splifft",
    title: "Splifft — Stop Rolling. Start Smoking.",
    description: SOCIAL_SHARE_DESCRIPTION,
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Splifft — Stop Rolling. Start Smoking.",
    description: SOCIAL_SHARE_DESCRIPTION,
    images: [`${SITE_URL}${OG_IMAGE_PATH}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: OG_IMAGE_PATH, type: "image/png" }],
    apple: [{ url: OG_IMAGE_PATH, type: "image/png" }],
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
        <SiteJsonLd />
        <Providers>
          <SiteHeader />
          <main className="flex flex-1 flex-col">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
