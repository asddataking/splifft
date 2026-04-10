import { OG_IMAGE_PATH, SITE_URL } from "@/lib/site";

const logoUrl = `${SITE_URL}${OG_IMAGE_PATH}`;

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Splifft",
  url: SITE_URL,
  logo: logoUrl,
  description:
    "Mobile Roll Wagon service — Roll Up (prep inside the van), Fresh Hit glass cleaning, curated packs, and event prep. Michigan pull-ups with a quick handoff, ready to smoke.",
  slogan: "Stop Rolling. Start Smoking.",
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Splifft",
  url: SITE_URL,
  description:
    "Book Roll Up, shop packs, and plan events. Splifft preps your sesh inside the Roll Wagon — no rolling, no mess, no hassle.",
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
