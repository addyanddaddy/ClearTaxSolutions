import type { Metadata } from "next";
import localFont from "next/font/local";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import GoogleAnalytics from "@/components/ui/GoogleAnalytics";
import MetaPixel from "@/components/ui/MetaPixel";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Clear Tax Solutions | IRS Enrolled Agent Tax Services",
    template: "%s | Clear Tax Solutions",
  },
  description:
    "Professional tax preparation, IRS audit representation, and tax debt resolution by Joseph Gasana, IRS Enrolled Agent (License No. 00153835-EA). Book your free consultation today.",
  keywords: [
    "tax preparation",
    "enrolled agent",
    "IRS representation",
    "tax debt resolution",
    "business tax",
    "individual tax",
    "audit defense",
    "offer in compromise",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Clear Tax Solutions",
    title: "Clear Tax Solutions | IRS Enrolled Agent Tax Services",
    description:
      "Professional tax preparation, IRS audit representation, and tax debt resolution. Licensed IRS Enrolled Agent serving all 50 states.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TaxPreparationService",
              name: "Clear Tax Solutions",
              description:
                "Professional tax preparation, IRS audit representation, and tax debt resolution by IRS Enrolled Agent Joseph Gasana.",
              url: "https://cleartaxsolutions.com",
              telephone: "(480) 930-9561",
              email: "cleartaxsolutions18@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "3030 N. Central Ave. Ste. 507",
                addressLocality: "Phoenix",
                addressRegion: "AZ",
                postalCode: "85012",
                addressCountry: "US",
              },
              founder: {
                "@type": "Person",
                name: "Joseph Gasana",
                jobTitle: "Tax Resolution Specialist",
                alumniOf: {
                  "@type": "CollegeOrUniversity",
                  name: "University of Arizona",
                },
                knowsLanguage: ["English", "Kinyarwanda", "Swahili", "French"],
                hasCredential: [
                  {
                    "@type": "EducationalOccupationalCredential",
                    credentialCategory: "IRS Enrolled Agent",
                    validFrom: "2023-09-21",
                    recognizedBy: {
                      "@type": "Organization",
                      name: "Internal Revenue Service",
                    },
                  },
                  {
                    "@type": "EducationalOccupationalCredential",
                    credentialCategory: "Master of Science in Accounting (MSA)",
                    educationalLevel: "Master's",
                    recognizedBy: {
                      "@type": "CollegeOrUniversity",
                      name: "University of Arizona",
                    },
                  },
                ],
              },
              areaServed: "US",
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GoogleAnalytics />
        <MetaPixel />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
