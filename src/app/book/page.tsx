import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Shield,
  CheckCircle2,
  Phone,
  BadgeCheck,
  MessageSquare,
  FileText,
  ArrowRight,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book a Free Tax Consultation",
  description: `Schedule your free 20-minute tax consultation with Joseph Gasana, IRS Enrolled Agent. No obligation — get expert guidance on tax preparation, IRS audits, and tax debt resolution.`,
};

const WHAT_TO_EXPECT = [
  {
    icon: MessageSquare,
    title: "Discussion of Your Tax Situation",
    description:
      "We'll listen to your specific tax needs — whether it's filing, an IRS notice, unfiled returns, or tax debt — and ask the right questions to understand your situation.",
  },
  {
    icon: FileText,
    title: "Initial Assessment & Recommendations",
    description:
      "Based on our conversation, we'll provide an honest assessment of your situation and outline potential solutions, including estimated timelines and what to expect.",
  },
  {
    icon: Calendar,
    title: "Clear Next Steps",
    description:
      "If you decide to work with us, we'll outline exactly what documents we need, what the process looks like, and provide a transparent fee quote. No surprises, no pressure.",
  },
];

const TRUST_ITEMS = [
  "IRS Licensed Enrolled Agent",
  "Authorized to represent you before the IRS",
  "All 50 states covered",
  "No obligation whatsoever",
  "100% confidential",
  "Circular 230 compliant",
];

export default function BookPage() {
  return (
    <>
      {/* ===== HEADER ===== */}
      <section className="gradient-navy">
        <div className="section-padding text-center">
          <span className="text-teal-300 font-semibold text-sm uppercase tracking-wider">
            Free Consultation
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Book Your Free 20-Minute Consultation
          </h1>
          <p className="mt-4 text-navy-100 text-lg max-w-2xl mx-auto">
            Get expert tax guidance from an IRS Enrolled Agent. No cost, no
            obligation — just honest answers about your tax situation.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-navy-100 text-sm">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-400" />
              20 Minutes
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-teal-400" />
              100% Free
            </span>
            <span className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-teal-400" />
              IRS Enrolled Agent
            </span>
          </div>
        </div>
      </section>

      {/* ===== BOOKING AREA + SIDEBAR ===== */}
      <section className="bg-gray-50">
        <div className="section-padding">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Booking Embed Area */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-navy-500 mb-2">
                  Select a Time
                </h2>
                <p className="text-gray-500 mb-6">
                  Choose a convenient time for your free consultation with
                  Joseph Gasana, EA.
                </p>

                {/* Cal.com / Calendly Embed Placeholder */}
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl min-h-[500px] flex items-center justify-center">
                  <div className="text-center p-8">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-600 mb-2">
                      Scheduling Calendar
                    </h3>
                    <p className="text-gray-400 max-w-sm mx-auto mb-4">
                      This area will display the Cal.com or Calendly booking
                      widget. Replace this placeholder with the embed script.
                    </p>
                    <div className="bg-gray-200 text-gray-500 text-sm font-mono px-4 py-2 rounded-lg inline-block">
                      &lt;!-- Cal.com embed goes here --&gt;
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-500 text-center">
                  Can&apos;t find a time that works?{" "}
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="text-teal-500 font-medium hover:text-teal-600"
                  >
                    Call us at {SITE_CONFIG.phone}
                  </a>
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trust Signals */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-navy-500 mb-4">
                  Why Book With Us
                </h3>
                <ul className="space-y-3">
                  {TRUST_ITEMS.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Credential Card */}
              <div className="bg-navy-500 rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-teal-300" />
                  </div>
                  <div>
                    <p className="font-bold">{SITE_CONFIG.owner}</p>
                    <p className="text-teal-300 text-sm">
                      {SITE_CONFIG.credential}
                    </p>
                  </div>
                </div>
                <p className="text-navy-200 text-sm leading-relaxed">
                  Licensed by the U.S. Department of the Treasury. Authorized to
                  represent taxpayers before all administrative levels of the
                  IRS.
                </p>
                <p className="text-navy-300 text-xs mt-3">
                  License No. {SITE_CONFIG.licenseNo}
                </p>
              </div>

              {/* Call CTA */}
              <div className="bg-teal-500 rounded-xl p-6 text-white text-center">
                <Phone className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-1">Prefer to Call?</h3>
                <p className="text-teal-100 text-sm mb-4">
                  Speak with us directly during business hours.
                </p>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="inline-flex items-center justify-center w-full bg-white text-teal-500 font-bold py-3 rounded-lg hover:bg-teal-50 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {SITE_CONFIG.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT TO EXPECT ===== */}
      <section className="bg-white">
        <div className="section-padding">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-teal-500 font-semibold text-sm uppercase tracking-wider">
              Your Consultation
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-500">
              What to Expect
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Your free 20-minute consultation is designed to give you clarity
              and confidence about your tax situation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {WHAT_TO_EXPECT.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-teal-500" />
                  </div>
                  <div className="bg-teal-500 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto -mt-2 mb-4 relative z-10 border-4 border-white">
                    {idx + 1}
                  </div>
                  <h3 className="font-bold text-navy-500 text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="gradient-navy">
        <div className="section-padding text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Take Control of Your Taxes?
          </h2>
          <p className="text-navy-100 text-lg max-w-2xl mx-auto mb-8">
            Don&apos;t wait until it&apos;s too late. Get expert tax guidance
            today — your free consultation is just one click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="btn-primary text-lg px-8 py-4">
              Schedule Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="btn-outline border-white text-white hover:bg-white hover:text-navy-500 text-lg px-8 py-4"
            >
              Contact Us Instead
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
