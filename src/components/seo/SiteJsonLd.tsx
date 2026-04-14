import { OG_IMAGE_PATH, SITE_URL } from "@/lib/site";

const logoUrl = `${SITE_URL}${OG_IMAGE_PATH}`;

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Splifft",
  url: SITE_URL,
  logo: logoUrl,
  description:
    "Splifft Club, 5-pack pre-rolls, and The Vault themed boxes. Splifft Events available by custom quote.",
  slogan: "Stop Rolling. Start Smoking.",
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Splifft",
  url: SITE_URL,
  description:
    "Join the Club, shop 5-packs, unlock The Vault, and request Splifft Events for parties.",
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
