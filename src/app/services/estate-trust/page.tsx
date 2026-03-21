import type { Metadata } from "next";
import Link from "next/link";
import {
  Landmark,
  Calendar,
  CheckCircle,
  ArrowRight,
  Phone,
  ChevronDown,
  FileText,
  Gift,
  Scale,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Estate & Trust Tax",
  description:
    "Estate and trust tax services — Form 1041 filings (IRC Sections 641-685), estate tax Form 706, gift tax Form 709, grantor trusts, QTIP trusts, and distributable net income planning. IRS Enrolled Agent.",
};

const faqs = [
  {
    q: "What is Form 1041 and when is it required?",
    a: "Form 1041 is the U.S. Income Tax Return for Estates and Trusts, governed by IRC Sections 641 through 685. It is required when an estate or trust has gross income of $600 or more, any taxable income, or a beneficiary who is a nonresident alien. The return reports income earned by the estate or trust and determines how much is taxable at the entity level versus passed through to beneficiaries.",
  },
  {
    q: "What is the 2024 estate tax exemption?",
    a: "The federal estate tax exemption for 2024 is $13,610,000 per individual under IRC Section 2001. Estates valued below this threshold generally owe no federal estate tax. The exemption is portable between spouses (DSUE — Deceased Spousal Unused Exclusion). Note: This elevated exemption is scheduled to sunset after 2025, potentially reverting to approximately $6-7 million.",
  },
  {
    q: "What is the annual gift tax exclusion for 2024?",
    a: "Under IRC Section 2501, the annual gift tax exclusion for 2024 is $18,000 per recipient ($36,000 for married couples electing gift-splitting). Gifts within the exclusion do not require filing Form 709 and do not reduce your lifetime estate tax exemption. Gifts exceeding the annual exclusion require a gift tax return but generally reduce your lifetime exemption rather than triggering current tax.",
  },
  {
    q: "What is Distributable Net Income (DNI)?",
    a: "Distributable Net Income (DNI) under IRC Section 643 determines the maximum amount of trust or estate income that can be taxed to beneficiaries and deducted by the entity. It serves as a ceiling on the distribution deduction and prevents double taxation of income between the entity and its beneficiaries.",
  },
  {
    q: "What is a grantor trust?",
    a: "Under IRC Sections 671 through 679, a grantor trust is a trust where the grantor retains certain powers or interests that cause the trust income to be taxed to the grantor personally, rather than to the trust. Common grantor trust triggers include the power to revoke the trust, borrow without adequate security, or control beneficial enjoyment. Revocable living trusts are the most common example.",
  },
  {
    q: "What is a QTIP trust?",
    a: "A Qualified Terminable Interest Property (QTIP) trust under IRC Section 2056(b)(7) allows a spouse to provide income to the surviving spouse for life while controlling the ultimate disposition of the trust assets. The QTIP election qualifies the transfer for the unlimited marital deduction, deferring estate tax until the surviving spouse's death.",
  },
];

