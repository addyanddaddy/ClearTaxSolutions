"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Building2,
  Shield,
  DollarSign,
  Users,
  TrendingUp,
  Landmark,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Star,
  ArrowRight,
  BadgeCheck,
  Scale,
  GraduationCap,
} from "lucide-react";
import { SERVICES, TRUST_SIGNALS, SERVICE_CATEGORIES, SITE_CONFIG } from "@/lib/constants";

const ICON_MAP: Record<string, React.ElementType> = {
  User,
  Building2,
  Shield,
  DollarSign,
  Users,
  TrendingUp,
  Landmark,
};

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    location: "Phoenix, AZ",
    text: "Joseph was incredibly thorough with my tax return. He found deductions I had missed for years and increased my refund significantly. I won't go anywhere else.",
    rating: 5,
  },
  {
    name: "David R.",
    location: "Scottsdale, AZ",
    text: "After receiving an IRS audit notice, I was terrified. Joseph handled everything and the audit was resolved in my favor. His knowledge of IRS procedures is unmatched.",
    rating: 5,
  },
  {
    name: "Maria L.",
    location: "Tempe, AZ",
    text: "As a small business owner, I needed someone who understood S-Corp tax strategy. Joseph saved my business thousands with proper tax planning. Highly recommend.",
    rating: 5,
  },
];

