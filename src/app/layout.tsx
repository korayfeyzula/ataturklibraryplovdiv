import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { LanguageProvider } from "@/lib/language-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  SITE_URL,
  SITE_NAME,
  SITE_NAME_ALT,
  CONTACT,
  FOUNDING_YEAR,
  OPENING_HOURS,
} from "@/lib/config";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const openSans = Open_Sans({
  variable: "--font-opensans",
  subsets: ["latin", "cyrillic", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – Plovdiv`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `The ${SITE_NAME} in Plovdiv, Bulgaria – a cultural and educational institution dedicated to preserving and promoting Bulgarian and Turkish culture.`,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: `${SITE_NAME} – Plovdiv`,
    description: `A cultural and educational institution in Plovdiv with over 23 years of history, dedicated to Bulgarian and Turkish culture.`,
    images: [{ url: "/hero.jpeg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} – Plovdiv`,
    description: `A cultural and educational institution in Plovdiv with over 23 years of history.`,
    images: ["/hero.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Library",
  name: SITE_NAME,
  alternateName: SITE_NAME_ALT,
  url: SITE_URL,
  description:
    "Cultural and educational institution in Plovdiv, Bulgaria, dedicated to preserving and promoting Bulgarian and Turkish culture.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Plovdiv",
    addressCountry: "BG",
  },
  telephone: CONTACT.phoneRaw,
  email: CONTACT.email,
  foundingDate: FOUNDING_YEAR,
  openingHoursSpecification: OPENING_HOURS.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased min-h-screen flex flex-col`}
      >
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
