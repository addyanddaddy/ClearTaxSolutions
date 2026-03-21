import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, Mail, Phone, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Thank You",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <section className="min-h-[70vh] flex items-center">
      <div className="section-padding w-full">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center mx-auto mb-6 animate-fade-in">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-navy-500 mb-4 animate-fade-in">
            Thank You!
          </h1>
          <p className="text-lg text-gray-600 mb-8 animate-slide-up">
            We have received your information and will be in touch within 24
            hours.
          </p>

          {/* What to Expect */}
          <div className="bg-gray-50 rounded-xl p-6 sm:p-8 text-left mb-8 animate-slide-up">
            <h2 className="text-lg font-bold text-navy-500 mb-4">
              What to Expect Next
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-500 text-sm">
                    Confirmation Email
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Check your inbox for a confirmation of your inquiry. If you
                    do not see it, check your spam folder.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-500 text-sm">
                    Personal Follow-Up
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Joseph Gasana, EA, will personally review your inquiry and
                    reach out within 24 hours to discuss your tax situation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-500 text-sm">
                    Free Consultation
                  </h3>
                  <p className="text-gray-600 text-sm">
                    During your free 20-minute consultation, we will discuss your
                    situation, answer your questions, and explain how we can
                    help. No obligation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Need Immediate Help? */}
          <div className="bg-navy-50 rounded-xl p-6 mb-8 animate-slide-up">
            <p className="text-navy-500 font-medium mb-2">
              Need immediate assistance?
            </p>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="text-teal-500 font-bold text-lg hover:text-teal-600 transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call {SITE_CONFIG.phone}
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Back to Home
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/services" className="btn-outline">
              Explore Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
