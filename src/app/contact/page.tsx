import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${SITE_CONFIG.name} for professional tax preparation, IRS representation, and tax debt resolution. Call ${SITE_CONFIG.phone} or send us a message.`,
};

export default function ContactPage() {
  return (
    <>
      {/* ===== HEADER ===== */}
      <section className="gradient-navy">
        <div className="section-padding text-center">
          <span className="text-teal-300 font-semibold text-sm uppercase tracking-wider">
            Contact Us
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Get in Touch
          </h1>
          <p className="mt-4 text-navy-100 text-lg max-w-2xl mx-auto">
            Have a question about our services? Need help with a tax issue?
            We&apos;re here to help. Reach out and we&apos;ll respond within one
            business day.
          </p>
        </div>
      </section>

      {/* ===== CONTACT FORM + SIDEBAR ===== */}
      <section className="bg-gray-50">
        <div className="section-padding">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-navy-500 mb-6">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Office Info */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-navy-500 mb-4">
                  Office Information
                </h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href={`tel:${SITE_CONFIG.phone}`}
                      className="flex items-start gap-3 text-gray-700 hover:text-teal-500 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500 transition-colors">
                        <Phone className="w-5 h-5 text-teal-500 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="font-medium text-navy-500">Phone</p>
                        <p className="text-sm">{SITE_CONFIG.phone}</p>
                        <p className="text-xs text-teal-500">Click to call</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="flex items-start gap-3 text-gray-700 hover:text-teal-500 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500 transition-colors">
                        <Mail className="w-5 h-5 text-teal-500 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="font-medium text-navy-500">Email</p>
                        <p className="text-sm">{SITE_CONFIG.email}</p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-teal-500" />
                    </div>
                    <div>
                      <p className="font-medium text-navy-500">Address</p>
                      <p className="text-sm text-gray-700">
                        {SITE_CONFIG.address.street}
                        <br />
                        {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}{" "}
                        {SITE_CONFIG.address.zip}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-teal-500" />
                    </div>
                    <div>
                      <p className="font-medium text-navy-500">Office Hours</p>
                      <p className="text-sm text-gray-700">
                        Monday &ndash; Friday: 9:00 AM &ndash; 6:00 PM
                        <br />
                        Saturday: By Appointment
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Book CTA */}
              <div className="bg-navy-500 rounded-xl p-6 text-center text-white">
                <h3 className="text-lg font-bold mb-2">
                  Prefer a Scheduled Call?
                </h3>
                <p className="text-navy-200 text-sm mb-4">
                  Book a free 20-minute consultation with Joseph Gasana, EA.
                </p>
                <Link
                  href="/book"
                  className="btn-primary w-full justify-center"
                >
                  Book Free Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAP SECTION ===== */}
      <section className="bg-white">
        <div className="section-padding">
          <h2 className="text-2xl font-bold text-navy-500 mb-6 text-center">
            Find Our Office
          </h2>
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="bg-gray-100 text-center flex items-center justify-center h-[400px]">
              <div>
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">
                  Google Maps Embed Placeholder
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Replace with actual Google Maps embed URL
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
