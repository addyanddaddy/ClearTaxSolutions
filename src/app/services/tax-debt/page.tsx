import type { Metadata } from "next";
import Link from "next/link";
import {
  DollarSign,
  Calendar,
  CheckCircle,
  ArrowRight,
  Phone,
  ChevronDown,
  AlertTriangle,
  Handshake,
  Clock,
  XCircle,
  Scale,
  Heart,
  Lock,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tax Debt Resolution",
  description:
    "Tax debt resolution services — Offers in Compromise (IRC Section 7122), installment agreements (IRC Section 6159), penalty abatement, currently not collectible status, innocent spouse relief, and lien withdrawal. IRS Enrolled Agent.",
};

const faqs = [
  {
    q: "What is an Offer in Compromise (OIC)?",
    a: "An Offer in Compromise (Form 656) under IRC Section 7122 allows you to settle your tax debt for less than the full amount owed. The IRS considers your ability to pay, income, expenses, and asset equity. We prepare your OIC application with Treasury Regulation Section 301.7122-1 compliance to present the strongest possible case.",
  },
  {
    q: "What types of installment agreements are available?",
    a: "Under IRC Section 6159, the IRS offers several installment agreement options: Guaranteed (balances up to $10,000 with a 3-year payment term), Streamlined (balances up to $50,000 with up to 72 months to pay), and In-Business Trust Fund Express (balances up to $25,000 with 24-month terms). We determine which option best fits your situation.",
  },
  {
    q: "What is Currently Not Collectible (CNC) status?",
    a: "Under IRS IRM 5.16.1, if paying your tax debt would cause financial hardship — meaning you cannot meet basic living expenses — the IRS may place your account in Currently Not Collectible status. This pauses collection activity, though interest and penalties continue to accrue. The 10-year collection statute (IRC Section 6502) continues to run.",
  },
  {
    q: "Can penalties be removed from my tax debt?",
    a: "Yes. Penalty abatement is available under IRC Section 6656 (failure to deposit) and IRC Section 6651 (failure to file/pay). First-Time Abatement (FTA) under IRS IRM 20.1.1.3.6.1 is available if you have a clean compliance history for the prior three years. Reasonable cause abatement is also available for circumstances beyond your control.",
  },
  {
    q: "What is Trust Fund Recovery Penalty (TFRP)?",
    a: "Under IRC Section 6672, the IRS can assess the Trust Fund Recovery Penalty against individuals responsible for collecting, accounting for, and paying over employment taxes who willfully fail to do so. This makes responsible persons personally liable for the employee portion of FICA and withheld income taxes.",
  },
  {
    q: "What is Innocent Spouse Relief?",
    a: "Under IRC Section 6015, if your spouse or former spouse improperly reported items or omitted items on a joint return, you may qualify for Innocent Spouse Relief under Section 6015(b), Separation of Liability under Section 6015(c), or Equitable Relief under Section 6015(f). This can relieve you of responsibility for the tax, interest, and penalties.",
  },
];

