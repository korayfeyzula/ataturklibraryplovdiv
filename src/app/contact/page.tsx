import type { Metadata } from "next";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mustafa Kemal Atatürk Community Center in Plovdiv. Find our address, phone number, email, and opening hours.",
};

export default function ContactPage() {
  return <ContactContent />;
}