export default function EstateTrustPage() {
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
              <Landmark className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wide">Estate &amp; Trust Tax</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Estate &amp; Trust Tax Services
            </h1>
            <p className="text-xl text-navy-200 mb-8">
              Expert preparation of Form 1041 trust and estate income tax returns, Form 706 estate
              tax returns, and Form 709 gift tax returns. Navigating IRC Sections 641 through 685
              with precision — {SITE_CONFIG.owner}, {SITE_CONFIG.credential}, ensures compliance
              and tax efficiency for fiduciaries and beneficiaries.
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
            {/* Income Tax Returns */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Trust &amp; Estate Income Tax
              </h2>

              <div className="space-y-6">
                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy-500 mb-2">
                        Form 1041 — U.S. Income Tax Return for Estates and Trusts
                      </h3>
                      <p className="text-xs font-medium text-teal-600 mb-3">IRC Sections 641–685</p>
                      <p className="text-gray-600 mb-4">
                        Form 1041 reports income, deductions, gains, and losses of estates and trusts
                        governed by <strong>IRC Sections 641 through 685</strong>. The return determines
                        how much income is taxable at the entity level (at compressed trust tax rates) and
                        how much passes through to beneficiaries via Schedule K-1.
                      </p>
                      <ul className="space-y-2 text-gray-600 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>Simple and complex trust returns</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>Decedent estate income tax returns</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>Schedule K-1 preparation for beneficiaries</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>Final year returns with Section 645 elections</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-xl font-bold text-navy-500 mb-2">
                    Distributable Net Income (DNI)
                  </h3>
                  <p className="text-xs font-medium text-teal-600 mb-3">IRC Section 643</p>
                  <p className="text-gray-600">
                    <strong>DNI under IRC Section 643</strong> is the cornerstone of trust and estate
                    taxation. It determines the maximum distribution deduction for the entity and the
                    maximum amount taxable to beneficiaries. Proper DNI calculation prevents double
                    taxation and optimizes the allocation of income between the entity and its
                    beneficiaries. We analyze the character of each income component — ordinary income,
                    capital gains, tax-exempt interest — to maximize tax efficiency.
                  </p>
                </div>
              </div>
            </section>

            {/* Estate & Gift Tax */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Estate &amp; Gift Tax Returns
              </h2>

              <div className="space-y-6">
                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center flex-shrink-0">
                      <Scale className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy-500 mb-2">
                        Form 706 — United States Estate Tax Return
                      </h3>
                      <p className="text-xs font-medium text-teal-600 mb-3">IRC Section 2001</p>
                      <p className="text-gray-600 mb-4">
                        Form 706 is required for estates exceeding the federal estate tax exemption under
                        <strong> IRC Section 2001</strong>. For 2024, the exemption is
                        <strong> $13,610,000</strong> per individual.
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-navy-500 text-sm mb-2">2024 Estate Tax Key Numbers</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                          <div>
                            <strong>Exemption:</strong> $13,610,000
                          </div>
                          <div>
                            <strong>Top Rate:</strong> 40%
                          </div>
                          <div>
                            <strong>Portability:</strong> Available (DSUE)
                          </div>
                          <div>
                            <strong>Filing Deadline:</strong> 9 months after death
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2 text-gray-600 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>Gross estate valuation and asset inventory</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>Marital and charitable deduction planning</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>Portability election (DSUE) for surviving spouse</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>Alternate valuation date elections</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center flex-shrink-0">
                      <Gift className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy-500 mb-2">
                        Form 709 — United States Gift Tax Return
                      </h3>
                      <p className="text-xs font-medium text-teal-600 mb-3">IRC Section 2501</p>
                      <p className="text-gray-600 mb-4">
                        Form 709 reports taxable gifts exceeding the annual exclusion under
                        <strong> IRC Section 2501</strong>. For 2024, the annual exclusion is
                        <strong> $18,000</strong> per recipient ($36,000 for married couples
                        electing gift-splitting).
                      </p>
                      <ul className="space-y-2 text-gray-600 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>Gift-splitting elections for married couples</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>Generation-skipping transfer (GST) tax reporting</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>Charitable gift reporting</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>Lifetime exemption tracking</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Trust Types */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Trust Types We Handle
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="font-bold text-navy-500 mb-2">Grantor Trusts</h3>
                  <p className="text-xs font-medium text-teal-600 mb-2">IRC Sections 671–679</p>
                  <p className="text-gray-600 text-sm">
                    Trusts where the grantor retains sufficient control causing trust income to be taxed
                    to the grantor. Includes revocable living trusts, intentionally defective grantor
                    trusts (IDGTs), and retained interest trusts.
                  </p>
                </div>

                <div className="card">
                  <h3 className="font-bold text-navy-500 mb-2">QTIP Trusts</h3>
                  <p className="text-xs font-medium text-teal-600 mb-2">IRC Section 2056(b)(7)</p>
                  <p className="text-gray-600 text-sm">
                    Qualified Terminable Interest Property trusts provide income to the surviving spouse
                    while preserving the grantor&apos;s control over the ultimate distribution of assets.
                    Qualifies for the unlimited marital deduction.
                  </p>
                </div>

                <div className="card">
                  <h3 className="font-bold text-navy-500 mb-2">Irrevocable Trusts</h3>
                  <p className="text-xs font-medium text-teal-600 mb-2">IRC Sections 641–685</p>
                  <p className="text-gray-600 text-sm">
                    Irrevocable trusts that are separate taxable entities. We optimize distributions
                    to minimize the impact of compressed trust tax brackets (37% rate applies at
                    income over $14,450 for 2024).
                  </p>
                </div>

                <div className="card">
                  <h3 className="font-bold text-navy-500 mb-2">Charitable Trusts</h3>
                  <p className="text-xs font-medium text-teal-600 mb-2">IRC Sections 664, 507, 4942</p>
                  <p className="text-gray-600 text-sm">
                    Charitable remainder trusts (CRTs) and charitable lead trusts (CLTs) that provide
                    income tax deductions while benefiting charitable organizations. Complex
                    distribution and reporting requirements.
                  </p>
                </div>
              </div>
            </section>

            {/* Executor/Trustee Intake Form */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Executor &amp; Trustee Intake
              </h2>
              <div className="card">
                <p className="text-gray-600 mb-6">
                  If you are an executor, personal representative, or trustee needing tax filing
                  assistance, provide your details below for a free consultation.
                </p>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label-text">Your Full Name *</label>
                      <input type="text" className="input-field" placeholder="Executor/Trustee name" required />
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
                  <div>
                    <label className="label-text">Your Role *</label>
                    <select className="input-field" required>
                      <option value="">Select your role</option>
                      <option value="executor">Executor / Personal Representative</option>
                      <option value="trustee">Trustee</option>
                      <option value="successor-trustee">Successor Trustee</option>
                      <option value="beneficiary">Beneficiary</option>
                      <option value="attorney">Attorney / Legal Counsel</option>
                    </select>
                  </div>
                  <div>
                    <label className="label-text">Filing Needed</label>
                    <select className="input-field">
                      <option value="">Select filing type</option>
                      <option value="1041">Form 1041 — Trust/Estate Income Tax</option>
                      <option value="706">Form 706 — Estate Tax Return</option>
                      <option value="709">Form 709 — Gift Tax Return</option>
                      <option value="multiple">Multiple filings needed</option>
                      <option value="unsure">Not sure — need guidance</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label-text">Estate/Trust Name</label>
                      <input type="text" className="input-field" placeholder="Name of estate or trust" />
                    </div>
                    <div>
                      <label className="label-text">Estimated Estate Value</label>
                      <select className="input-field">
                        <option value="">Select range</option>
                        <option value="under-1m">Under $1,000,000</option>
                        <option value="1m-5m">$1,000,000 - $5,000,000</option>
                        <option value="5m-13m">$5,000,000 - $13,610,000</option>
                        <option value="over-13m">Over $13,610,000</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="label-text">Additional Details</label>
                    <textarea className="input-field" rows={4} placeholder="Describe your estate or trust situation..." />
                  </div>
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Request Free Consultation
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
                <Link href="/services/tax-planning" className="card group">
                  <h3 className="font-bold text-navy-500 group-hover:text-teal-500 transition-colors mb-1">
                    Tax Planning &amp; Strategy
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Proactive strategies for estate planning and wealth transfer.
                  </p>
                  <span className="inline-flex items-center text-teal-500 text-sm font-medium mt-2">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
                <Link href="/services/individual" className="card group">
                  <h3 className="font-bold text-navy-500 group-hover:text-teal-500 transition-colors mb-1">
                    Individual Tax Preparation
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Personal returns for beneficiaries receiving K-1 distributions.
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
                  <Landmark className="w-8 h-8 text-teal-500" />
                </div>
                <h3 className="text-xl font-bold text-navy-500 mb-2">Estate &amp; Trust Help</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get expert fiduciary tax assistance from {SITE_CONFIG.owner}, {SITE_CONFIG.credential}.
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
                <h4 className="font-bold text-navy-500 mb-3">We Prepare</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Form 1041 — Trust &amp; estate income tax</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Form 706 — Federal estate tax</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Form 709 — Gift tax returns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Schedule K-1 for beneficiaries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>DNI and distribution planning</span>
                  </li>
                </ul>
              </div>

              <div className="card bg-amber-50 border-amber-200">
                <h4 className="font-bold text-navy-500 mb-2">Sunset Alert</h4>
                <p className="text-sm text-gray-600">
                  The current $13.61M estate tax exemption is set to sunset after 2025. Planning now
                  is critical to protect your estate.{" "}
                  <Link href="/book" className="text-teal-500 font-semibold underline">
                    Schedule a planning session
                  </Link>.
                </p>
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
          <h2 className="text-2xl font-bold mb-4">Need Estate or Trust Tax Help?</h2>
          <p className="text-teal-100 mb-6">
            Get expert fiduciary tax assistance from {SITE_CONFIG.owner}, {SITE_CONFIG.credential}.
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