const resolutionOptions = [
  {
    icon: <Handshake className="w-8 h-8" />,
    title: "Offer in Compromise",
    code: "IRC Section 7122",
    form: "Form 656",
    description: "Settle your tax debt for less than the full amount owed. The IRS evaluates your reasonable collection potential based on income, expenses, and assets.",
    details: [
      "Treasury Reg. Section 301.7122-1 governs eligibility",
      "$205 application fee (waived for low-income)",
      "Doubt as to Liability or Collectibility",
      "Effective Tax Administration basis available",
    ],
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Installment Agreements",
    code: "IRC Section 6159",
    form: "Form 9465",
    description: "Pay your tax debt over time in monthly installments. Multiple options based on the amount owed.",
    details: [
      "Guaranteed: up to $10,000 / 3-year term",
      "Streamlined: up to $50,000 / 72-month term",
      "In-Business Trust Fund: up to $25,000 / 24 months",
      "Partial pay agreements also available",
    ],
  },
  {
    icon: <XCircle className="w-8 h-8" />,
    title: "Currently Not Collectible",
    code: "IRS IRM 5.16.1",
    form: "Form 433-A/B",
    description: "If paying would cause financial hardship, the IRS suspends collection. The 10-year statute of limitations continues running.",
    details: [
      "Requires financial disclosure (Form 433-A/B)",
      "Collection activity paused",
      "Levies and garnishments stopped",
      "Periodic financial review by IRS",
    ],
  },
  {
    icon: <Scale className="w-8 h-8" />,
    title: "Penalty Abatement",
    code: "IRC Sections 6651, 6656",
    form: "Form 843 / Letter",
    description: "Remove or reduce IRS penalties for failure to file, failure to pay, or failure to deposit employment taxes.",
    details: [
      "First-Time Abatement (IRS IRM 20.1.1.3.6.1)",
      "Reasonable cause abatement",
      "Statutory exception abatement",
      "Can save thousands in penalties",
    ],
  },
  {
    icon: <AlertTriangle className="w-8 h-8" />,
    title: "Trust Fund Recovery",
    code: "IRC Section 6672",
    form: "Form 4180 Interview",
    description: "Defense against personal liability for unpaid employment taxes assessed against responsible persons.",
    details: [
      "Responsibility and willfulness analysis",
      "Protest and appeals support",
      "Negotiate reduced liability",
      "Protect personal assets",
    ],
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Innocent Spouse Relief",
    code: "IRC Section 6015",
    form: "Form 8857",
    description: "Relief from joint return liability caused by your spouse or former spouse's erroneous items.",
    details: [
      "Section 6015(b) — Traditional relief",
      "Section 6015(c) — Separation of liability",
      "Section 6015(f) — Equitable relief",
      "Available for current and former spouses",
    ],
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Lien Withdrawal & Subordination",
    code: "IRC Section 6323",
    form: "Form 12277",
    description: "Request withdrawal, release, subordination, or discharge of federal tax liens affecting your property and credit.",
    details: [
      "Lien withdrawal per IRS IRM 5.12.9",
      "Subordination for refinancing",
      "Discharge for property sales",
      "Credit report lien removal",
    ],
  },
];

