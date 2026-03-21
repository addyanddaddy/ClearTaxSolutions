"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~500px (approximately past hero section)
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ease-in-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Shadow border on top */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      <div className="bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] px-4 py-3 safe-area-bottom">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          {/* Phone Call Button */}
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-navy-500 text-white hover:bg-navy-600 active:bg-navy-700 transition-colors flex-shrink-0"
            aria-label="Call us"
            onClick={() => {
              // Track phone click event
              if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "phone_click", {
                  event_category: "engagement",
                  event_label: "mobile_sticky_bar",
                });
              }
            }}
          >
            <Phone className="w-5 h-5" />
          </a>

          {/* Book Consultation Button */}
          <Link
            href="/book"
            className="btn-primary flex-1 py-3 text-sm font-semibold"
            onClick={() => {
              if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "book_consultation", {
                  event_category: "conversion",
                  event_label: "mobile_sticky_bar",
                });
              }
            }}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Free Consultation
          </Link>
        </div>
      </div>

      <style jsx>{`
        .safe-area-bottom {
          padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
        }
      `}</style>
    </div>
  );
}
