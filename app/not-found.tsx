import { ButtonLink } from "@/components/shared/Buttons";
import { ContourLines } from "@/components/shared/ContourLines";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-forest-deep text-ivory">
      <ContourLines className="pointer-events-none absolute -right-32 top-1/2 h-[640px] w-[640px] -translate-y-1/2 text-gold/15" />
      <div className="container-page relative pt-28 pb-16">
        <p className="label-mono text-gold-light">Error 404 · Hiatus</p>
        <h1 className="mt-6 max-w-2xl text-5xl leading-tight sm:text-7xl">
          A gap in the <span className="text-gold-light italic">record</span>
        </h1>
        <p className="mt-6 max-w-lg text-ivory/70">
          Like an unconformity, this page marks missing time. The page you are looking for does not exist or has moved.
        </p>
        <div className="mt-10">
          <ButtonLink href="/" variant="ghost-light">
            Back to the homepage
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
