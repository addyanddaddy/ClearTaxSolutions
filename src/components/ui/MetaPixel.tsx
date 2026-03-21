"use client";

import Script from "next/script";
import { SITE_CONFIG } from "@/lib/constants";

// Extend window type for Meta Pixel
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
  }
}

const META_PIXEL_ID = SITE_CONFIG.metaPixelId;

/**
 * Custom Meta Pixel event helpers.
 * Import and call these from any client component.
 */
export const metaTrack = {
  lead: (data?: Record<string, string>) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", data);
    }
  },
  schedule: (data?: Record<string, string>) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Schedule", data);
    }
  },
  pageView: () => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  },
};

export default function MetaPixel() {
  // Do not render if no real Pixel ID is set
  if (!META_PIXEL_ID || META_PIXEL_ID === "XXXXXXXXXXXXXXXXX") {
    return null;
  }

  return (
    <>
      <Script id="meta-pixel-init" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
