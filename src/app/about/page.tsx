import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Mustafa Kemal Ataturk Community Center in Plovdiv – our history, mission, and the cultural services we offer.",
  openGraph: {
    title: "About | Atatürk Community Center",
    description:
      "A cultural and educational institution in Plovdiv with over 23 years of history. Discover our mission, vision, and services.",
    images: [{ url: "/hero.jpeg", width: 1200, height: 630, alt: "Atatürk Community Center" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Atatürk Community Center",
    description:
      "A cultural and educational institution in Plovdiv with over 23 years of history.",
    images: ["/hero.jpeg"],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
