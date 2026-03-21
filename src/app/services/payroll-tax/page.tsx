import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  Calendar,
  CheckCircle,
  ArrowRight,
  Phone,
  ChevronDown,
  FileText,
  Calculator,
  ClipboardList,
  RefreshCw,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Payroll Tax Services",
  description:
    "Payroll tax preparation and filing — Form 941, Form 940, W-2/W-3, 1099-NEC/MISC. FICA compliance (IRC Sections 3101, 3111), additional Medicare tax, and amended return preparation. IRS Enrolled Agent.",
};

const faqs = [
  {
    q: "What payroll tax forms do you prepare?",
    a: "We prepare Form 941 (quarterly employer's tax return for income tax, Social Security, and Medicare under IRC Sections 3101, 3111, and 3402), Form 940 (annual FUTA tax return under IRC Sections 3301-3311), W-2/W-3 (annual wage and tax statements under IRC Section 6051), and 1099-NEC/MISC (nonemployee compensation and miscellaneous income under IRC Sections 6041 and 6041A). We also prepare amended returns (941-X and 940-X).",
  },
  {
    q: "What are the current FICA tax rates?",
    a: "For 2024, FICA consists of Social Security tax at 6.2% on wages up to $168,600 (both employer and employee share, per IRC Sections 3111 and 3121) and Medicare tax at 1.45% with no wage cap. An Additional Medicare Tax of 0.9% applies to employee wages exceeding $200,000 ($250,000 for married filing jointly) under IRC Section 3101(b)(2). The employer does not pay the additional Medicare tax.",
  },
  {
    q: "What is the difference between a W-2 employee and a 1099 contractor?",
    a: "A W-2 employee is subject to employer withholding of income tax, Social Security, and Medicare (reported on Form W-2 under IRC Section 6051). A 1099 independent contractor receives payment without withholding and is responsible for their own self-employment taxes. Misclassification can result in significant penalties. We help ensure proper classification.",
  },
  {
    q: "Can you file amended payroll returns (941-X / 940-X)?",
    a: "Yes. We prepare Form 941-X (Adjusted Employer's Quarterly Federal Tax Return) and Form 940-X to correct errors on previously filed returns, claim refunds, or adjust tax credits. This includes corrections for wages, tips, taxes withheld, and credit claims.",
  },
  {
    q: "What happens if I miss a payroll tax deadline?",
    a: "Missing payroll tax deadlines can result in failure-to-deposit penalties under IRC Section 6656 (2% to 15% depending on how late), failure-to-file penalties under IRC Section 6651, and potential Trust Fund Recovery Penalty (IRC Section 6672) for responsible persons. We help resolve delinquent filings and negotiate penalty abatement when possible.",
  },
  {
    q: "Do you handle state payroll tax filings?",
    a: "Yes. In addition to federal payroll tax returns, we prepare state withholding returns, state unemployment (SUI/SUTA) filings, and state-specific reports. As an IRS Enrolled Agent authorized to practice in all 50 states, we ensure compliance across jurisdictions.",
  },
];

