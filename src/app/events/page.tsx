import type { Metadata } from "next";
import { EventsContent } from "./events-content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Explore the latest news, upcoming events, and cultural stories from Mustafa Kemal Atatürk Community Center in Plovdiv.",
  openGraph: {
    title: "Events | Atatürk Community Center",
    description:
      "Discover upcoming cultural events, theater workshops, Erasmus+ programs, and more at our community center in Plovdiv.",
    images: [{ url: "/hero.jpeg", width: 1200, height: 630, alt: "Atatürk Community Center Events" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events | Atatürk Community Center",
    description:
      "Discover upcoming cultural events, theater workshops, and Erasmus+ programs in Plovdiv.",
    images: ["/hero.jpeg"],
  },
};

export default function EventsPage() {
  return <EventsContent />;
}
