import Link from "next/link";
import { Home, Briefcase, Phone, Search, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center">
      <div className="section-padding w-full">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Display */}
          <div className="mb-8">
            <p className="text-8xl sm:text-9xl font-bold text-navy-100 select-none">
              404
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy-500 mt-4 mb-3">
              Page Not Found
            </h1>
            <p className="text-gray-600 text-lg">
              The page you are looking for does not exist or may have been moved.
              Let us help you find what you need.
            </p>
          </div>

          {/* Search Suggestion */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Search className="w-5 h-5 text-teal-500" />
              <h2 className="font-semibold text-navy-500">
                Looking for something specific?
              </h2>
            </div>
            <p className="text-gray-600 text-sm">
              Try one of the links below, or contact us directly and we will
              point you in the right direction.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <Link
              href="/"
              className="card flex flex-col items-center gap-3 text-center hover:border-teal-200"
            >
              <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-500">Home</h3>
                <p className="text-gray-500 text-sm">Go back to the homepage</p>
              </div>
            </Link>

            <Link
              href="/services"
              className="card flex flex-col items-center gap-3 text-center hover:border-teal-200"
            >
              <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-500">Services</h3>
                <p className="text-gray-500 text-sm">View our tax services</p>
              </div>
            </Link>

            <Link
              href="/contact"
              className="card flex flex-col items-center gap-3 text-center hover:border-teal-200"
            >
              <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-500">Contact</h3>
                <p className="text-gray-500 text-sm">Get in touch with us</p>
              </div>
            </Link>
          </div>

          {/* CTA */}
          <div className="gradient-navy rounded-xl p-6 text-center">
            <p className="text-white font-semibold mb-2">
              Need help with your taxes?
            </p>
            <p className="text-navy-100 text-sm mb-4">
              Book a free consultation with an IRS Enrolled Agent.
            </p>
            <Link href="/book" className="btn-primary">
              Book Free Consultation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
