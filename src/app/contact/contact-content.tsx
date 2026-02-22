"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function ContactContent() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Banner */}
      <div className="bg-gray-900 text-white pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {t.contact.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>
      </div>

      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Contact Info */}
          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{t.contact.addressLabel}</p>
                <p className="text-gray-500">{t.contact.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{t.contact.phoneLabel}</p>
                <p className="text-gray-500">{t.contact.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{t.contact.emailLabel}</p>
                <p className="text-gray-500">{t.contact.email}</p>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2 tracking-tight">
            <Clock className="w-5 h-5 text-primary" />
            {t.contact.hours}
          </h2>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <table className="w-full">
              <tbody>
                {t.contact.hoursData.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-200 last:border-0"
                  >
                    <td className="py-3 text-gray-700 font-medium">
                      {row.day}
                    </td>
                    <td className="py-3 text-gray-500 text-right">
                      {row.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
