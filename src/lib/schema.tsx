import { SITE_CONFIG, SERVICES } from "@/lib/constants";

const SITE_URL = "https://cleartaxsolutions.com";

// ─── Type definitions ───────────────────────────────────────────────

type JsonLd = Record<string, unknown>;

interface FAQItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ArticleData {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}

// ─── Schema generators ──────────────────────────────────────────────

export function localBusinessSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "TaxPreparationService",
    name: SITE_CONFIG.name,
    description:
      "Professional tax preparation, IRS audit representation, and tax debt resolution by IRS Enrolled Agent Joseph Gasana.",
    url: SITE_URL,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.4484,
      longitude: -112.074,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    sameAs: [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.youtube,
    ],
    areaServed: "US",
    priceRange: "$$",
    founder: personSchema(),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tax Services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
          url: `${SITE_URL}${s.href}`,
        },
      })),
    },
  };
}

export function personSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.owner,
    jobTitle: SITE_CONFIG.credential,
    worksFor: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_URL,
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "IRS Enrolled Agent",
      recognizedBy: {
        "@type": "Organization",
        name: "Internal Revenue Service",
        url: "https://www.irs.gov",
      },
      validFrom: "2023-09-21",
    },
    knowsAbout: [
      "Tax Preparation",
      "IRS Audit Representation",
      "Tax Debt Resolution",
      "Offer in Compromise",
      "Payroll Tax",
      "Business Tax",
      "Estate & Trust Tax",
    ],
  };
}

export function faqPageSchema(faqs: FAQItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function professionalServiceSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_CONFIG.name,
    description:
      "Licensed IRS Enrolled Agent providing tax preparation, audit representation, and tax debt resolution services.",
    url: SITE_URL,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "IRS Enrolled Agent",
      recognizedBy: {
        "@type": "Organization",
        name: "Internal Revenue Service",
      },
    },
  };
}

export function articleSchema(article: ArticleData): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url.startsWith("http")
      ? article.url
      : `${SITE_URL}${article.url}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: personSchema(),
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    ...(article.image && {
      image: {
        "@type": "ImageObject",
        url: article.image.startsWith("http")
          ? article.image
          : `${SITE_URL}${article.image}`,
      },
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url.startsWith("http")
        ? article.url
        : `${SITE_URL}${article.url}`,
    },
  };
}

// ─── SchemaScript component ─────────────────────────────────────────

interface SchemaScriptProps {
  schema: JsonLd | JsonLd[];
}

export function SchemaScript({ schema }: SchemaScriptProps) {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
