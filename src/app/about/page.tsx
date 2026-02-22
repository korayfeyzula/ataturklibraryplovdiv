import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Mustafa Kemal Ataturk Community Center in Plovdiv – our history, mission, and the cultural services we offer.",
};

export default function AboutPage() {
  return <AboutContent />;
}