const FAQS = [
  {
    question: "What is an IRS Enrolled Agent and why does it matter?",
    answer:
      "An Enrolled Agent (EA) is a federally licensed tax professional authorized by the U.S. Department of the Treasury to represent taxpayers before all administrative levels of the IRS. Unlike CPAs or attorneys, EAs specialize exclusively in taxation and have unlimited representation rights nationwide.",
  },
  {
    question: "How much does a tax consultation cost?",
    answer:
      "Your initial 20-minute consultation is completely free. During this call, we'll discuss your tax situation, identify potential issues or opportunities, and outline a plan of action. There's no obligation to proceed.",
  },
  {
    question: "Can you help if I haven't filed taxes in several years?",
    answer:
      "Absolutely. We specialize in helping taxpayers who have unfiled returns. We'll work with the IRS on your behalf to file back returns, negotiate penalties, and get you back into compliance as painlessly as possible.",
  },
  {
    question: "Do you handle business taxes as well as individual returns?",
    answer:
      "Yes. We prepare tax returns for all entity types including sole proprietors (Schedule C), S-Corporations (Form 1120-S), C-Corporations (Form 1120), Partnerships (Form 1065), LLCs, and Non-Profit Organizations (Form 990).",
  },
  {
    question: "Can you represent me if I'm being audited by the IRS?",
    answer:
      "Yes. As an IRS Enrolled Agent, Joseph Gasana has unlimited practice rights before the IRS under 31 C.F.R. Part 10. This means he can represent you in correspondence audits, office audits, and field audits — you don't even need to be present.",
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    helpType: "",
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be added later
    alert("Thank you! We'll be in touch within 24 hours.");
  };

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="gradient-navy relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headline + CTAs */}
            <div className="animate-fade-in">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight text-balance">
                Stop Paying More Than You Owe.{" "}
                <span className="text-teal-300">
                  Get an IRS Enrolled Agent on Your Side.
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-navy-100 max-w-xl">
                Clear Tax Solutions — Individual &amp; Business Tax Prep, IRS
                Audit Defense, and Tax Debt Resolution. Licensed. Authorized.
                Local.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/book" className="btn-primary text-lg px-8 py-4">
                  Book Your Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a
                  href="#services"
                  className="btn-outline border-white text-white hover:bg-white hover:text-navy-500 text-lg px-8 py-4"
                >
                  See Our Services
                </a>
              </div>
            </div>

            {/* Right: Lead Capture Form */}
            <div className="animate-slide-up">
              <form
                onSubmit={handleFormSubmit}
                className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
              >
                <h2 className="text-xl font-bold text-navy-500 mb-1">
                  Get Started Today
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Fill out the form and we&apos;ll reach out within 24 hours.
                </p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="hero-name" className="label-text">
                      Full Name
                    </label>
                    <input
                      id="hero-name"
                      name="name"
                      type="text"
                      className="input-field"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="hero-email" className="label-text">
                      Email Address
                    </label>
                    <input
                      id="hero-email"
                      name="email"
                      type="email"
                      className="input-field"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="hero-phone" className="label-text">
                      Phone Number
                    </label>
                    <input
                      id="hero-phone"
                      name="phone"
                      type="tel"
                      className="input-field"
                      placeholder="(555) 000-0000"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="hero-help" className="label-text">
                      What do you need help with?
                    </label>
                    <select
                      id="hero-help"
                      name="helpType"
                      className="input-field"
                      value={formData.helpType}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select a service...</option>
                      {SERVICE_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn-primary w-full text-lg py-4">
                    Request Free Consultation
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center">
                  No spam. No obligation. 100% confidential.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="bg-navy-800/60 backdrop-blur-sm border-t border-navy-400/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              {TRUST_SIGNALS.map((signal) => (
                <div
                  key={signal}
                  className="flex items-center justify-center gap-2 text-sm text-navy-100"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICE SELECTOR CARDS ===== */}
      <section id="services" className="bg-gray-50">
        <div className="section-padding">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-teal-500 font-semibold text-sm uppercase tracking-wider">
              Our Services
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-500">
              Comprehensive Tax Solutions
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              From individual returns to complex IRS disputes, we handle every
              aspect of your tax situation with the authority of an IRS Enrolled
              Agent.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SERVICES.map((service) => {
              const IconComponent = ICON_MAP[service.icon];
              return (
                <Link key={service.slug} href={service.href} className="card group cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center mb-4 group-hover:bg-teal-500 transition-colors">
                    {IconComponent && (
                      <IconComponent className="w-6 h-6 text-teal-500 group-hover:text-white transition-colors" />
                    )}
                  </div>
                  <h3 className="font-bold text-navy-500 text-lg mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-teal-500 font-medium text-sm mt-4 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE AN EA SECTION ===== */}
      <section className="bg-white">
        <div className="section-padding">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-teal-500 font-semibold text-sm uppercase tracking-wider">
              Why an Enrolled Agent?
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-500">
              The Right Professional for Your Taxes
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Not all tax professionals are created equal. Here&apos;s how an
              IRS Enrolled Agent compares.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {/* EA Card */}
            <div className="card border-2 border-teal-500 relative">
              <div className="absolute -top-3 left-6 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                BEST VALUE
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
                  <BadgeCheck className="w-6 h-6 text-teal-500" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-500 text-lg">
                    Enrolled Agent (EA)
                  </h3>
                  <p className="text-sm text-teal-500 font-medium">
                    Federal License
                  </p>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  Federally licensed by U.S. Treasury
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  Unlimited representation rights before the IRS
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  Specializes exclusively in taxation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  Practice rights in all 50 states
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  Must pass rigorous IRS Special Enrollment Exam
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  72 hours of continuing education every 3 years
                </li>
              </ul>
            </div>

            {/* CPA Card */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-500 text-lg">CPA</h3>
                  <p className="text-sm text-gray-500 font-medium">
                    State License
                  </p>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  State-licensed (varies by state)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  Unlimited IRS representation rights
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  Broad accounting focus, not tax-specific
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  Practice limited to licensed states
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  Typically higher fees
                </li>
              </ul>
            </div>

            {/* Tax Attorney Card */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <Scale className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-500 text-lg">
                    Tax Attorney
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    State Bar License
                  </p>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  State bar licensed
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  Unlimited IRS representation rights
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  Best for criminal tax matters
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  Attorney-client privilege
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  Highest cost option
                </li>
              </ul>
            </div>
          </div>

          {/* Pull Quote */}
          <div className="bg-navy-50 border-l-4 border-teal-500 rounded-r-lg p-6 max-w-3xl mx-auto">
            <p className="text-navy-500 text-lg italic">
              &ldquo;Only three types of professionals have unlimited rights to
              represent taxpayers before the IRS: Enrolled Agents, CPAs, and
              Attorneys. Of these, only Enrolled Agents are required to
              demonstrate special competence in tax matters to the IRS.&rdquo;
            </p>
            <p className="text-gray-500 text-sm mt-2">
              — IRS.gov, Understanding Enrolled Agent Status
            </p>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="bg-gray-50">
        <div className="section-padding">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-teal-500 font-semibold text-sm uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-500">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div key={idx} className="card">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-navy-500">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ PREVIEW SECTION ===== */}
      <section className="bg-white">
        <div className="section-padding">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-teal-500 font-semibold text-sm uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-500">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-navy-500 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span>{faq.question}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-teal-500 flex-shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/contact"
              className="text-teal-500 font-medium hover:text-teal-600 transition-colors inline-flex items-center gap-1"
            >
              Have more questions? Contact us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="gradient-navy relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative section-padding text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-navy-100 text-lg max-w-2xl mx-auto mb-8">
            Schedule your free 20-minute consultation with an IRS Enrolled Agent
            today. No obligation, no pressure — just honest tax guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="btn-primary text-lg px-8 py-4">
              Book Your Free Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="btn-outline border-white text-white hover:bg-white hover:text-navy-500 text-lg px-8 py-4"
            >
              Call {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
