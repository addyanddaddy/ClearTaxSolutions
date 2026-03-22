export const SITE_CONFIG = {
  name: "Clear Tax Solutions",
  tagline: "Licensed. Authorized. Local.",
  owner: "Joseph Gasana",
  credential: "IRS Enrolled Agent",
  education: "Master's Degree, University of Arizona",
  irsExperience: "Former IRS Tax Agent",
  licenseNo: "00153835-EA",
  enrolledDate: "September 21, 2023",
  languages: ["English", "Kinyarwanda", "Swahili", "French"],
  phone: "(555) 000-0000", // Replace with actual phone
  email: "info@cleartaxsolutions.com",
  address: {
    street: "123 Main Street", // Replace with actual address
    city: "Your City",
    state: "AZ",
    zip: "85000",
  },
  social: {
    facebook: "https://facebook.com/cleartaxsolutions",
    linkedin: "https://linkedin.com/company/cleartaxsolutions",
    instagram: "https://instagram.com/cleartaxsolutions",
    youtube: "https://youtube.com/@cleartaxsolutions",
  },
  bookingUrl: "/book",
  ga4Id: "G-XXXXXXXXXX", // Replace with actual GA4 ID
  metaPixelId: "XXXXXXXXXXXXXXXXX", // Replace with actual Meta Pixel ID
} as const;

export const SERVICES = [
  {
    title: "Individual Tax Preparation",
    slug: "individual",
    href: "/services/individual",
    description: "Form 1040 and all schedules — maximize your refund with expert preparation.",
    icon: "User",
  },
  {
    title: "Business Tax Preparation",
    slug: "business",
    href: "/services/business",
    description: "C-Corp, S-Corp, Partnership, LLC, and Non-Profit tax filings.",
    icon: "Building2",
  },
  {
    title: "IRS Audit Representation",
    slug: "irs-representation",
    href: "/services/irs-representation",
    description: "Full audit defense — correspondence, office, and field audits.",
    icon: "Shield",
  },
  {
    title: "Tax Debt Resolution",
    slug: "tax-debt",
    href: "/services/tax-debt",
    description: "Offers in Compromise, installment agreements, and penalty abatement.",
    icon: "DollarSign",
  },
  {
    title: "Payroll Tax Services",
    slug: "payroll-tax",
    href: "/services/payroll-tax",
    description: "941/940 filings, W-2/1099 processing, and payroll tax resolution.",
    icon: "Users",
  },
  {
    title: "Tax Planning & Strategy",
    slug: "tax-planning",
    href: "/services/tax-planning",
    description: "Proactive tax planning to minimize liability and maximize savings.",
    icon: "TrendingUp",
  },
  {
    title: "Estate & Trust Tax",
    slug: "estate-trust",
    href: "/services/estate-trust",
    description: "Form 1041 filings and estate planning for trusts and estates.",
    icon: "Landmark",
  },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: SERVICES.map((s) => ({
      label: s.title,
      href: s.href,
      description: s.description,
    })),
  },
  { label: "Calculators", href: "/calculators" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const TRUST_SIGNALS = [
  "Former IRS Tax Agent",
  "IRS Licensed Enrolled Agent",
  "Master's Degree — University of Arizona",
  "Multilingual: English, Kinyarwanda, Swahili, French",
] as const;

export const SERVICE_CATEGORIES = [
  "Individual Taxes",
  "Business Taxes",
  "IRS Audit",
  "Tax Debt",
  "Payroll",
  "Tax Planning",
  "Estate & Trust",
  "Other",
] as const;
