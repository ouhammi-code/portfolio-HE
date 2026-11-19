import { ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import { images } from "@/data/images";
import { ButtonLink, ExternalButton } from "@/components/shared/Buttons";
import { LinkedInIcon, ResearchGateIcon } from "@/components/shared/BrandIcons";
import { IllustrativeBadge } from "@/components/shared/Figure";
import { HeroParallax, HeroText } from "./HeroMotion";

export function HomeHero() {
  const facts = [
    { label: "Researcher", value: profile.name },
    { label: "Position", value: `${profile.role} · ${profile.institution.shortName} Meknès` },
    { label: "Specialization", value: profile.specialization },
    { label: "Location", value: profile.location },
  ];

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-forest-deep text-ivory">
      <HeroParallax image={images.atlasRanges} />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep/90 via-forest-deep/55 to-forest-deep/10" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep via-transparent to-forest-deep/40" />

      <div className="container-page flex flex-1 flex-col justify-end pt-36 pb-10 lg:pb-14">
        <HeroText>
          <p className="label-mono flex items-center gap-3 text-gold-light">
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            Academic portfolio · Geosciences
          </p>
          <h1 id="hero-title" className="mt-6 max-w-5xl text-display font-normal">
            Exploring Earth&rsquo;s History <span className="text-gold-light italic">Through Geoscience</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-ivory/80 sm:text-lg">{profile.intro}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/research" variant="ghost-light">
              Explore My Research
            </ButtonLink>
            <ExternalButton href={profile.links.researchgate} variant="outline-light" icon={<ResearchGateIcon className="h-4 w-4" />}>
              ResearchGate
            </ExternalButton>
            <ExternalButton href={profile.links.linkedin} variant="outline-light" icon={<LinkedInIcon className="h-4 w-4" />}>
              LinkedIn
            </ExternalButton>
          </div>
        </HeroText>

        <dl className="mt-14 grid grid-cols-1 border-t border-ivory/15 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={`border-b border-ivory/15 py-4 sm:pr-6 lg:border-b-0 lg:py-5 ${i > 0 ? "lg:border-l lg:pl-6" : ""} ${
                i % 2 === 1 ? "sm:border-l sm:pl-6 lg:border-l" : ""
              }`}
            >
              <dt className="label-mono !text-[0.62rem] text-gold-light/90">{f.label}</dt>
              <dd className="mt-1.5 text-sm leading-snug text-ivory/90">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/60 transition-colors hover:text-gold-light xl:flex"
        aria-label="Scroll to introduction"
      >
        <ArrowDown className="h-4 w-4 animate-bounce" strokeWidth={1.5} />
      </a>
      <IllustrativeBadge className="absolute right-4 bottom-3 sm:right-6 lg:bottom-4" />
    </section>
  );
}
