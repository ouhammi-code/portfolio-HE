import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Manrope } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BackToTop } from "@/components/layout/BackToTop";
import { MotionProvider } from "@/components/shared/MotionProvider";
import { profile } from "@/data/profile";
import { images } from "@/data/images";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${profile.name}`,
  },
  description: siteConfig.description,
  applicationName: `${profile.name} — Academic Portfolio`,
  authors: [{ name: profile.name, url: profile.links.researchgate }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Hasna Er-raqqady",
    "Er-Raqqady",
    "geoscience",
    "geology",
    "petrology",
    "Ediacaran",
    "Saghro",
    "Anti-Atlas",
    "Morocco",
    "North Gondwana",
    "Université Moulay Ismaïl",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: `${profile.name} — Academic Portfolio`,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: images.saghroPanorama.src, width: 1600, height: 1198, alt: images.saghroPanorama.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [images.saghroPanorama.src],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#243B35",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} ${plexMono.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[100] rounded bg-forest px-4 py-2 text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <BackToTop />
        </MotionProvider>
      </body>
    </html>
  );
}
