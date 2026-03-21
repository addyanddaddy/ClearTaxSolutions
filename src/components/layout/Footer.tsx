import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Facebook, Linkedin, Instagram, Youtube } from "lucide-react";
import { SITE_CONFIG, SERVICES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-navy-500 text-white">
      {/* Newsletter Bar */}
      <div className="bg-teal-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg">Tax Tips Delivered Monthly</h3>
              <p className="text-teal-100 text-sm">Stay informed with expert tax insights from an IRS Enrolled Agent.</p>
            </div>
            <form className="flex gap-2 w-full sm:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg text-gray-900 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Email for newsletter"
                required
              />
              <button type="submit" className="bg-navy-500 hover:bg-navy-600 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">CT</span>
              </div>
              <div>
                <span className="font-bold text-white text-lg leading-none block">Clear Tax</span>
                <span className="text-teal-400 text-sm font-medium leading-none">Solutions</span>
              </div>
            </Link>
            <p className="text-navy-200 text-sm mb-4">
              Professional tax preparation, IRS representation, and tax debt resolution by an IRS Enrolled Agent.
            </p>
            <p className="text-navy-300 text-xs">
              {SITE_CONFIG.owner} | {SITE_CONFIG.credential}<br />
              License No. {SITE_CONFIG.licenseNo}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link href={service.href} className="text-navy-200 hover:text-teal-400 text-sm transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/calculators" className="text-navy-200 hover:text-teal-400 text-sm transition-colors">Tax Calculators</Link></li>
              <li><Link href="/about" className="text-navy-200 hover:text-teal-400 text-sm transition-colors">About / Credentials</Link></li>
              <li><Link href="/blog" className="text-navy-200 hover:text-teal-400 text-sm transition-colors">Tax Tips Blog</Link></li>
              <li><Link href="/book" className="text-navy-200 hover:text-teal-400 text-sm transition-colors">Book Consultation</Link></li>
              <li><Link href="/contact" className="text-navy-200 hover:text-teal-400 text-sm transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-navy-200 hover:text-teal-400 text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-navy-200 hover:text-teal-400 text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2 text-navy-200 hover:text-teal-400 text-sm transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 text-navy-200 hover:text-teal-400 text-sm transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-navy-200 text-sm">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    {SITE_CONFIG.address.street}<br />
                    {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} {SITE_CONFIG.address.zip}
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2 text-navy-200 text-sm">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  Mon–Fri: 9am–6pm | Sat: By Appt
                </div>
              </li>
            </ul>
            {/* Social */}
            <div className="flex gap-3 mt-4">
              <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-navy-300 hover:text-teal-400 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-navy-300 hover:text-teal-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-navy-300 hover:text-teal-400 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href={SITE_CONFIG.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-navy-300 hover:text-teal-400 transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-navy-300 text-xs">
            <p>&copy; {new Date().getFullYear()} Clear Tax Solutions. All rights reserved.</p>
            <p>IRS Circular 230 Disclosure: This website does not constitute written tax advice.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
