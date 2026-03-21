import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Calendar,
  CheckCircle,
  ArrowRight,
  Phone,
  Shield,
  Star,
  DollarSign,
  ChevronDown,
  Briefcase,
  Users,
  Heart,
  Scale,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Business Tax Preparation",
  description:
    "Business tax preparation for C-Corps (Form 1120), S-Corps (Form 1120-S), Partnerships (Form 1065), and Non-Profits (Form 990). QBI deduction, Section 179, bonus depreciation. IRS Enrolled Agent.",
};

const faqs = [
  {
    q: "What types of business entities do you prepare returns for?",
    a: "We prepare returns for all entity types: C-Corporations (Form 1120 under IRC Section 11), S-Corporations (Form 1120-S under IRC Section 1363), Partnerships and multi-member LLCs (Form 1065 under IRC Section 701), and Non-Profit Organizations (Form 990 under IRC Section 501(c)). We also handle sole proprietor filings on Schedule C.",
  },
  {
    q: "What is the Qualified Business Income (QBI) deduction?",
    a: "Under IRC Section 199A, eligible owners of pass-through entities (S-Corps, partnerships, sole proprietorships) can deduct up to 20% of their qualified business income. The deduction is subject to W-2 wage limitations and specified service trade or business (SSTB) rules at higher income levels. We analyze your eligibility and maximize this deduction.",
  },
  {
    q: "How does Section 179 expensing work for 2024?",
    a: "IRC Section 179 allows businesses to immediately deduct the full cost of qualifying assets (equipment, vehicles, software) up to $1,220,000 for 2024. This is subject to a phase-out threshold of $3,050,000 in total asset purchases. We identify all eligible assets to maximize your deduction.",
  },
  {
    q: "What is bonus depreciation for 2024?",
    a: "Under IRC Section 168(k), businesses can take 60% bonus depreciation on new and used qualifying property placed in service in 2024. This rate is phasing down — it was 80% in 2023 and will be 40% in 2025. We help you strategize asset purchases to maximize depreciation benefits.",
  },
  {
    q: "Can you help with business meal deductions?",
    a: "Under IRC Section 274, business meals are generally 50% deductible when directly related to the active conduct of business. We ensure proper documentation and categorization to maximize your deduction while maintaining IRS compliance.",
  },
  {
    q: "Should my business be an LLC, S-Corp, or C-Corp?",
    a: "The optimal entity structure depends on your income level, growth plans, self-employment tax exposure, and eligibility for the QBI deduction. During your consultation, we analyze your specific situation and recommend the entity type that minimizes your overall tax burden.",
  },
];

const entityTypes = [
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "C-Corporation",
    form: "Form 1120",
    code: "IRC Section 11",
    description: "Flat 21% corporate tax rate. Suitable for businesses planning to reinvest profits, seek venture capital, or go public. Subject to double taxation on dividends.",
    features: ["21% flat corporate rate", "Unlimited shareholders", "Retained earnings flexibility", "Fringe benefit deductions"],
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "S-Corporation",
    form: "Form 1120-S",
    code: "IRC Section 1363",
    description: "Pass-through taxation avoids double taxation. Income flows to shareholders' personal returns. Limited to 100 U.S. shareholders with one class of stock.",
    features: ["Pass-through income", "Self-employment tax savings", "QBI deduction eligible", "Up to 100 shareholders"],
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Partnership / LLC",
    form: "Form 1065",
    code: "IRC Section 701",
    description: "Flexible allocation of income, deductions, and credits among partners. Multi-member LLCs default to partnership taxation. No entity-level tax.",
    features: ["Flexible profit allocation", "No entity-level tax", "QBI deduction eligible", "Unlimited members"],
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Non-Profit",
    form: "Form 990",
    code: "IRC Section 501(c)",
    description: "Tax-exempt organizations must file annual information returns. We ensure compliance with reporting requirements and maintain your exempt status.",
    features: ["Tax-exempt status maintenance", "UBIT analysis", "Form 990/990-EZ/990-N", "State compliance"],
  },
];

