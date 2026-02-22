import type { Lang } from "./translations";

export interface EventData {
  id: string;
  category: Record<Lang, string>;
  date: string;
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
  coverImage: string;
}

export const sampleEvents: EventData[] = [
  // Upcoming
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
  },
  // Past
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
  },
];

/** IDs of events to show on the home page */
export const HOME_EVENT_IDS = ["1", "2", "4"];

export function formatEventDate(date: string, lang: string) {
  const locale =
    lang === "bg" ? "bg-BG" : lang === "tr" ? "tr-TR" : "en-GB";
  return new Date(date).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
