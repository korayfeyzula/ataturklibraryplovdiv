"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { CONTACT, SOCIAL } from "@/lib/config";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1120] text-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 leading-tight tracking-tight">
              {t.footer.brand}
              <br />
              &ldquo;{t.footer.brandName}&rdquo;
            </h3>
            <p className="text-gray-400 text-sm">{t.footer.tagline}</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 text-red-500 mt-0.5 mr-3 shrink-0" />
                <span className="text-gray-300 text-sm">
                  {t.footer.address}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 text-red-500 mr-3 shrink-0" />
                <span className="text-gray-300 text-sm">
                  {CONTACT.phone}
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 text-red-500 mr-3 shrink-0" />
                <span className="text-gray-300 text-sm">
                  {CONTACT.email}
                </span>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              {t.contact.hours}
            </h4>
            <ul className="space-y-3">
              {t.contact.hoursData.map((row, i) => (
                <li
                  key={i}
                  className="flex justify-between text-sm text-gray-300 gap-4"
                >
                  <span>{row.day}</span>
                  <span className="text-gray-400">{row.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
              {t.footer.followTitle}
            </h4>
            <div className="flex gap-4">
              <Link
                href={SOCIAL.facebook}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-all duration-300 group"
              >
                <Facebook className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </Link>
              <Link
                href={SOCIAL.instagram}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
          <p>
            &copy; {year} Atatürk Community Center. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