export default function BusinessTaxPage() {
  return (
    <>
      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="gradient-navy text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-teal-300 mb-4">
              <Building2 className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wide">Business Tax Services</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Business Tax Preparation
            </h1>
            <p className="text-xl text-navy-200 mb-8">
              Expert preparation for every business entity — C-Corps, S-Corps, Partnerships, LLCs, and
              Non-Profits. Maximize deductions with Section 179 expensing, bonus depreciation, and the
              QBI deduction. Prepared by {SITE_CONFIG.owner}, {SITE_CONFIG.credential}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book" className="btn-primary text-lg px-8 py-4">
                <Calendar className="w-5 h-5 mr-2" />
                Book Free Consultation
              </Link>
              <a href={`tel:${SITE_CONFIG.phone}`} className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-navy-500">
                <Phone className="w-5 h-5 mr-2" />
                Call {SITE_CONFIG.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <div className="section-padding">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Entity Type Selector Cards */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Choose Your Entity Type
              </h2>
              <div className="space-y-6">
                {entityTypes.map((entity) => (
                  <div key={entity.title} className="card">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center flex-shrink-0">
                        {entity.icon}
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-navy-500">{entity.title}</h3>
                          <span className="text-xs font-medium bg-navy-50 text-navy-500 px-2 py-1 rounded-full">
                            {entity.form}
                          </span>
                          <span className="text-xs font-medium bg-teal-50 text-teal-600 px-2 py-1 rounded-full">
                            {entity.code}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{entity.description}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {entity.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Deductions */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Key Business Deductions &amp; Provisions
              </h2>

              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-xl font-bold text-navy-500 mb-2">
                    Qualified Business Income Deduction (QBI)
                  </h3>
                  <p className="text-xs font-medium text-teal-600 mb-3">IRC Section 199A</p>
                  <p className="text-gray-600 mb-3">
                    Owners of pass-through entities can deduct up to <strong>20% of qualified business income</strong>.
                    The deduction is subject to complex limitations based on W-2 wages paid, the unadjusted basis
                    of qualified property, and whether the business is a specified service trade or business (SSTB).
                  </p>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Available for S-Corps, Partnerships, and sole proprietors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Phase-out begins at $191,950 single / $383,900 MFJ (2024)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>We optimize your W-2/distribution mix to maximize the deduction</span>
                    </li>
                  </ul>
                </div>

                <div className="card">
                  <h3 className="text-xl font-bold text-navy-500 mb-2">
                    Section 179 Expensing
                  </h3>
                  <p className="text-xs font-medium text-teal-600 mb-3">IRC Section 179</p>
                  <p className="text-gray-600 mb-3">
                    Immediately expense the cost of qualifying business assets instead of depreciating them
                    over time. For 2024, the limit is <strong>$1,220,000</strong> with a phase-out beginning at
                    $3,050,000 in total purchases.
                  </p>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Equipment, machinery, office furniture, computers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Business vehicles (subject to luxury auto limits)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Off-the-shelf software and qualified improvement property</span>
                    </li>
                  </ul>
                </div>

                <div className="card">
                  <h3 className="text-xl font-bold text-navy-500 mb-2">
                    Bonus Depreciation
                  </h3>
                  <p className="text-xs font-medium text-teal-600 mb-3">IRC Section 168(k)</p>
                  <p className="text-gray-600 mb-3">
                    For 2024, businesses can take <strong>60% bonus depreciation</strong> on both new and used
                    qualifying property placed in service during the year. This rate is phasing down from 100%
                    (2022) by 20% per year through 2027.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <h4 className="font-semibold text-navy-500 text-sm mb-2">Bonus Depreciation Phase-Down</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-navy-500">2023</div>
                        <div className="text-gray-500">80%</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-teal-500">2024</div>
                        <div className="text-teal-600 font-semibold">60%</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-navy-500">2025</div>
                        <div className="text-gray-500">40%</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-navy-500">2026</div>
                        <div className="text-gray-500">20%</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-xl font-bold text-navy-500 mb-2">
                    Business Meals Deduction
                  </h3>
                  <p className="text-xs font-medium text-teal-600 mb-3">IRC Section 274</p>
                  <p className="text-gray-600">
                    Business meals are <strong>50% deductible</strong> when directly related to or associated
                    with the active conduct of a trade or business. Proper documentation requires the date,
                    amount, business purpose, and business relationship of each meal. Entertainment expenses
                    remain non-deductible after the Tax Cuts and Jobs Act.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <details key={i} className="card group">
                    <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-navy-500">
                      {faq.q}
                      <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                    </summary>
                    <p className="text-gray-600 mt-4">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related Services */}
            <section>
              <h2 className="text-2xl font-bold text-navy-500 mb-4">Related Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/services/payroll-tax" className="card group">
                  <h3 className="font-bold text-navy-500 group-hover:text-teal-500 transition-colors mb-1">
                    Payroll Tax Services
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Form 941/940 filings, W-2/1099 processing, and payroll compliance.
                  </p>
                  <span className="inline-flex items-center text-teal-500 text-sm font-medium mt-2">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
                <Link href="/services/tax-planning" className="card group">
                  <h3 className="font-bold text-navy-500 group-hover:text-teal-500 transition-colors mb-1">
                    Tax Planning &amp; Strategy
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Entity structure optimization and proactive tax savings strategies.
                  </p>
                  <span className="inline-flex items-center text-teal-500 text-sm font-medium mt-2">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              </div>
            </section>
          </div>

          {/* Sticky Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="card border-2 border-teal-500 text-center">
                <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-teal-500" />
                </div>
                <h3 className="text-xl font-bold text-navy-500 mb-2">Need Business Tax Help?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get expert advice on entity selection, deductions, and compliance from {SITE_CONFIG.owner},{" "}
                  {SITE_CONFIG.credential}.
                </p>
                <Link href="/book" className="btn-primary w-full mb-3">
                  Book Free Consultation
                </Link>
                <a href={`tel:${SITE_CONFIG.phone}`} className="btn-outline w-full">
                  <Phone className="w-4 h-4 mr-1" />
                  Call Now
                </a>
              </div>

              <div className="card bg-gray-50">
                <h4 className="font-bold text-navy-500 mb-3">Why Choose Us</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>IRS Enrolled Agent with business tax expertise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Entity structure optimization included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Scale className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>QBI deduction analysis and maximization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <DollarSign className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Year-round business advisory support</span>
                  </li>
                </ul>
              </div>

              <div className="card bg-navy-500 text-white">
                <p className="text-sm text-navy-200 mb-1">Prepared by</p>
                <p className="font-bold text-lg">{SITE_CONFIG.owner}</p>
                <p className="text-teal-300 text-sm">{SITE_CONFIG.credential}</p>
                <p className="text-navy-300 text-xs mt-1">License No. {SITE_CONFIG.licenseNo}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile CTA */}
      <section className="lg:hidden bg-teal-500 text-white py-12">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get Expert Business Tax Help</h2>
          <p className="text-teal-100 mb-6">
            Schedule your free consultation with {SITE_CONFIG.owner}, {SITE_CONFIG.credential}.
          </p>
          <Link href="/book" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
            <Calendar className="w-5 h-5 mr-2" />
            Book Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
