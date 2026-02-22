"use client";

/* eslint-disable @next/next/no-img-element */
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function AboutContent() {
  const { t } = useLanguage();

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
            {t.about.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Text */}
            <div className="lg:w-1/2">
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
                {t.about.content}
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                {t.about.mission}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
                {t.about.missionText}
              </p>

            </div>

            {/* Image + Services */}
            <div className="lg:w-1/2">
              <div className="h-80 rounded-2xl overflow-hidden shadow-lg mb-8">
                <img
                  src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop"
                  alt="Community activities"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                {t.about.services}
              </h2>
              <ul className="space-y-4">
                {t.about.servicesList.map((service, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-gray-600 text-base leading-relaxed">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
