import type { Metadata } from "next";
import Link from "next/link";
import {
  User,
  Calendar,
  CheckCircle,
  FileText,
  DollarSign,
  ArrowRight,
  Phone,
  Star,
  ChevronDown,
  Shield,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Individual Income Tax Preparation",
  description:
    "Expert individual income tax preparation — Form 1040, all schedules (A through SE), credits, and deductions. IRS Enrolled Agent preparing returns for all 50 states. Pricing from $199.",
};

const faqs = [
  {
    q: "What forms and schedules are included in individual tax preparation?",
    a: "We prepare Form 1040 and all supporting schedules, including Schedule A (itemized deductions), Schedule B (interest and dividends), Schedule C (self-employment income), Schedule D (capital gains), Schedule E (rental and pass-through income), Schedule F (farm income), and Schedule SE (self-employment tax). Additional forms such as Form 8863, Form 2441, Form 8812, and Form 1116 are included as needed.",
  },
  {
    q: "What is the difference between the Basic, Standard, and Premium tiers?",
    a: "Basic ($199) covers simple W-2 returns with the standard deduction. Standard ($349) includes itemized deductions, investment income, rental properties, and common credits. Premium ($549) adds self-employment (Schedule C), multi-state filings, and complex situations like stock options or foreign income.",
  },
  {
    q: "Do I need to itemize deductions or take the standard deduction?",
    a: "Under IRC Section 63(e), you may elect to itemize deductions on Schedule A if your total itemizable expenses — including state/local taxes (IRC Section 164), mortgage interest, charitable contributions (IRC Section 170), and medical expenses (IRC Section 213) — exceed the standard deduction ($14,600 single / $29,200 married filing jointly for 2024). We analyze both scenarios to maximize your refund.",
  },
  {
    q: "Can you help with education credits and the Child Tax Credit?",
    a: "Yes. We prepare Form 8863 for the American Opportunity Credit and Lifetime Learning Credit under IRC Section 25A, Form 8812 for the Child Tax Credit under IRC Section 24 (up to $2,000 per qualifying child), and Form 8880 for the Saver's Credit under IRC Section 25B.",
  },
  {
    q: "What if I have self-employment income?",
    a: "Self-employment income is reported on Schedule C under IRC Section 162, with business expenses governed by Treasury Regulation Section 1.162-1. Self-employment tax is calculated on Schedule SE per IRC Sections 1401 and 1402. Our Standard and Premium tiers cover these filings.",
  },
  {
    q: "Do you handle multi-state tax returns?",
    a: "Yes. As an IRS Enrolled Agent licensed to practice in all 50 states, Joseph Gasana prepares state returns for any jurisdiction. Multi-state returns are included in the Premium tier or available as an add-on.",
  },
];

