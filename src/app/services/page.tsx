import type { Metadata } from "next";
import Link from "next/link";
import { User, Building2, Shield, DollarSign, Users, TrendingUp, Landmark, ArrowRight, Calendar, CheckCircle } from "lucide-react";
import { SITE_CONFIG, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tax Services",
  description:
    "Full-service tax preparation, IRS audit representation, tax debt resolution, payroll, tax planning, and estate & trust services by IRS Enrolled Agent Joseph Gasana.",
};

const iconMap: Record<string, React.ReactNode> = {
  User: <User className="w-8 h-8" />,
  Building2: <Building2 className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
  DollarSign: <DollarSign className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  TrendingUp: <TrendingUp className="w-8 h-8" />,
  Landmark: <Landmark className="w-8 h-8" />,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Professional Tax Services
          </h1>
          <p className="text-xl text-navy-200 max-w-3xl mx-auto mb-8">
            From individual returns to complex business filings, IRS audit defense to tax debt
            resolution — {SITE_CONFIG.owner}, {SITE_CONFIG.credential}, provides expert guidance
            every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="btn-primary text-lg px-8 py-4">
              <Calendar className="w-5 h-5 mr-2" />
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "IRS Licensed Enrolled Agent",
              "All 50 States Covered",
              "Audit Representation Authorized",
              "Free Initial Consultation",
            ].map((signal) => (
              <div key={signal} className="flex items-center gap-2 justify-center text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <span className="font-medium">{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="section-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-500 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every service is backed by {SITE_CONFIG.owner}&apos;s expertise as an IRS Enrolled Agent
            (License No. {SITE_CONFIG.licenseNo}), authorized to represent taxpayers before the IRS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={service.href}
              className="card group flex flex-col"
            >
              <div className="w-14 h-14 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center mb-4 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                {iconMap[service.icon]}
              </div>
              <h3 className="text-xl font-bold text-navy-500 mb-2 group-hover:text-teal-500 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
              <span className="inline-flex items-center text-teal-500 font-medium group-hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Not Sure Which Service You Need?</h2>
          <p className="text-teal-100 text-lg mb-8">
            Schedule a free consultation and we&apos;ll help you determine the best path forward for
            your tax situation.
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
