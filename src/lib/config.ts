import type { Lang } from "./translations";

// Site
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export const SITE_NAME = "Mustafa Kemal Atatürk Community Center";
export const SITE_NAME_ALT =
  'Народно читалище „Мустафа Кемал Ататюрк – 2003"';
export const FOUNDING_YEAR = "2003";
export const FOUNDING_DATE = "2003-01-01";

// Contact
export const CONTACT = {
  phone: "+359 88 123 4567",
  phoneRaw: "+359881234567",
  email: "info@ataturk-library.bg",
} as const;

// Social
export const SOCIAL = {
  facebook: "#",
  instagram: "#",
} as const;

// Opening hours (structured data format)
export const OPENING_HOURS = [
  {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  {
    days: ["Saturday"],
    opens: "10:00",
    closes: "14:00",
  },
] as const;

// Languages
export const SUPPORTED_LANGS: Lang[] = ["en", "bg", "tr"];

export const LANG_LABELS: Record<Lang, string> = {
  en: "English",
  bg: "Български",
  tr: "Türkçe",
};

export const LANG_FLAGS: Record<Lang, string> = {
  en: "🇬🇧",
  bg: "🇧🇬",
  tr: "🇹🇷",
};

// Admin
export const ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "EnesBaturVeSerdar123";
export const AUTH_STORAGE_KEY = "admin_auth";
export const AUTH_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
