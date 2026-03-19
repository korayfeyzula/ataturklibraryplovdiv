import { useEffect, useState, useCallback } from "react";
import { supabase } from "./supabase";
import type { Lang } from "./translations";

// ---------- Types ----------

export interface ContentBlock {
  type: "text" | "image" | "carousel";
  value: string;
  text: Record<Lang, string>;
  caption: Record<Lang, string>;
  images?: string[];
}

export interface EventData {
  id: string;
  category: Record<Lang, string>;
  date: string;
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
  coverImage: string;
  contentBlocks: ContentBlock[];
  isHighlighted: boolean;
}

// ---------- DB row → app type ----------

interface EventRow {
  id: string;
  title: Record<Lang, string>;
  category: Record<Lang, string>;
  date: string;
  summary: Record<Lang, string>;
  cover_image: string;
  content_blocks: ContentBlock[];
  is_highlighted: boolean;
}

function rowToEvent(row: EventRow): EventData {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    date: row.date,
    summary: row.summary,
    coverImage: row.cover_image,
    contentBlocks: row.content_blocks ?? [],
    isHighlighted: row.is_highlighted ?? false,
  };
}

// ---------- Sample / fallback data ----------

export const sampleEvents: EventData[] = [
  {
    id: "1",
    category: { en: "Cultural", bg: "Културно", tr: "Kültürel" },
    date: "2026-03-15",
    title: {
      en: "Spring Cultural Festival 2026",
      bg: "Пролетен Културен Фестивал 2026",
      tr: "2026 Bahar Kültür Festivali",
    },
    summary: {
      en: "Join us for our annual Spring Cultural Festival featuring music, dance, and art from Bulgarian and Turkish traditions.",
      bg: "Присъединете се към нашия ежегоден Пролетен културен фестивал с музика, танци и изкуство от българските и турските традиции.",
      tr: "Bulgar ve Türk geleneklerinden müzik, dans ve sanat içeren yıllık Bahar Kültür Festivalimize katılın.",
    },
    coverImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    contentBlocks: [],
    isHighlighted: true,
  },
  {
    id: "2",
    category: { en: "Theater", bg: "Театър", tr: "Tiyatro" },
    date: "2026-04-02",
    title: {
      en: "Youth Theater Workshop",
      bg: "Младежка Театрална Работилница",
      tr: "Gençlik Tiyatro Atölyesi",
    },
    summary: {
      en: "A week-long theater workshop for young people aged 12-18. Learn acting, stage presence, and creative expression.",
      bg: "Едноседмична театрална работилница за младежи на възраст 12-18 години. Научете актьорско майсторство и сценично присъствие.",
      tr: "12-18 yaş arası gençler için bir haftalık tiyatro atölyesi. Oyunculuk, sahne varlığı ve yaratıcı ifade öğrenin.",
    },
    coverImage:
      "https://images.unsplash.com/photo-1460518451285-97b6aa326961?q=80&w=800&auto=format&fit=crop",
    contentBlocks: [],
    isHighlighted: true,
  },
  {
    id: "3",
    category: { en: "Education", bg: "Образование", tr: "Eğitim" },
    date: "2026-05-10",
    title: {
      en: "Erasmus+ Info Session",
      bg: "Информационна Среща за Erasmus+",
      tr: "Erasmus+ Bilgi Oturumu",
    },
    summary: {
      en: "Learn about upcoming Erasmus+ youth exchange opportunities and how to participate in international programs.",
      bg: "Научете за предстоящите възможности за младежки обмен по Erasmus+ и как да участвате в международни програми.",
      tr: "Yaklaşan Erasmus+ gençlik değişim fırsatları ve uluslararası programlara nasıl katılacağınız hakkında bilgi edinin.",
    },
    coverImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
    contentBlocks: [],
    isHighlighted: false,
  },
  {
    id: "4",
    category: { en: "Cultural", bg: "Културно", tr: "Kültürel" },
    date: "2025-12-20",
    title: {
      en: "New Year's Charity Concert",
      bg: "Новогодишен Благотворителен Концерт",
      tr: "Yılbaşı Hayır Konseri",
    },
    summary: {
      en: "A festive evening of music and performances raising funds for local children's education programs.",
      bg: "Празничен вечер с музика и представления, събиращи средства за местни образователни програми за деца.",
      tr: "Yerel çocuk eğitim programları için fon toplayan müzik ve performanslarla dolu şenlikli bir akşam.",
    },
    coverImage:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800&auto=format&fit=crop",
    contentBlocks: [],
    isHighlighted: true,
  },
  {
    id: "5",
    category: { en: "Youth", bg: "Младежки", tr: "Gençlik" },
    date: "2026-01-18",
    title: {
      en: "Children's Lego Workshop",
      bg: "Детска Лего Работилница",
      tr: "Çocuk Lego Atölyesi",
    },
    summary: {
      en: "Creative building workshop for children aged 6-12. Over 30 kids participated in a day of imagination and fun.",
      bg: "Творческа строителна работилница за деца на възраст 6-12 години. Над 30 деца участваха в ден на въображение и забавление.",
      tr: "6-12 yaş arası çocuklar için yaratıcı yapım atölyesi. 30'dan fazla çocuk hayal gücü ve eğlence dolu bir güne katıldı.",
    },
    coverImage:
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800&auto=format&fit=crop",
    contentBlocks: [],
    isHighlighted: false,
  },
  {
    id: "6",
    category: { en: "Library", bg: "Библиотека", tr: "Kütüphane" },
    date: "2026-02-01",
    title: {
      en: "Multilingual Book Club Meeting",
      bg: "Среща на Многоезичния Книжен Клуб",
      tr: "Çok Dilli Kitap Kulübü Toplantısı",
    },
    summary: {
      en: "Our monthly book club gathered to discuss contemporary Bulgarian literature. A lively discussion with over 20 attendees.",
      bg: "Месечният ни книжен клуб се събра, за да обсъди съвременната българска литература. Оживена дискусия с над 20 участници.",
      tr: "Aylık kitap kulübümüz çağdaş Bulgar edebiyatını tartışmak için toplandı. 20'den fazla katılımcıyla canlı bir tartışma.",
    },
    coverImage:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop",
    contentBlocks: [],
    isHighlighted: false,
  },
];

