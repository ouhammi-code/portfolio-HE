# Hasna Er-Raqqady — Academic Portfolio

Static academic portfolio for a geoscience researcher. Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS v4, Framer Motion and Lucide. It has no backend, database, API or authentication. Every page is prerendered as static HTML.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Editing content

All personal information lives in `/data`. The pages never hard-code facts.

| File | Contents |
| --- | --- |
| `data/profile.ts` | Name, title, institution, e-mail, profile links, biography |
| `data/education.ts` | Degrees and internships (they also feed the stratigraphic timeline) |
| `data/research.ts` | Research interests, the doctoral research sections, figure plates |
| `data/publications.ts` | Publications (the library, filters and JSON-LD update automatically) |
| `data/projects.ts` | Fieldwork and projects, with their galleries |
| `data/conferences.ts` | Conferences, collaborators, other activities |
| `data/skills.ts` | Expertise groups |
| `data/images.ts` | Image registry (paths, alt text, credits) |

### Placeholders

Information that could not be verified is written as `pending("what to add")`. The site shows these values as dashed **"To be added"** notes. To fill one in, replace the `pending(...)` call with the real value.

To hide every remaining placeholder before sharing the site publicly, set:

```
NEXT_PUBLIC_SHOW_PLACEHOLDERS=false
```

### Images

The researcher's portrait (`public/images/profile/hasna-laboratory.jpg`) is original material. Every landscape and mineral photo in `public/images/geology` is a stock photograph (Unsplash Licence) marked `illustrative: true`, and the site labels each one **Illustrative**. To swap in real field photos:

1. Add the files under `public/images/fieldwork` or `public/images/research`.
2. Register them in `data/images.ts` without the `illustrative` flag.
3. Reference them from `data/projects.ts` or `data/research.ts` (`researchPlates`).

## Sources (verified 19 Nov 2026)

- **ResearchGate**: PhD Student, Université Moulay Ismail de Meknès, Department of Applied Geosciences. Skills and expertise. Two publications.
- **LinkedIn**: PhD student, Drâa-Tafilalet. Licence ST from FST Errachidia (2017–2020). Master ST from FST Settat (started 2020). Internships at SMI/Managem (2019), ABH Guir-Ziz-Rhéris (2020) and CMT Tighza (2022). Skills.
- **Crossref**: full author list, volume and article number for DOI `10.1016/j.jafrearsci.2025.105937`.
- **Doctoral thesis title**: taken from the project brief.

Citation counts and read statistics are left out on purpose, because they change over time.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` (for example `https://hasna-er-raqqady.vercel.app`) so canonical URLs, Open Graph tags, `sitemap.xml` and `robots.txt` use the real domain. The site deploys to Vercel with no other configuration.

## Structure

```
app/            pages: /, about, research, publications, fieldwork, conferences, contact
                plus sitemap.ts, robots.ts, not-found.tsx
components/
  layout/       SiteHeader, SiteFooter, BackToTop
  hero/         HomeHero (+ parallax)
  research/     InterestCards, CrossSection (conceptual SVG)
  publications/ PublicationCard, PublicationLibrary (search + filters)
  gallery/      FieldMosaic, ProjectGallery (lightbox)
  timeline/     StratColumn (journey drawn as a stratigraphic log)
  shared/       PageHero, SectionHeading, Reveal, Figure, Pending, Buttons, ContactForm, JsonLd …
data/           all content
lib/            site config, timeline builder
```
