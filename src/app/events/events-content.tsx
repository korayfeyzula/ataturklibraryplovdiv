"use client";

/* eslint-disable @next/next/no-img-element */
import { useLanguage } from "@/lib/language-context";
import { sampleEvents } from "@/lib/events";
import { EventCard } from "@/components/event-card";

export function EventsContent() {
  const { lang, t } = useLanguage();

  const sorted = [...sampleEvents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      {/* Hero Banner */}
      <div className="bg-gray-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/hero.jpeg"
            alt="Library"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {t.events.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t.events.subtitle}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sorted.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              lang={lang}
              readMoreLabel={t.events.readMore}
            />
          ))}
        </div>
      </div>
    </>
  );
}
