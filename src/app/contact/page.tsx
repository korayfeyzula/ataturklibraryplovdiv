import type { Metadata } from "next";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mustafa Kemal Atatürk Community Center in Plovdiv. Find our address, phone number, email, and opening hours.",
  openGraph: {
    title: "Contact | Atatürk Community Center",
    description:
      "Visit us in Plovdiv, Bulgaria. Find our address, phone, email, and opening hours.",
    images: [{ url: "/hero.jpeg", width: 1200, height: 630, alt: "Atatürk Community Center Contact" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Atatürk Community Center",
    description:
      "Visit us in Plovdiv, Bulgaria. Find our address, phone, email, and opening hours.",
    images: ["/hero.jpeg"],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
