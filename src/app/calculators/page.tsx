import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight, CheckCircle, Calendar } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Free Tax Calculators | Clear Tax Solutions",
  description:
    "15 free tax calculators — federal income tax, self-employment tax, capital gains, EITC, child tax credit, Section 179, QBI deduction, and more. Get instant estimates for 2024.",
};

const CALCULATORS = [
  {
    title: "Federal Income Tax",
    slug: "federal-income-tax",
    description: "Calculate your 2024 federal income tax using official brackets for all filing statuses.",
    irc: "IRC § 1",
    category: "Income Tax",
  },
  {
    title: "Self-Employment Tax",
    slug: "self-employment-tax",
    description: "Estimate Social Security and Medicare taxes on your self-employment income.",
    irc: "IRC §§ 1401, 1402",
    category: "Income Tax",
  },
  {
    title: "Estimated Quarterly Tax",
    slug: "estimated-quarterly-tax",
    description: "Determine quarterly estimated payments and safe harbor thresholds to avoid penalties.",
    irc: "IRC § 6654",
    category: "Planning",
  },
  {
    title: "Capital Gains Tax",
    slug: "capital-gains-tax",
    description: "Compare short-term vs. long-term capital gains rates including the 3.8% NIIT.",
    irc: "IRC §§ 1(h), 1221",
    category: "Income Tax",
  },
  {
    title: "Standard vs. Itemized Deductions",
    slug: "standard-vs-itemized",
    description: "See whether standard or itemized deductions save you more — with SALT cap analysis.",
    irc: "IRC §§ 63, 164, 170",
    category: "Deductions",
  },
  {
    title: "Section 179 Deduction",
    slug: "section-179",
    description: "Calculate first-year equipment deductions with 2024 limits and phase-out thresholds.",
    irc: "IRC § 179",
    category: "Business",
  },
  {
    title: "QBI Deduction (Section 199A)",
    slug: "qbi-deduction",
    description: "Estimate your Qualified Business Income deduction with W-2 wage and SSTB limitations.",
    irc: "IRC § 199A",
    category: "Business",
  },
  {
    title: "W-4 Withholding",
    slug: "w4-withholding",
    description: "Optimize your W-4 to avoid over- or under-withholding from your paycheck.",
    irc: "IRC § 3402",
    category: "Planning",
  },
  {
    title: "Retirement Contributions",
    slug: "retirement-contributions",
    description: "See 2024 max contributions for 401(k), IRA, SEP, and SIMPLE plans with catch-up limits.",
    irc: "IRC §§ 219, 401(k), 415",
    category: "Planning",
  },
  {
    title: "Penalty & Interest",
    slug: "penalty-interest",
    description: "Estimate failure-to-file, failure-to-pay penalties, and IRS underpayment interest.",
    irc: "IRC §§ 6601, 6651",
    category: "IRS Issues",
  },
  {
    title: "Child Tax Credit",
    slug: "child-tax-credit",
    description: "Calculate your CTC with phase-out analysis and Additional Child Tax Credit refundable portion.",
    irc: "IRC § 24",
    category: "Credits",
  },
  {
    title: "Earned Income Tax Credit",
    slug: "earned-income-credit",
    description: "Determine your EITC eligibility and amount based on income, filing status, and dependents.",
    irc: "IRC § 32",
    category: "Credits",
  },
  {
    title: "Alternative Minimum Tax",
    slug: "amt",
    description: "Check if you owe AMT by comparing regular tax to tentative minimum tax with exemptions.",
    irc: "IRC §§ 55, 56, 57",
    category: "Income Tax",
  },
  {
    title: "MACRS Depreciation",
    slug: "macrs-depreciation",
    description: "Generate full depreciation schedules for 3- to 39-year assets with 2024 bonus depreciation.",
    irc: "IRC § 168",
    category: "Business",
  },
  {
    title: "Payroll Tax",
    slug: "payroll-tax",
    description: "Calculate employer and employee FICA, Medicare, and FUTA obligations per employee.",
    irc: "IRC §§ 3101, 3111, 3301",
    category: "Business",
  },
];

const CATEGORIES = ["Income Tax", "Deductions", "Credits", "Business", "Planning", "IRS Issues"];

export default function CalculatorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-500/20 mb-6">
            <Calculator className="w-8 h-8 text-teal-300" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Free Tax Calculators
          </h1>
          <p className="text-xl text-navy-200 max-w-3xl mx-auto mb-8">
            15 professional-grade calculators built on current IRC code and 2024 tax rates.
            Get instant estimates — then book a free consultation with {SITE_CONFIG.owner},{" "}
            {SITE_CONFIG.credential}, for a precise analysis.
          </p>
          <Link href="/book" className="btn-primary text-lg px-8 py-4">
            <Calendar className="w-5 h-5 mr-2" />
            Book Free Consultation
          </Link>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "2024 Tax Year Data",
              "IRC Code Referenced",
              "Real-Time Calculations",
              "No Sign-Up Required",
            ].map((signal) => (
              <div key={signal} className="flex items-center gap-2 justify-center text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <span className="font-medium">{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Grid by Category */}
      <section className="section-padding">
        {CATEGORIES.map((category) => {
          const calcs = CALCULATORS.filter((c) => c.category === category);
          if (calcs.length === 0) return null;
          return (
            <div key={category} className="mb-12 last:mb-0">
              <h2 className="text-2xl font-bold text-navy-500 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-8 bg-teal-500 rounded-full" />
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {calcs.map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/calculators/${calc.slug}`}
                    className="card group flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors">
                        <Calculator className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">
                        {calc.irc}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-navy-500 mb-2 group-hover:text-teal-500 transition-colors">
                      {calc.title} Calculator
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{calc.description}</p>
                    <span className="inline-flex items-center text-teal-500 font-medium text-sm group-hover:gap-2 transition-all">
                      Open Calculator <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Disclaimer */}
      <section className="bg-gray-50 py-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500 text-center">
            <strong>Disclaimer:</strong> These calculators provide estimates based on 2024 federal tax
            law and are for educational purposes only. They do not constitute tax advice. Individual
            results depend on your complete tax situation. For a precise calculation and professional
            guidance, consult with {SITE_CONFIG.owner}, {SITE_CONFIG.credential}.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Precise Tax Analysis?</h2>
          <p className="text-teal-100 text-lg mb-8">
            Our calculators give great estimates, but your full tax picture requires professional
            review. Schedule a free consultation to maximize savings and ensure compliance.
          </p>
          <Link href="/book" className="btn-secondary text-lg px-8 py-4">
            <Calendar className="w-5 h-5 mr-2" />
            Book Your Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
