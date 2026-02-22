/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { EventData } from "@/lib/events";
import { formatEventDate } from "@/lib/events";
import type { Lang } from "@/lib/translations";

export function EventCard({
  event,
  lang,
  readMoreLabel,
}: {
  event: EventData;
  lang: Lang;
  readMoreLabel: string;
}) {
  const isPast = new Date(event.date) < new Date();

  return (
    <Link
      href="/events"
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-full ${isPast ? "opacity-90 hover:opacity-100" : ""}`}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={event.coverImage}
          alt={event.title[lang]}
          className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${isPast ? "grayscale-[15%] group-hover:grayscale-0" : ""}`}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-xs font-bold text-primary uppercase tracking-wider">
            {event.category[lang]}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-primary text-white px-3 py-1 rounded-md text-xs font-bold shadow-md flex items-center gap-1.5">
            {!isPast && (
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            )}
            {formatEventDate(event.date, lang)}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-snug">
          {event.title[lang]}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6 flex-grow">
          {event.summary[lang]}
        </p>
        <div className="pt-4 border-t border-gray-50">
          <span className="text-primary font-medium text-sm flex items-center">
            {readMoreLabel}
            <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
