import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Bebas_Neue, Geist_Mono, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import {
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  META_PIXEL_ID,
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
    "Splifft makes sessions simpler — Splifft Subscription, Drop of the Month, Dank Drops, Roll Up, Fresh Hit, Splifft Events, and Splifft Club. Michigan.",
  applicationName: "Splifft",
  authors: [{ name: "Splifft", url: SITE_URL }],
  creator: "Splifft",
  publisher: "Splifft",
  category: "business",
  keywords: [
    "Splifft",
    "Roll Up",
    "mobile cannabis prep",
    "cannabis prep",
    "Michigan",
    "pre-rolls",
    "Dank Drops",
    "Splifft Subscription",
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
        <Analytics />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_MEASUREMENT_ID}');
          `}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
