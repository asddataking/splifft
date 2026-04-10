import { OG_IMAGE_PATH, SITE_URL } from "@/lib/site";

const logoUrl = `${SITE_URL}${OG_IMAGE_PATH}`;

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Splifft",
  url: SITE_URL,
  logo: logoUrl,
  description:
    "Mobile cannabis prep — Roll Up, Fresh Hit glass care, curated packs, and event prep. Michigan handoffs; quick handoff, ready to smoke.",
  slogan: "Stop Rolling. Start Smoking.",
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Splifft",
  url: SITE_URL,
  description:
    "Book Roll Up, shop packs, plan events. Splifft preps your sesh on a mobile handoff — no prep stress, ready to go.",
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