// ---------- Supabase CRUD ----------

export async function fetchEvents(): Promise<EventData[]> {
  if (!supabase) return sampleEvents;

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });

  if (error || !data) return sampleEvents;
  return data.map(rowToEvent);
}

export async function fetchHighlightedEvents(): Promise<EventData[]> {
  if (!supabase) {
    // Fallback: 2 upcoming + 1 past
    const now = new Date();
    const upcoming = sampleEvents
      .filter((e) => new Date(e.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 2);
    const past = sampleEvents
      .filter((e) => new Date(e.date) < now)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 1);
    return [...upcoming, ...past];
  }

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_highlighted", true)
    .order("date", { ascending: false })
    .limit(3);

  if (error || !data) return sampleEvents.slice(0, 3);
  return data.map(rowToEvent);
}

export async function createEvent(
  event: Omit<EventData, "id">
): Promise<EventData | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("events")
    .insert({
      title: event.title,
      category: event.category,
      date: event.date,
      summary: event.summary,
      cover_image: event.coverImage,
      content_blocks: event.contentBlocks,
      is_highlighted: event.isHighlighted,
    })
    .select()
    .single();

  if (error || !data) return null;
  return rowToEvent(data);
}

export async function updateEvent(
  id: string,
  event: Omit<EventData, "id">
): Promise<EventData | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("events")
    .update({
      title: event.title,
      category: event.category,
      date: event.date,
      summary: event.summary,
      cover_image: event.coverImage,
      content_blocks: event.contentBlocks,
      is_highlighted: event.isHighlighted,
    })
    .eq("id", id)
    .select()
    .single();

  if (error || !data) return null;
  return rowToEvent(data);
}

export async function deleteEvent(id: string): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase.from("events").delete().eq("id", id);
  return !error;
}

// ---------- React hook ----------

export function useEvents() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchEvents();
    setEvents(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { events, loading, reload: load, setEvents };
}

export function useHighlightedEvents() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHighlightedEvents().then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  return { events, loading };
}

// ---------- Helpers ----------

export function formatEventDate(date: string, lang: string) {
  const locale =
    lang === "bg" ? "bg-BG" : lang === "tr" ? "tr-TR" : "en-GB";
  return new Date(date).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
