import { MetadataRoute } from "next";
import { SERVICES } from "@/lib/constants";

const SITE_URL = "https://cleartaxsolutions.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Core pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/book`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/calculators`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Service pages
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${SITE_URL}${service.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Calculator pages
  const calculatorPages: MetadataRoute.Sitemap = [
    "income-tax",
    "self-employment-tax",
    "capital-gains",
    "payroll-tax",
    "estimated-tax",
    "marriage-penalty",
    "home-office",
    "vehicle-deduction",
    "depreciation",
    "ira-contribution",
    "hsa-contribution",
    "child-tax-credit",
    "earned-income-credit",
    "amt",
    "rmd",
  ].map((calc) => ({
    url: `${SITE_URL}/calculators/${calc}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Blog posts (add entries here as blog content is published)
  const blogPages: MetadataRoute.Sitemap = [
    // Example:
    // {
    //   url: `${SITE_URL}/blog/what-is-enrolled-agent`,
    //   lastModified: "2024-01-15",
    //   changeFrequency: "yearly",
    //   priority: 0.6,
    // },
  ];

  return [...staticPages, ...servicePages, ...calculatorPages, ...blogPages];
}
