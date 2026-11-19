import type { Metadata } from "next";
import { ArrowUpRight, Building2, Mail } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { PendingNote } from "@/components/shared/Pending";
import { ContactForm } from "@/components/shared/ContactForm";
import { LinkedInIcon, OrcidIcon, ResearchGateIcon } from "@/components/shared/BrandIcons";
import { profile } from "@/data/profile";
import { images } from "@/data/images";
import { isPending } from "@/data/types";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${profile.name} for scientific collaboration, research exchange or academic enquiries.`,
  alternates: { canonical: "/contact" },
  openGraph: { title: `Contact · ${profile.name}`, url: "/contact" },
};

export default function ContactPage() {
  const email = isPending(profile.email) ? null : profile.email;
  const channels = [
    { icon: ResearchGateIcon, label: "ResearchGate", value: "Hasna-Er-Raqqady", href: profile.links.researchgate },
    { icon: LinkedInIcon, label: "LinkedIn", value: "hasna-er-raqqady", href: profile.links.linkedin },
    ...(!isPending(profile.links.orcid) ? [{ icon: OrcidIcon, label: "ORCID", value: profile.links.orcid.replace("https://orcid.org/", ""), href: profile.links.orcid }] : []),
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&rsquo;s talk <span className="text-gold-light italic">geology</span>
          </>
        }
        intro="For scientific collaboration, research exchange, data requests or academic enquiries, please get in touch."
        image={images.presaharanPlain}
      />

      <section className="py-16 lg:py-24">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <p className="font-serif text-[1.6rem] leading-snug text-forest">
              Hasna is open to exchanges with researchers and institutions working on the Anti-Atlas, Precambrian volcano-sedimentary systems
              and the geodynamics of the North Gondwana margin.
            </p>

            <div className="mt-10 space-y-px bg-forest/12">
              {email ? (
                <a href={`mailto:${email}`} className="group flex items-center gap-4 bg-ivory py-5 hover:bg-paper">
                  <Mail className="h-5 w-5 text-earth" strokeWidth={1.5} aria-hidden="true" />
                  <span>
                    <span className="label-mono block !text-[0.6rem] text-earth">E-mail</span>
                    <span className="text-charcoal group-hover:text-forest">{email}</span>
                  </span>
                </a>
              ) : (
                <div className="bg-ivory py-5">
                  <PendingNote note="Professional e-mail address (edit `email` in data/profile.ts)." />
                </div>
              )}
              {channels.map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 bg-ivory py-5 transition-colors hover:bg-paper">
                  <Icon className="h-5 w-5 text-earth" />
                  <span className="min-w-0 flex-1">
                    <span className="label-mono block !text-[0.6rem] text-earth">{label}</span>
                    <span className="block truncate text-charcoal group-hover:text-forest">{value}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-earth transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
              <div className="flex items-start gap-4 bg-ivory py-5">
                <Building2 className="mt-0.5 h-5 w-5 text-earth" strokeWidth={1.5} aria-hidden="true" />
                <span>
                  <span className="label-mono block !text-[0.6rem] text-earth">Institutional affiliation</span>
                  <span className="text-charcoal">
                    {profile.institution.department}
                    <br />
                    {profile.institution.name}, {profile.institution.city}, {profile.institution.country}
                  </span>
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-7">
            <h2 className="text-3xl text-forest sm:text-4xl">Send a message</h2>
            <p className="mt-2 mb-8 text-sm text-ink-muted">
              {email ? "Submitting opens your e-mail client with the message pre-filled." : "This form validates your message locally; no data is sent by this website."}
            </p>
            <ContactForm recipient={email} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
