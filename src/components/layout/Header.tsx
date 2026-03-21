"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone, Calendar } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS, SERVICES } from "@/lib/constants";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-navy-500 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-1 hover:text-teal-300 transition-colors">
              <Phone className="w-3 h-3" />
              {SITE_CONFIG.phone}
            </a>
            <span className="hidden sm:inline text-navy-300">|</span>
            <span className="hidden sm:inline text-navy-200">{SITE_CONFIG.email}</span>
          </div>
          <Link href="/book" className="flex items-center gap-1 hover:text-teal-300 transition-colors">
            <Calendar className="w-3 h-3" />
            Free Consultation
          </Link>
        </div>
      </div>

      {/* Main Nav */}
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg gradient-navy flex items-center justify-center">
                <span className="text-white font-bold text-lg">CT</span>
              </div>
              <div>
                <span className="font-bold text-navy-500 text-lg leading-none block">Clear Tax</span>
                <span className="text-teal-500 text-sm font-medium leading-none">Solutions</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) =>
                'children' in link ? (
                  <div key={link.label} className="relative group">
                    <button
                      className="flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-teal-500 font-medium transition-colors"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div
                      className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      {SERVICES.map((service) => (
                        <Link
                          key={service.slug}
                          href={service.href}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-navy-500 block">{service.title}</span>
                          <span className="text-sm text-gray-500">{service.description}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-3 py-2 text-gray-700 hover:text-teal-500 font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a href={`tel:${SITE_CONFIG.phone}`} className="btn-outline text-sm py-2 px-4">
                <Phone className="w-4 h-4 mr-1" /> Call Now
              </a>
              <Link href="/book" className="btn-primary text-sm py-2 px-4">
                <Calendar className="w-4 h-4 mr-1" /> Book Free Consult
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-navy-500"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="lg:hidden pb-4 border-t border-gray-100 pt-4">
              {NAV_LINKS.map((link) =>
                'children' in link ? (
                  <div key={link.label}>
                    <button
                      className="flex items-center justify-between w-full px-3 py-3 text-gray-700 font-medium"
                      onClick={() => setServicesOpen(!servicesOpen)}
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {servicesOpen && (
                      <div className="pl-4">
                        {SERVICES.map((service) => (
                          <Link
                            key={service.slug}
                            href={service.href}
                            className="block px-3 py-2 text-gray-600 hover:text-teal-500"
                            onClick={() => setMobileOpen(false)}
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block px-3 py-3 text-gray-700 font-medium hover:text-teal-500"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="flex flex-col gap-2 mt-4 px-3">
                <a href={`tel:${SITE_CONFIG.phone}`} className="btn-outline text-center">
                  <Phone className="w-4 h-4 mr-1" /> Call Now
                </a>
                <Link href="/book" className="btn-primary text-center" onClick={() => setMobileOpen(false)}>
                  <Calendar className="w-4 h-4 mr-1" /> Book Free Consultation
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
