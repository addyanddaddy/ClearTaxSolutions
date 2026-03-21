"use client";

import Script from "next/script";
import { SITE_CONFIG } from "@/lib/constants";

// Extend window type for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

/**
 * Custom GA4 event helpers.
 * Import and call these from any client component.
 */
export const trackEvent = {
  generateLead: (data?: Record<string, string>) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "generate_lead", {
        event_category: "conversion",
        ...data,
      });
    }
  },
  bookConsultation: (source?: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "book_consultation", {
        event_category: "conversion",
        event_label: source || "direct",
      });
    }
  },
  calculatorUsed: (calculatorType: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "calculator_used", {
        event_category: "engagement",
        event_label: calculatorType,
      });
    }
  },
  phoneClick: (source?: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "phone_click", {
        event_category: "engagement",
        event_label: source || "direct",
      });
    }
  },
};

export default function GoogleAnalytics() {
  const measurementId = SITE_CONFIG.ga4Id;

  // Do not render analytics in development or if no real ID is set
  if (!measurementId || measurementId === "G-XXXXXXXXXX") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}