export default function IndividualTaxPage() {
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
              <User className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wide">Individual Tax Services</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Individual Income Tax Preparation
            </h1>
            <p className="text-xl text-navy-200 mb-8">
              Form 1040 and every schedule — from simple W-2 returns to complex self-employment,
              investment, and multi-state filings. Prepared by {SITE_CONFIG.owner},{" "}
              {SITE_CONFIG.credential}, to maximize your refund and ensure full IRS compliance.
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
            {/* Overview */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Comprehensive Individual Tax Filing
              </h2>
              <p className="text-gray-700 mb-4">
                Every individual tax situation is unique. Whether you have a straightforward W-2 return
                or a complex filing involving self-employment income, rental properties, capital gains,
                and foreign tax credits, our preparation covers every applicable form and schedule to
                ensure accuracy and maximize your legal deductions.
              </p>
              <p className="text-gray-700 mb-4">
                As an IRS Enrolled Agent (License No. {SITE_CONFIG.licenseNo}), {SITE_CONFIG.owner} is
                federally authorized to prepare and sign returns and represent taxpayers before the IRS
                in all 50 states.
              </p>
            </section>

            {/* Forms & Schedules */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Forms &amp; Schedules We Prepare
              </h2>

              <div className="space-y-6">
                {/* Form 1040 */}
                <div className="card">
                  <h3 className="text-xl font-bold text-navy-500 mb-2">Form 1040 — U.S. Individual Income Tax Return</h3>
                  <p className="text-gray-600 mb-3">
                    The foundation of every individual return. We prepare Form 1040 with all applicable
                    income, adjustments, and credits to determine your total tax liability or refund.
                  </p>
                </div>

                {/* Schedule A */}
                <div className="card">
                  <h3 className="text-xl font-bold text-navy-500 mb-2">Schedule A — Itemized Deductions</h3>
                  <p className="text-gray-600 mb-3">
                    Governed by <strong>IRC Section 63(e)</strong>. We analyze whether itemizing benefits you
                    more than the standard deduction, including:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>State and local taxes (SALT) — <strong>IRC Section 164</strong> (capped at $10,000)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Casualty and theft losses — <strong>IRC Section 165</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Charitable contributions — <strong>IRC Section 170</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Medical and dental expenses exceeding 7.5% of AGI — <strong>IRC Section 213</strong></span>
                    </li>
                  </ul>
                </div>

                {/* Schedule B */}
                <div className="card">
                  <h3 className="text-xl font-bold text-navy-500 mb-2">Schedule B — Interest &amp; Ordinary Dividends</h3>
                  <p className="text-gray-600">
                    Reports interest and dividend income per <strong>IRC Section 61</strong>. We also evaluate
                    the investment interest expense deduction under <strong>IRC Section 163(d)</strong> for taxpayers
                    with investment-related borrowing.
                  </p>
                </div>

                {/* Schedule C */}
                <div className="card">
                  <h3 className="text-xl font-bold text-navy-500 mb-2">Schedule C — Profit or Loss from Business</h3>
                  <p className="text-gray-600 mb-3">
                    For sole proprietors and single-member LLCs. Business expenses are deductible under
                    <strong> IRC Section 162</strong> and <strong>Treasury Regulation Section 1.162-1</strong>,
                    which requires expenses to be &quot;ordinary and necessary&quot; in the conduct of your trade or business.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Home office deduction, advertising, supplies, insurance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Vehicle expenses, travel, and professional services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Depreciation and Section 179 expensing</span>
                    </li>
                  </ul>
                </div>

                {/* Schedule D */}
                <div className="card">
                  <h3 className="text-xl font-bold text-navy-500 mb-2">Schedule D — Capital Gains and Losses</h3>
                  <p className="text-gray-600">
                    Reports sales of capital assets under <strong>IRC Section 1221</strong>. Short-term vs.
                    long-term classification per <strong>IRC Section 1222</strong> determines the applicable
                    tax rate under <strong>IRC Section 1(h)</strong> — with preferential rates of 0%, 15%, or
                    20% for long-term gains. Includes stock, bond, cryptocurrency, and real estate transactions.
                  </p>
                </div>

                {/* Schedule E */}
                <div className="card">
                  <h3 className="text-xl font-bold text-navy-500 mb-2">Schedule E — Supplemental Income and Loss</h3>
                  <p className="text-gray-600">
                    Rental real estate, royalties, and pass-through income from partnerships, S-corps, and trusts
                    under <strong>IRC Section 61</strong>. Subject to passive activity loss rules under
                    <strong> IRC Section 469</strong>. S-corp pass-through items reported per
                    <strong> IRC Section 1366</strong> and <strong>Section 1379</strong>.
                  </p>
                </div>

                {/* Schedule F */}
                <div className="card">
                  <h3 className="text-xl font-bold text-navy-500 mb-2">Schedule F — Profit or Loss from Farming</h3>
                  <p className="text-gray-600">
                    Farm income and expenses including soil and water conservation expenses under
                    <strong> IRC Section 175</strong>, fertilizer and lime costs under
                    <strong> IRC Section 180</strong>, and uniform capitalization rules under
                    <strong> IRC Section 263A</strong>.
                  </p>
                </div>

                {/* Schedule SE */}
                <div className="card">
                  <h3 className="text-xl font-bold text-navy-500 mb-2">Schedule SE — Self-Employment Tax</h3>
                  <p className="text-gray-600">
                    Calculates self-employment tax (Social Security + Medicare) on net self-employment income
                    under <strong>IRC Section 1401</strong>. Net earnings are determined per
                    <strong> IRC Section 1402</strong>. The current combined rate is 15.3% (12.4% Social Security
                    up to $168,600 + 2.9% Medicare with no cap).
                  </p>
                </div>
              </div>
            </section>

            {/* Credits & Additional Forms */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Tax Credits &amp; Additional Forms
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card">
                  <h3 className="font-bold text-navy-500 mb-2">Form 8863 — Education Credits</h3>
                  <p className="text-gray-600 text-sm">
                    American Opportunity Credit (up to $2,500) and Lifetime Learning Credit (up to $2,000)
                    under <strong>IRC Section 25A</strong>.
                  </p>
                </div>
                <div className="card">
                  <h3 className="font-bold text-navy-500 mb-2">Form 8880 — Saver&apos;s Credit</h3>
                  <p className="text-gray-600 text-sm">
                    Credit for contributions to retirement savings accounts under <strong>IRC Section 25B</strong>.
                    Up to $1,000 ($2,000 for joint filers).
                  </p>
                </div>
                <div className="card">
                  <h3 className="font-bold text-navy-500 mb-2">Form 2441 — Child &amp; Dependent Care</h3>
                  <p className="text-gray-600 text-sm">
                    Credit for childcare expenses enabling you to work under <strong>IRC Section 21</strong>.
                    Up to $3,000 for one dependent, $6,000 for two or more.
                  </p>
                </div>
                <div className="card">
                  <h3 className="font-bold text-navy-500 mb-2">Form 8812 — Child Tax Credit</h3>
                  <p className="text-gray-600 text-sm">
                    Up to $2,000 per qualifying child under <strong>IRC Section 24</strong>, with up to $1,700
                    refundable as the Additional Child Tax Credit.
                  </p>
                </div>
                <div className="card">
                  <h3 className="font-bold text-navy-500 mb-2">Form 1116 — Foreign Tax Credit</h3>
                  <p className="text-gray-600 text-sm">
                    Credit for taxes paid to foreign governments under <strong>IRC Section 901</strong>.
                    Prevents double taxation on foreign-source income.
                  </p>
                </div>
                <div className="card">
                  <h3 className="font-bold text-navy-500 mb-2">Form W-7 — ITIN Application</h3>
                  <p className="text-gray-600 text-sm">
                    Application for Individual Taxpayer Identification Number under <strong>IRC Section 6109</strong>
                    for individuals who need to file but are not eligible for an SSN.
                  </p>
                </div>
              </div>
            </section>

            {/* Pricing Tiers */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">Pricing</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Basic */}
                <div className="card border-2 border-gray-200 text-center">
                  <h3 className="text-lg font-bold text-navy-500 mb-1">Basic</h3>
                  <div className="text-4xl font-bold text-teal-500 mb-4">$199</div>
                  <ul className="space-y-3 text-left text-gray-600 text-sm mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Form 1040 with W-2 income</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Standard deduction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Child Tax Credit / EIC</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Single state return</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>E-file included</span>
                    </li>
                  </ul>
                  <Link href="/book" className="btn-outline w-full">
                    Get Started
                  </Link>
                </div>

                {/* Standard */}
                <div className="card border-2 border-teal-500 text-center relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                  <h3 className="text-lg font-bold text-navy-500 mb-1">Standard</h3>
                  <div className="text-4xl font-bold text-teal-500 mb-4">$349</div>
                  <ul className="space-y-3 text-left text-gray-600 text-sm mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Everything in Basic</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Schedule A (itemized deductions)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Schedule B, D, E (investments &amp; rentals)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Education &amp; dependent care credits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Foreign Tax Credit (Form 1116)</span>
                    </li>
                  </ul>
                  <Link href="/book" className="btn-primary w-full">
                    Get Started
                  </Link>
                </div>

                {/* Premium */}
                <div className="card border-2 border-gray-200 text-center">
                  <h3 className="text-lg font-bold text-navy-500 mb-1">Premium</h3>
                  <div className="text-4xl font-bold text-teal-500 mb-4">$549</div>
                  <ul className="space-y-3 text-left text-gray-600 text-sm mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Everything in Standard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Schedule C (self-employment)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Schedule SE &amp; Schedule F</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Multi-state filings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Stock options &amp; crypto reporting</span>
                    </li>
                  </ul>
                  <Link href="/book" className="btn-outline w-full">
                    Get Started
                  </Link>
                </div>
              </div>
              <p className="text-center text-gray-500 text-sm mt-4">
                All tiers include e-filing, accuracy guarantee, and year-round support. Additional forms
                may apply for complex situations.
              </p>
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
                <Link href="/services/tax-planning" className="card group">
                  <h3 className="font-bold text-navy-500 group-hover:text-teal-500 transition-colors mb-1">
                    Tax Planning &amp; Strategy
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Proactive strategies to minimize your tax liability year-round.
                  </p>
                  <span className="inline-flex items-center text-teal-500 text-sm font-medium mt-2">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
                <Link href="/services/irs-representation" className="card group">
                  <h3 className="font-bold text-navy-500 group-hover:text-teal-500 transition-colors mb-1">
                    IRS Audit Representation
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Full audit defense if the IRS questions your return.
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
              {/* Booking CTA */}
              <div className="card border-2 border-teal-500 text-center">
                <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-teal-500" />
                </div>
                <h3 className="text-xl font-bold text-navy-500 mb-2">Ready to File?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Book a free consultation with {SITE_CONFIG.owner}, {SITE_CONFIG.credential}.
                </p>
                <Link href="/book" className="btn-primary w-full mb-3">
                  Book Free Consultation
                </Link>
                <a href={`tel:${SITE_CONFIG.phone}`} className="btn-outline w-full">
                  <Phone className="w-4 h-4 mr-1" />
                  Call Now
                </a>
              </div>

              {/* Trust Box */}
              <div className="card bg-gray-50">
                <h4 className="font-bold text-navy-500 mb-3">Why Choose Us</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>IRS Enrolled Agent — authorized to represent you before the IRS</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Accuracy guarantee on every return</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>All forms and schedules — no extra charge for complexity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <DollarSign className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Transparent, upfront pricing — no surprises</span>
                  </li>
                </ul>
              </div>

              {/* Credential */}
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
          <h2 className="text-2xl font-bold mb-4">Ready to File Your Taxes?</h2>
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