export default function TaxDebtPage() {
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
              <DollarSign className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wide">Tax Debt Resolution</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Tax Debt Resolution
            </h1>
            <p className="text-xl text-navy-200 mb-8">
              Owe the IRS? We negotiate on your behalf to reduce, resolve, or settle your tax debt.
              From Offers in Compromise to installment agreements and penalty abatement —{" "}
              {SITE_CONFIG.owner}, {SITE_CONFIG.credential}, fights for the best possible outcome.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book" className="btn-primary text-lg px-8 py-4">
                <Calendar className="w-5 h-5 mr-2" />
                Free Debt Evaluation
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
                Comprehensive Tax Debt Solutions
              </h2>
              <p className="text-gray-700 mb-4">
                Tax debt can feel overwhelming, but there are real, legal solutions. The IRS has
                established programs that allow taxpayers to settle, reduce, or manage their tax
                liabilities based on their financial circumstances. As an IRS Enrolled Agent,{" "}
                {SITE_CONFIG.owner} understands these programs inside and out and negotiates directly
                with the IRS on your behalf.
              </p>
              <p className="text-gray-700">
                Every case begins with a thorough analysis of your financial situation, tax history,
                and the applicable IRS procedures. We then recommend the strategy most likely to
                achieve the best result for your specific circumstances.
              </p>
            </section>

            {/* Resolution Options */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Resolution Options
              </h2>
              <div className="space-y-6">
                {resolutionOptions.map((option) => (
                  <div key={option.title} className="card">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center flex-shrink-0">
                        {option.icon}
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-navy-500">{option.title}</h3>
                          <span className="text-xs font-medium bg-teal-50 text-teal-600 px-2 py-1 rounded-full">
                            {option.code}
                          </span>
                          <span className="text-xs font-medium bg-navy-50 text-navy-500 px-2 py-1 rounded-full">
                            {option.form}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{option.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {option.details.map((detail) => (
                            <div key={detail} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Hardship Qualifier Form */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Free Tax Debt Evaluation
              </h2>
              <div className="card">
                <p className="text-gray-600 mb-6">
                  Tell us about your situation and we will identify the best resolution strategy for you.
                  All consultations are free and confidential.
                </p>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label-text">Full Name *</label>
                      <input type="text" className="input-field" placeholder="Your full name" required />
                    </div>
                    <div>
                      <label className="label-text">Phone *</label>
                      <input type="tel" className="input-field" placeholder="(555) 000-0000" required />
                    </div>
                  </div>
                  <div>
                    <label className="label-text">Email *</label>
                    <input type="email" className="input-field" placeholder="you@example.com" required />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label-text">Estimated Tax Debt *</label>
                      <select className="input-field" required>
                        <option value="">Select range</option>
                        <option value="under-10k">Under $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="over-100k">Over $100,000</option>
                      </select>
                    </div>
                    <div>
                      <label className="label-text">Tax Years Affected</label>
                      <input type="text" className="input-field" placeholder="e.g., 2020-2023" />
                    </div>
                  </div>
                  <div>
                    <label className="label-text">Current IRS Collection Activity</label>
                    <select className="input-field">
                      <option value="">Select if applicable</option>
                      <option value="none">No current activity</option>
                      <option value="notices">Receiving notices</option>
                      <option value="lien">Tax lien filed</option>
                      <option value="levy">Levy/garnishment active</option>
                      <option value="seizure">Property seizure threatened</option>
                    </select>
                  </div>
                  <div>
                    <label className="label-text">Are you experiencing financial hardship?</label>
                    <select className="input-field">
                      <option value="">Select</option>
                      <option value="yes">Yes — I cannot pay basic living expenses</option>
                      <option value="partial">Partially — I can pay some but not all</option>
                      <option value="no">No — I can pay but need a payment plan</option>
                    </select>
                  </div>
                  <div>
                    <label className="label-text">Additional Details</label>
                    <textarea className="input-field" rows={4} placeholder="Describe your tax debt situation..." />
                  </div>
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Request Free Evaluation
                  </button>
                </form>
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
                <Link href="/services/irs-representation" className="card group">
                  <h3 className="font-bold text-navy-500 group-hover:text-teal-500 transition-colors mb-1">
                    IRS Audit Representation
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Full audit defense — correspondence, office, and field audits.
                  </p>
                  <span className="inline-flex items-center text-teal-500 text-sm font-medium mt-2">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
                <Link href="/services/payroll-tax" className="card group">
                  <h3 className="font-bold text-navy-500 group-hover:text-teal-500 transition-colors mb-1">
                    Payroll Tax Services
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Payroll tax filing, compliance, and resolution for trust fund issues.
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
                  <DollarSign className="w-8 h-8 text-teal-500" />
                </div>
                <h3 className="text-xl font-bold text-navy-500 mb-2">Owe the IRS?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get a free, confidential evaluation of your options from {SITE_CONFIG.owner},{" "}
                  {SITE_CONFIG.credential}.
                </p>
                <Link href="/book" className="btn-primary w-full mb-3">
                  Free Debt Evaluation
                </Link>
                <a href={`tel:${SITE_CONFIG.phone}`} className="btn-outline w-full">
                  <Phone className="w-4 h-4 mr-1" />
                  Call Now
                </a>
              </div>

              <div className="card bg-gray-50">
                <h4 className="font-bold text-navy-500 mb-3">We Can Help With</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Stop wage garnishments and bank levies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Remove or reduce tax liens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Settle tax debt for less than owed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Set up affordable payment plans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Abate penalties and reduce interest</span>
                  </li>
                </ul>
              </div>

              <div className="card bg-navy-500 text-white">
                <p className="text-sm text-navy-200 mb-1">Your Advocate</p>
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
          <h2 className="text-2xl font-bold mb-4">Get Tax Debt Relief Today</h2>
          <p className="text-teal-100 mb-6">
            Free, confidential evaluation with {SITE_CONFIG.owner}, {SITE_CONFIG.credential}.
          </p>
          <Link href="/book" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
            <Calendar className="w-5 h-5 mr-2" />
            Free Debt Evaluation
          </Link>
        </div>
      </section>
    </>
  );
}
