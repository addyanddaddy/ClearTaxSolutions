import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  Calendar,
  CheckCircle,
  ArrowRight,
  Phone,
  ChevronDown,
  DollarSign,
  Home,
  Car,
  Building2,
  PiggyBank,
  Repeat,
  MapPin,
  Heart,
  Briefcase,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tax Planning & Strategy",
  description:
    "Proactive tax planning and strategy — retirement contributions (IRA, 401(k), SEP-IRA), Section 1031 exchanges, Opportunity Zones, home office and vehicle deductions, charitable giving, and entity structure optimization. IRS Enrolled Agent.",
};

const faqs = [
  {
    q: "What is the difference between tax preparation and tax planning?",
    a: "Tax preparation is filing your return after the tax year ends — it records what already happened. Tax planning is a proactive, year-round strategy to minimize your future tax liability through timing of income and deductions, retirement contributions, entity structure, and investment decisions. Both are essential, but planning is where the biggest savings occur.",
  },
  {
    q: "How much can I contribute to my 401(k) in 2024?",
    a: "Under IRC Section 402(g), the 2024 elective deferral limit for 401(k) plans is $23,000. If you are age 50 or older, you can make an additional catch-up contribution of $7,500, for a total of $30,500. For a Solo 401(k), you can also make employer contributions up to 25% of net self-employment earnings, for a combined maximum of $69,000 ($76,500 with catch-up).",
  },
  {
    q: "What is a Section 1031 exchange?",
    a: "Under IRC Section 1031, a like-kind exchange allows you to defer capital gains tax when you sell investment or business real property and reinvest the proceeds in similar property. The exchange must be completed within 180 days, and a qualified intermediary must hold the funds. This can defer significant tax on appreciated real estate.",
  },
  {
    q: "What are Opportunity Zones?",
    a: "Under IRC Section 1400Z-2, Qualified Opportunity Zones allow you to defer and potentially reduce capital gains by investing in designated low-income communities through a Qualified Opportunity Fund. If the investment is held for at least 10 years, any appreciation on the Opportunity Zone investment is tax-free.",
  },
  {
    q: "Can I deduct my home office expenses?",
    a: "Under IRC Section 280A, you can deduct home office expenses if you use a dedicated space regularly and exclusively for business. Self-employed individuals can use the simplified method ($5 per square foot, up to 300 sq ft) or the regular method (actual expenses prorated by business use percentage). W-2 employees generally cannot deduct home office expenses after the Tax Cuts and Jobs Act.",
  },
  {
    q: "Should I be an LLC, S-Corp, or sole proprietor?",
    a: "The answer depends on your income level, self-employment tax exposure, growth plans, and eligibility for the QBI deduction under IRC Section 199A. An S-Corp election can save significant self-employment tax for businesses with net income above approximately $50,000-$60,000. We model your specific situation to recommend the optimal structure.",
  },
];

