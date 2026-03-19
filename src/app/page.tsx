"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  ChevronRight,
  Theater,
  BookOpen,
  Users,
  Sparkles,
  HeartHandshake,
  Globe,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useHighlightedEvents } from "@/lib/events";
import { EventCard } from "@/components/event-card";

function FeatureCard({
  icon: Icon,
  title,
  description,
  colorClass,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  colorClass: string;
}) {
  return (
    <div className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-start">
      <div
        className={`w-12 h-12 rounded-xl ${colorClass} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-snug">
        {title}
      </h3>
      <p className="text-gray-500 leading-relaxed text-sm sm:text-base flex-grow">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  const { lang, t } = useLanguage();
  const { events: highlightEvents, loading: eventsLoading } = useHighlightedEvents();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gray-900 h-[80vh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero.jpeg"
            alt="Library Background"
            className="absolute inset-0 w-full h-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl pt-20 text-left">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none tracking-tight mb-8 drop-shadow-lg">
              {t.hero.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-2xl drop-shadow-md">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/events"
                className="inline-flex items-center justify-center w-fit bg-primary text-white hover:bg-primary-hover rounded-full px-6 py-3 text-sm sm:text-base font-semibold tracking-wide shadow-lg hover:shadow-red-900/50 transition-all transform hover:-translate-y-0.5"
              >
                {t.hero.cta}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch gap-16">
            {/* Left Content */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <span className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm mb-4">
                {t.about.subtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
                {t.about.title}
              </h2>
              <div className="text-gray-600 mb-8">
                <p className="text-base sm:text-lg leading-relaxed">{t.about.content}</p>
              </div>
              <div className="mt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center text-primary font-semibold hover:text-primary-hover transition-colors border-2 border-primary px-6 py-2 rounded-full hover:bg-red-50 text-sm sm:text-base tracking-wide"
                >
                  {t.about.learnMore}
                </Link>
              </div>
            </div>

            {/* Right Images Collage */}
            <div className="lg:w-1/2 relative min-h-[500px]">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="space-y-4 pt-12 flex flex-col">
                  <img
                    src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800&auto=format&fit=crop"
                    alt="Music"
                    className="rounded-2xl shadow-lg object-cover h-48 w-full hover:scale-105 transition-transform duration-300"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop"
                    alt="Kids activities"
                    className="rounded-2xl shadow-lg object-cover flex-grow w-full min-h-[200px] hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-4 flex flex-col">
                  <img
                    src="https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800&auto=format&fit=crop"
                    alt="Theater"
                    className="rounded-2xl shadow-lg object-cover flex-grow w-full min-h-[200px] hover:scale-105 transition-transform duration-300"
                  />
                  <div className="bg-gray-50 rounded-2xl p-6 flex flex-col justify-center items-center text-center h-48 hover:scale-105 transition-transform duration-300 border border-gray-100 shrink-0">
                    <span className="text-5xl font-bold text-primary mb-2">
                      23+
                    </span>
                    <span className="text-gray-600 font-medium">
                      {t.about.yearsLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 sm:py-24 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              {t.activities.title}
            </h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">{t.activities.subtitle}</p>
            <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Theater}
              title={t.activities.culture}
              description={t.activities.cultureDesc}
              colorClass="bg-orange-100 text-orange-500"
            />
            <FeatureCard
              icon={BookOpen}
              title={t.activities.library}
              description={t.activities.libraryDesc}
              colorClass="bg-blue-100 text-blue-500"
            />
            <FeatureCard
              icon={Users}
              title={t.activities.clubs}
              description={t.activities.clubsDesc}
              colorClass="bg-green-100 text-green-500"
            />
            <FeatureCard
              icon={Sparkles}
              title={t.activities.kids}
              description={t.activities.kidsDesc}
              colorClass="bg-purple-100 text-purple-500"
            />
            <FeatureCard
              icon={HeartHandshake}
              title={t.activities.social}
              description={t.activities.socialDesc}
              colorClass="bg-pink-100 text-pink-500"
            />
            <FeatureCard
              icon={Globe}
              title={t.activities.erasmus}
              description={t.activities.erasmusDesc}
              colorClass="bg-indigo-100 text-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm mb-2 block">
                {t.events.updates}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                {t.events.latestNews}
              </h2>
            </div>
            <Link
              href="/events"
              className="hidden sm:flex items-center text-primary font-medium hover:text-primary-hover"
            >
              {t.events.viewAll}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventsLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-xl h-80 animate-pulse" />
                ))
              : highlightEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    lang={lang}
                    readMoreLabel={t.events.readMore}
                  />
                ))}
          </div>

          <div className="mt-12 text-center sm:hidden">
            <Link
              href="/events"
              className="inline-flex items-center text-primary font-semibold hover:text-primary-hover border-2 border-primary px-6 py-2 rounded-full hover:bg-red-50 transition-colors text-sm sm:text-base tracking-wide"
            >
              {t.events.viewAll}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
