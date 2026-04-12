import { OG_IMAGE_PATH, SITE_URL } from "@/lib/site";

const logoUrl = `${SITE_URL}${OG_IMAGE_PATH}`;

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Splifft",
  url: SITE_URL,
  logo: logoUrl,
  description:
    "Mobile cannabis prep — Roll Up, Fresh Hit, packs, and event prep. Michigan meet-ups; prep done for you, ready to smoke.",
  slogan: "Stop Rolling. Start Smoking.",
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Splifft",
  url: SITE_URL,
  description:
    "Book Roll Up, shop packs, plan Splifft Events. Splifft preps your order — we meet you, no prep stress, ready to go.",
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
