import Image from "next/image";
import { Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { images } from "@/data/images";
import { isPending } from "@/data/types";
import { ButtonLink, ExternalButton } from "./Buttons";
import { LinkedInIcon, ResearchGateIcon } from "./BrandIcons";
import { Reveal } from "./Reveal";
import { IllustrativeBadge } from "./Figure";

export function CollaborationCTA() {
  const email = profile.email;
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-forest-deep text-ivory">
      <Image src={images.presaharanPlain.src} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-35" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep via-forest-deep/85 to-forest-deep/40" />
      <div className="container-page py-24 lg:py-32">
        <Reveal className="max-w-3xl">
          <p className="label-mono flex items-center gap-3 text-gold-light">
            <span aria-hidden="true" className="h-px w-8 bg-gold/60" /> Collaboration
          </p>
          <h2 id="cta-title" className="mt-6 text-[2.5rem] leading-[1.04] sm:text-6xl">
            Interested in scientific <span className="text-gold-light italic">collaboration?</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/75 sm:text-lg">
            Hasna welcomes exchanges with researchers, laboratories and institutions working on the geology of the Anti-Atlas, Precambrian
            magmatism and the evolution of the North Gondwana margin.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {!isPending(email) ? (
              <ExternalButton href={`mailto:${email}`} variant="ghost-light" icon={<Mail className="h-4 w-4" />}>
                {email}
              </ExternalButton>
            ) : (
              <ButtonLink href="/contact" variant="ghost-light" icon={<Mail className="h-4 w-4" />}>
                Get in touch
              </ButtonLink>
            )}
            <ExternalButton href={profile.links.researchgate} variant="outline-light" icon={<ResearchGateIcon className="h-4 w-4" />}>
              ResearchGate
            </ExternalButton>
            <ExternalButton href={profile.links.linkedin} variant="outline-light" icon={<LinkedInIcon className="h-4 w-4" />}>
              LinkedIn
            </ExternalButton>
          </div>
        </Reveal>
      </div>
      <IllustrativeBadge className="absolute right-4 bottom-4 sm:right-6" />
    </section>
  );
}
