import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
              telephone: "(555) 000-0000",
              email: "info@cleartaxsolutions.com",
              founder: {
                "@type": "Person",
                name: "Joseph Gasana",
                jobTitle: "IRS Enrolled Agent",
                hasCredential: {
                  "@type": "EducationalOccupationalCredential",
                  credentialCategory: "IRS Enrolled Agent",
                  validFrom: "2023-09-21",
                  recognizedBy: {
                    "@type": "Organization",
                    name: "Internal Revenue Service",
                  },
                },
              },
              areaServed: "US",
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
