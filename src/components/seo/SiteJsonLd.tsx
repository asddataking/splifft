import { OG_IMAGE_PATH, SITE_URL } from "@/lib/site";

const logoUrl = `${SITE_URL}${OG_IMAGE_PATH}`;

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Splifft",
  url: SITE_URL,
  logo: logoUrl,
  description:
    "Splifft Subscription, Drop of the Month, Dank Drops — plus Roll Up, Fresh Hit, and event prep. Michigan; curated sessions, ready to smoke.",
  slogan: "Stop Rolling. Start Smoking.",
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Splifft",
  url: SITE_URL,
  description:
    "Shop subscriptions and Dank Drops, book Roll Up or Fresh Hit, plan Splifft Events. Splifft preps your sesh — we meet you when you need handoff.",
  publisher: {
    "@type": "Organization",
    name: "Splifft",
    logo: { "@type": "ImageObject", url: logoUrl },
  },
};

export function SiteJsonLd() {
  const json = JSON.stringify([organization, website]);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
