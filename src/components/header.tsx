"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();

  const navLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.about, href: "/about" },
    { name: t.nav.events, href: "/events" },
    { name: t.nav.contact, href: "/contact" },
  ];

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="fixed w-full z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 mr-auto">
            <img src="/ataturk.png" alt="Logo" className="w-10 h-10 mr-3 object-contain" />
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 leading-none text-lg font-[family-name:var(--font-montserrat)]">
                Atatürk
              </span>
              <span className="text-[11px] text-gray-400 tracking-widest uppercase leading-tight font-medium">
                {t.footer.brand}
              </span>
            </div>
          </Link>

          {/* Desktop Nav + Actions */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[15px] sm:text-base font-medium transition-colors tracking-wide py-1 ${
                  isActive(link.href)
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute -bottom-[27px] left-0 right-0 h-[2px] bg-primary rounded-full" />
                )}
              </Link>
            ))}

            <div className="w-px h-5 bg-gray-200" />

            <LanguageSwitcher />
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-5">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 absolute w-full left-0 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-3 rounded-lg text-[15px] font-medium ${
                  isActive(link.href)
                    ? "text-primary bg-red-50/50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