export default function PayrollTaxPage() {
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
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wide">Payroll Tax Services</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Payroll Tax Services
            </h1>
            <p className="text-xl text-navy-200 mb-8">
              Complete payroll tax compliance — Form 941/940 filings, W-2/W-3 and 1099 processing,
              FICA calculations, and amended return preparation. Stay compliant and avoid costly
              penalties with {SITE_CONFIG.owner}, {SITE_CONFIG.credential}.
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
            {/* Core Filings */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Payroll Tax Filing Services
              </h2>

              <div className="space-y-6">
                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center flex-shrink-0">
                      <ClipboardList className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy-500 mb-2">
                        Form 941 — Employer&apos;s Quarterly Federal Tax Return
                      </h3>
                      <p className="text-xs font-medium text-teal-600 mb-3">IRC Sections 3101, 3111, 3402</p>
                      <p className="text-gray-600 mb-4">
                        Filed quarterly to report income taxes withheld from employees&apos; pay, the
                        employer and employee shares of Social Security and Medicare taxes
                        (<strong>IRC Section 3101</strong> — employee share; <strong>IRC Section 3111</strong>{" "}
                        — employer share), and federal income tax withholding (<strong>IRC Section 3402</strong>).
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-navy-500 text-sm mb-2">Quarterly Deadlines</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-gray-600">
                          <div><strong>Q1:</strong> April 30</div>
                          <div><strong>Q2:</strong> July 31</div>
                          <div><strong>Q3:</strong> October 31</div>
                          <div><strong>Q4:</strong> January 31</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy-500 mb-2">
                        Form 940 — Employer&apos;s Annual FUTA Tax Return
                      </h3>
                      <p className="text-xs font-medium text-teal-600 mb-3">IRC Sections 3301–3311</p>
                      <p className="text-gray-600 mb-4">
                        Filed annually to report Federal Unemployment Tax Act (FUTA) taxes under
                        <strong> IRC Sections 3301 through 3311</strong>. The FUTA tax rate is 6.0% on the
                        first $7,000 of each employee&apos;s annual wages, with a credit of up to 5.4% for
                        state unemployment taxes paid, resulting in an effective rate of 0.6%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Wage Reporting */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Wage &amp; Information Reporting
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="font-bold text-navy-500 mb-2">W-2 / W-3 Processing</h3>
                  <p className="text-xs font-medium text-teal-600 mb-3">IRC Section 6051</p>
                  <p className="text-gray-600 text-sm mb-3">
                    Annual wage and tax statements for each employee under <strong>IRC Section 6051</strong>.
                    We prepare individual W-2s and the transmittal Form W-3 for Social Security Administration
                    filing.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Due to employees by January 31</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>SSA e-filing available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>W-2c corrections as needed</span>
                    </li>
                  </ul>
                </div>

                <div className="card">
                  <h3 className="font-bold text-navy-500 mb-2">1099-NEC / 1099-MISC</h3>
                  <p className="text-xs font-medium text-teal-600 mb-3">IRC Sections 6041, 6041A</p>
                  <p className="text-gray-600 text-sm mb-3">
                    Information returns for nonemployee compensation (<strong>IRC Section 6041A</strong>)
                    and miscellaneous income (<strong>IRC Section 6041</strong>). Required for payments
                    of $600 or more to independent contractors.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>1099-NEC due January 31</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>1099-MISC due February 28 (March 31 e-file)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>1096 transmittal form included</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* FICA Details */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                FICA Tax Rates &amp; Thresholds (2024)
              </h2>

              <div className="card">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 pr-4 font-bold text-navy-500">Tax Component</th>
                        <th className="text-left py-3 pr-4 font-bold text-navy-500">Rate</th>
                        <th className="text-left py-3 pr-4 font-bold text-navy-500">Wage Base</th>
                        <th className="text-left py-3 font-bold text-navy-500">Authority</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b border-gray-100">
                        <td className="py-3 pr-4">Social Security (Employee)</td>
                        <td className="py-3 pr-4">6.2%</td>
                        <td className="py-3 pr-4">$168,600</td>
                        <td className="py-3">IRC Section 3101</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 pr-4">Social Security (Employer)</td>
                        <td className="py-3 pr-4">6.2%</td>
                        <td className="py-3 pr-4">$168,600</td>
                        <td className="py-3">IRC Section 3111</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 pr-4">Medicare (Employee)</td>
                        <td className="py-3 pr-4">1.45%</td>
                        <td className="py-3 pr-4">No cap</td>
                        <td className="py-3">IRC Section 3101</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 pr-4">Medicare (Employer)</td>
                        <td className="py-3 pr-4">1.45%</td>
                        <td className="py-3 pr-4">No cap</td>
                        <td className="py-3">IRC Section 3111</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 pr-4 font-semibold text-navy-500">Additional Medicare (Employee only)</td>
                        <td className="py-3 pr-4 font-semibold">0.9%</td>
                        <td className="py-3 pr-4">&gt;$200K / $250K MFJ</td>
                        <td className="py-3">IRC Section 3101(b)(2)</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4">FUTA (Employer only)</td>
                        <td className="py-3 pr-4">0.6% (effective)</td>
                        <td className="py-3 pr-4">$7,000</td>
                        <td className="py-3">IRC Sections 3301–3311</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  The Additional Medicare Tax of 0.9% applies only to the employee share and is not
                  matched by the employer. It applies to wages exceeding $200,000 (single) or $250,000
                  (married filing jointly) under IRC Section 3101(b)(2). Wages are defined under IRC
                  Section 3121.
                </p>
              </div>
            </section>

            {/* Amended Returns */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Amended Payroll Returns
              </h2>
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy-500 mb-2">Form 941-X &amp; Form 940-X</h3>
                    <p className="text-gray-600 mb-4">
                      If errors were made on previously filed payroll returns, we prepare amended returns
                      to correct wages, taxes, credits, and withholding. This includes:
                    </p>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>Form 941-X — Adjusted Employer&apos;s Quarterly Federal Tax Return</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>Form 940-X — Amended Employer&apos;s Annual FUTA Tax Return</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>Claim refunds for overpaid taxes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>Correct worker classification errors</span>
                      </li>
                    </ul>
                  </div>
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
                <Link href="/services/business" className="card group">
                  <h3 className="font-bold text-navy-500 group-hover:text-teal-500 transition-colors mb-1">
                    Business Tax Preparation
                  </h3>
                  <p className="text-gray-600 text-sm">
                    C-Corp, S-Corp, Partnership, and Non-Profit tax return preparation.
                  </p>
                  <span className="inline-flex items-center text-teal-500 text-sm font-medium mt-2">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
                <Link href="/services/tax-debt" className="card group">
                  <h3 className="font-bold text-navy-500 group-hover:text-teal-500 transition-colors mb-1">
                    Tax Debt Resolution
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Resolve payroll tax debt including trust fund recovery penalties.
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
                  <Calculator className="w-8 h-8 text-teal-500" />
                </div>
                <h3 className="text-xl font-bold text-navy-500 mb-2">Payroll Tax Help</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Stay compliant with expert payroll tax preparation from {SITE_CONFIG.owner},{" "}
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
                <h4 className="font-bold text-navy-500 mb-3">Services Include</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Quarterly 941 preparation and filing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Annual 940 FUTA return</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>W-2 and 1099 processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Worker classification review</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Amended return preparation</span>
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
          <h2 className="text-2xl font-bold mb-4">Need Payroll Tax Help?</h2>
          <p className="text-teal-100 mb-6">
            Stay compliant with expert payroll tax services from {SITE_CONFIG.owner}, {SITE_CONFIG.credential}.
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
