import { ClubJoinCard } from "@/components/club/ClubJoinCard";
import { membershipSection } from "@/lib/marketing";
import { membershipPerks } from "@/lib/data";
import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/club",
  title: "Splifft Club",
  description:
    "Splifft Club: member prices, priority booking, first-class meet-ups, early drops, and glass-tip upgrades.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default function ClubPage() {
  return (
    <div className="flex-1">
      <section className="border-b-2 border-black bg-[radial-gradient(circle_at_50%_-20%,rgba(255,45,146,0.3),transparent_50%),#0a0a0c] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-blue)]">
            Splifft Club
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)] sm:text-6xl">
            Members skip the rush
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--splifft-muted)]">
            Member prices on Roll Up, better times when it is busy, and a smooth
            meet-up every time — smart if you order often.
          </p>
        </div>
      </section>

      <section className="bg-[#101018] py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 sm:px-6">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
              Perks
            </h2>
            <p className="mt-3 text-sm text-[var(--splifft-muted)]">
              {membershipSection.intro}
            </p>
            <ul className="mt-6 space-y-4">
              {membershipPerks.map((perk) => (
                <li
                  key={perk}
                  className="flex gap-3 rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-[var(--splifft-cream)]"
                >
                  <span className="text-[var(--splifft-pink)]">★</span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
          <ClubJoinCard />
        </div>
      </section>
    </div>
  );
}