export default function TaxPlanningPage() {
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
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wide">Tax Planning &amp; Strategy</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Tax Planning &amp; Strategy
            </h1>
            <p className="text-xl text-navy-200 mb-8">
              Proactive tax planning is the most powerful tool for reducing your tax burden. From
              retirement contributions and entity structure optimization to Section 1031 exchanges
              and Opportunity Zones — {SITE_CONFIG.owner}, {SITE_CONFIG.credential}, builds a
              customized strategy to keep more money in your pocket.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book" className="btn-primary text-lg px-8 py-4">
                <Calendar className="w-5 h-5 mr-2" />
                Start Planning Now
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
            {/* Retirement Planning */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Retirement Contribution Strategies
              </h2>

              <div className="space-y-6">
                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center flex-shrink-0">
                      <PiggyBank className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy-500 mb-2">Traditional &amp; Roth IRA</h3>
                      <p className="text-xs font-medium text-teal-600 mb-3">IRC Section 219 (Traditional) | IRC Section 408A (Roth)</p>
                      <p className="text-gray-600 mb-3">
                        Traditional IRA contributions under <strong>IRC Section 219</strong> may be tax-deductible,
                        reducing your current taxable income. Roth IRA contributions under <strong>IRC Section 408A</strong>{" "}
                        are made with after-tax dollars but grow and are withdrawn tax-free in retirement.
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600"><strong>2024 Limit:</strong> $7,000 ($8,000 if age 50+)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy-500 mb-2">401(k) Plans</h3>
                      <p className="text-xs font-medium text-teal-600 mb-3">IRC Section 402(g)</p>
                      <p className="text-gray-600 mb-3">
                        Employer-sponsored 401(k) plans allow pre-tax elective deferrals up to
                        <strong> $23,000</strong> in 2024 under <strong>IRC Section 402(g)</strong>, with
                        an additional <strong>$7,500 catch-up contribution</strong> for those age 50 and
                        older (total: $30,500).
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>Traditional 401(k) — pre-tax contributions, tax-deferred growth</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>Roth 401(k) — after-tax contributions, tax-free withdrawals</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy-500 mb-2">SIMPLE IRA &amp; SEP-IRA</h3>
                      <p className="text-xs font-medium text-teal-600 mb-3">IRC Section 408(p) (SIMPLE) | IRC Section 408(k) (SEP)</p>
                      <p className="text-gray-600 mb-3">
                        SIMPLE IRA under <strong>IRC Section 408(p)</strong> allows employee deferrals plus
                        employer match for small businesses. SEP-IRA under <strong>IRC Section 408(k)</strong>{" "}
                        allows employer contributions of up to <strong>25% of compensation</strong> or
                        <strong> $69,000</strong> (whichever is less) for 2024.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy-500 mb-2">Solo 401(k)</h3>
                      <p className="text-xs font-medium text-teal-600 mb-3">IRC Sections 402(g), 415(c)</p>
                      <p className="text-gray-600 mb-3">
                        For self-employed individuals with no employees. Combines employee deferrals
                        ($23,000 + $7,500 catch-up) with employer profit-sharing contributions up to 25%
                        of net self-employment earnings, for a combined maximum of <strong>$69,000</strong>{" "}
                        ($76,500 with catch-up).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Deduction Strategies */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Deduction &amp; Credit Strategies
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                  <div className="flex items-center gap-3 mb-3">
                    <Home className="w-6 h-6 text-teal-500" />
                    <h3 className="font-bold text-navy-500">Home Office Deduction</h3>
                  </div>
                  <p className="text-xs font-medium text-teal-600 mb-2">IRC Section 280A</p>
                  <p className="text-gray-600 text-sm">
                    Deduct expenses for business use of your home — including mortgage interest,
                    utilities, insurance, and depreciation. Regular and exclusive use required.
                  </p>
                </div>

                <div className="card">
                  <div className="flex items-center gap-3 mb-3">
                    <Car className="w-6 h-6 text-teal-500" />
                    <h3 className="font-bold text-navy-500">Vehicle Deduction</h3>
                  </div>
                  <p className="text-xs font-medium text-teal-600 mb-2">IRC Section 179 | 67 cents/mile (2024)</p>
                  <p className="text-gray-600 text-sm">
                    Deduct business vehicle expenses using the standard mileage rate (67 cents per mile
                    for 2024) or actual expenses. Section 179 expensing available for qualifying vehicles.
                  </p>
                </div>

                <div className="card">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="w-6 h-6 text-teal-500" />
                    <h3 className="font-bold text-navy-500">Charitable Giving</h3>
                  </div>
                  <p className="text-xs font-medium text-teal-600 mb-2">IRC Sections 170, 664, 507, 4942</p>
                  <p className="text-gray-600 text-sm">
                    Maximize charitable deductions through direct giving, donor-advised funds,
                    charitable remainder trusts (<strong>IRC Section 664</strong>), and qualified
                    charitable distributions from IRAs.
                  </p>
                </div>

                <div className="card">
                  <div className="flex items-center gap-3 mb-3">
                    <Building2 className="w-6 h-6 text-teal-500" />
                    <h3 className="font-bold text-navy-500">Entity Structure Optimization</h3>
                  </div>
                  <p className="text-xs font-medium text-teal-600 mb-2">IRC Section 199A (QBI)</p>
                  <p className="text-gray-600 text-sm">
                    Evaluate LLC vs. S-Corp vs. C-Corp to optimize self-employment tax, QBI deduction
                    eligibility, and overall tax efficiency based on your income level and goals.
                  </p>
                </div>
              </div>
            </section>

            {/* Investment Tax Strategies */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Investment Tax Strategies
              </h2>

              <div className="space-y-6">
                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center flex-shrink-0">
                      <Repeat className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy-500 mb-2">Section 1031 Like-Kind Exchange</h3>
                      <p className="text-xs font-medium text-teal-600 mb-3">IRC Section 1031</p>
                      <p className="text-gray-600 mb-3">
                        Defer capital gains tax on the sale of investment or business real property by
                        reinvesting proceeds into like-kind property under <strong>IRC Section 1031</strong>.
                        The exchange must be completed within 180 days using a qualified intermediary.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>45-day identification period for replacement property</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>180-day completion deadline</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>Available for real property only (after TCJA)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy-500 mb-2">Qualified Opportunity Zones</h3>
                      <p className="text-xs font-medium text-teal-600 mb-3">IRC Section 1400Z-2</p>
                      <p className="text-gray-600 mb-3">
                        Invest capital gains into designated Qualified Opportunity Zones through a
                        Qualified Opportunity Fund (QOF) under <strong>IRC Section 1400Z-2</strong>.
                        Benefits include deferral of the original gain and potential tax-free appreciation.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>Defer capital gains by investing in a QOF</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>Hold 10+ years for tax-free appreciation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span>180-day investment window from gain realization</span>
                        </li>
                      </ul>
                    </div>
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
                <Link href="/services/individual" className="card group">
                  <h3 className="font-bold text-navy-500 group-hover:text-teal-500 transition-colors mb-1">
                    Individual Tax Preparation
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Expert preparation to implement your tax planning strategies.
                  </p>
                  <span className="inline-flex items-center text-teal-500 text-sm font-medium mt-2">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
                <Link href="/services/estate-trust" className="card group">
                  <h3 className="font-bold text-navy-500 group-hover:text-teal-500 transition-colors mb-1">
                    Estate &amp; Trust Tax
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Estate and gift tax planning for wealth transfer strategies.
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
                  <TrendingUp className="w-8 h-8 text-teal-500" />
                </div>
                <h3 className="text-xl font-bold text-navy-500 mb-2">Start Saving Now</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Build a customized tax plan with {SITE_CONFIG.owner}, {SITE_CONFIG.credential}.
                </p>
                <Link href="/book" className="btn-primary w-full mb-3">
                  Book Planning Session
                </Link>
                <a href={`tel:${SITE_CONFIG.phone}`} className="btn-outline w-full">
                  <Phone className="w-4 h-4 mr-1" />
                  Call Now
                </a>
              </div>

              <div className="card bg-gray-50">
                <h4 className="font-bold text-navy-500 mb-3">Planning Includes</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Year-round tax advisory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Retirement contribution optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Entity structure analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Investment tax strategy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Estimated tax projections</span>
                  </li>
                </ul>
              </div>

              <div className="card bg-navy-500 text-white">
                <p className="text-sm text-navy-200 mb-1">Your Tax Strategist</p>
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
          <h2 className="text-2xl font-bold mb-4">Ready to Build Your Tax Plan?</h2>
          <p className="text-teal-100 mb-6">
            Get a customized strategy from {SITE_CONFIG.owner}, {SITE_CONFIG.credential}.
          </p>
          <Link href="/book" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
            <Calendar className="w-5 h-5 mr-2" />
            Book Planning Session
          </Link>
        </div>
      </section>
    </>
  );
}
