import type { Metadata } from "next";
import { EventsContent } from "./events-content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Explore the latest news, upcoming events, and cultural stories from Mustafa Kemal Atatürk Community Center in Plovdiv.",
};

export default function EventsPage() {
  return <EventsContent />;
}
