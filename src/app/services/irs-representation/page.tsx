import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Calendar,
  CheckCircle,
  ArrowRight,
  Phone,
  ChevronDown,
  AlertTriangle,
  Mail,
  Building,
  UserCheck,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "IRS Audit Representation",
  description:
    "Full IRS audit representation by an Enrolled Agent — correspondence, office, and field audits. Tax Court representation under IRC Section 7452. Audit reconsideration and Collection Due Process hearings.",
};

const faqs = [
  {
    q: "Can an Enrolled Agent represent me before the IRS?",
    a: "Yes. Under 31 C.F.R. Section 10.3(a) and Treasury Regulations Sections 601.501 through 601.509, Enrolled Agents are federally authorized to represent taxpayers before all administrative levels of the IRS — including audits, appeals, and collections. Joseph Gasana holds EA License No. 00153835-EA.",
  },
  {
    q: "What is the difference between correspondence, office, and field audits?",
    a: "A correspondence audit is conducted entirely by mail and typically addresses one or two items on your return. An office audit requires you (or your representative) to appear at an IRS office with supporting documents. A field audit is the most thorough — an IRS agent comes to your home, business, or representative's office to examine your records in detail.",
  },
  {
    q: "What happens if I disagree with the audit findings?",
    a: "You have the right to appeal. If you disagree with the audit results, we can file a formal protest with the IRS Office of Appeals. If appeals are unsuccessful, we can assist with Tax Court proceedings under IRC Section 7452, or pursue audit reconsideration under IRS Internal Revenue Manual 4.13.1.",
  },
  {
    q: "What is audit reconsideration?",
    a: "Audit reconsideration (IRS IRM 4.13.1) is a process to request the IRS re-examine a return when you have new documentation, did not appear for the original audit, or disagree with the assessment. It is an alternative to formal appeals and can result in a reduced tax liability.",
  },
  {
    q: "What is a Collection Due Process (CDP) hearing?",
    a: "Under IRC Sections 6320 and 6330, you have the right to a Collection Due Process hearing before the IRS Office of Appeals when the IRS files a federal tax lien or proposes a levy. We represent you at CDP hearings to negotiate alternatives such as installment agreements, offers in compromise, or currently not collectible status.",
  },
  {
    q: "How should I prepare if I receive an IRS audit notice?",
    a: "Do not ignore the notice or contact the IRS directly. Contact us immediately so we can review the notice, identify the scope of the examination, gather supporting documents, and respond on your behalf. As your Enrolled Agent, we handle all IRS communications so you do not have to.",
  },
];

const auditTypes = [
  {
    icon: <Mail className="w-8 h-8" />,
    title: "Correspondence Audit",
    severity: "Low Complexity",
    description:
      "Conducted entirely by mail. The IRS requests documentation for specific items — typically income discrepancies, missing forms, or claimed deductions.",
    features: [
      "Typically 1-2 issues addressed",
      "Response deadline: 30 days",
      "Most common audit type (75%+)",
      "We draft and submit all responses",
    ],
  },
  {
    icon: <Building className="w-8 h-8" />,
    title: "Office Audit",
    severity: "Medium Complexity",
    description:
      "Requires an in-person meeting at an IRS office. Covers broader examination of income, deductions, and credits with document verification.",
    features: [
      "Multiple return items examined",
      "In-person at IRS office",
      "We attend on your behalf",
      "Full document preparation",
    ],
  },
  {
    icon: <UserCheck className="w-8 h-8" />,
    title: "Field Audit",
    severity: "High Complexity",
    description:
      "An IRS Revenue Agent conducts a thorough examination at your home, business, or our office. The most comprehensive audit type, often involving business returns.",
    features: [
      "Comprehensive return examination",
      "Agent visits your location",
      "Multi-day process possible",
      "Full representation provided",
    ],
  },
];

export default function IRSRepresentationPage() {
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
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wide">IRS Audit Defense</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              IRS Audit Representation
            </h1>
            <p className="text-xl text-navy-200 mb-8">
              Facing an IRS audit? You don&apos;t have to go it alone. As an IRS Enrolled Agent authorized
              under 31 C.F.R. Section 10.3(a), {SITE_CONFIG.owner} represents you at every stage —
              from correspondence audits to Tax Court proceedings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book" className="btn-primary text-lg px-8 py-4">
                <Calendar className="w-5 h-5 mr-2" />
                Get Audit Help Now
              </Link>
              <a href={`tel:${SITE_CONFIG.phone}`} className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-navy-500">
                <Phone className="w-5 h-5 mr-2" />
                Call {SITE_CONFIG.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Banner */}
      <section className="bg-amber-50 border-b border-amber-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
          <p className="text-amber-800 text-sm font-medium">
            Received an IRS notice? Do not ignore it and do not contact the IRS directly.{" "}
            <Link href="/book" className="underline font-bold">Contact us immediately</Link> for a
            free case evaluation.
          </p>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <div className="section-padding">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* EA Authority */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Your Authorized Representative
              </h2>
              <p className="text-gray-700 mb-4">
                An IRS Enrolled Agent (EA) is a federally authorized tax practitioner empowered by the
                U.S. Department of the Treasury to represent taxpayers before the IRS. This authority
                is granted under <strong>31 C.F.R. Section 10.3(a)</strong> and governed by
                <strong> Treasury Regulations Sections 601.501 through 601.509</strong>.
              </p>
              <p className="text-gray-700 mb-4">
                Unlike CPAs and attorneys whose practice rights may be limited by state, Enrolled Agents
                hold unlimited practice rights — meaning they can represent any taxpayer, on any tax
                matter, before any IRS office, in all 50 states.
              </p>
              <div className="card bg-navy-500 text-white mt-6">
                <div className="flex items-start gap-4">
                  <Shield className="w-10 h-10 text-teal-300 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">{SITE_CONFIG.owner}</h3>
                    <p className="text-teal-300">{SITE_CONFIG.credential} — License No. {SITE_CONFIG.licenseNo}</p>
                    <p className="text-navy-200 text-sm mt-2">
                      Enrolled since {SITE_CONFIG.enrolledDate}. Authorized to represent taxpayers before
                      all administrative levels of the IRS including examinations, appeals, and collections.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Audit Types Comparison */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Types of IRS Audits
              </h2>
              <div className="space-y-6">
                {auditTypes.map((audit) => (
                  <div key={audit.title} className="card">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center flex-shrink-0">
                        {audit.icon}
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-navy-500">{audit.title}</h3>
                          <span className="text-xs font-medium bg-teal-50 text-teal-600 px-2 py-1 rounded-full">
                            {audit.severity}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{audit.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {audit.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Additional Services */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Beyond the Audit
              </h2>

              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-xl font-bold text-navy-500 mb-2">Tax Court Representation</h3>
                  <p className="text-xs font-medium text-teal-600 mb-3">IRC Section 7452</p>
                  <p className="text-gray-600">
                    If your case cannot be resolved through audit or appeals, we assist with Tax Court
                    proceedings under IRC Section 7452. Tax Court allows you to dispute the IRS
                    determination <strong>without paying the assessed tax first</strong>. We prepare
                    petitions, organize evidence, and represent your interests through the process.
                  </p>
                </div>

                <div className="card">
                  <h3 className="text-xl font-bold text-navy-500 mb-2">Audit Reconsideration</h3>
                  <p className="text-xs font-medium text-teal-600 mb-3">IRS IRM 4.13.1</p>
                  <p className="text-gray-600">
                    If you missed an audit, have new documentation, or believe the IRS made an error,
                    audit reconsideration under IRS Internal Revenue Manual 4.13.1 allows us to request
                    that the IRS re-examine your return. This is available even after the assessment has
                    been made and is an alternative to formal appeals.
                  </p>
                </div>

                <div className="card">
                  <h3 className="text-xl font-bold text-navy-500 mb-2">Collection Due Process (CDP) Hearings</h3>
                  <p className="text-xs font-medium text-teal-600 mb-3">IRC Sections 6320 &amp; 6330</p>
                  <p className="text-gray-600">
                    When the IRS files a federal tax lien (<strong>IRC Section 6320</strong>) or proposes
                    a levy (<strong>IRC Section 6330</strong>), you have the right to a Collection Due
                    Process hearing before the IRS Office of Appeals. We represent you at CDP hearings to
                    negotiate alternatives including installment agreements, offers in compromise, or
                    currently not collectible status.
                  </p>
                </div>
              </div>
            </section>

            {/* Intake Form */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">
                Request an Audit Consultation
              </h2>
              <div className="card">
                <p className="text-gray-600 mb-6">
                  Provide your details and we will contact you within 24 hours for a free case evaluation.
                  All information is confidential.
                </p>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label-text">Full Name *</label>
                      <input type="text" className="input-field" placeholder="Your full name" required />
                    </div>
                    <div>
                      <label className="label-text">Phone *</label>
                      <input type="tel" className="input-field" placeholder="(555) 000-0000" required />
                    </div>
                  </div>
                  <div>
                    <label className="label-text">Email *</label>
                    <input type="email" className="input-field" placeholder="you@example.com" required />
                  </div>
                  <div>
                    <label className="label-text">Audit Type</label>
                    <select className="input-field">
                      <option value="">Select audit type</option>
                      <option value="correspondence">Correspondence Audit</option>
                      <option value="office">Office Audit</option>
                      <option value="field">Field Audit</option>
                      <option value="unknown">I&apos;m not sure</option>
                    </select>
                  </div>
                  <div>
                    <label className="label-text">Tax Year(s) Under Audit</label>
                    <input type="text" className="input-field" placeholder="e.g., 2022, 2023" />
                  </div>
                  <div>
                    <label className="label-text">Brief Description of Your Situation</label>
                    <textarea className="input-field" rows={4} placeholder="Describe the notice you received or your audit situation..." />
                  </div>
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Request Free Consultation
                  </button>
                </form>
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
                <Link href="/services/tax-debt" className="card group">
                  <h3 className="font-bold text-navy-500 group-hover:text-teal-500 transition-colors mb-1">
                    Tax Debt Resolution
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Offers in Compromise, installment agreements, and penalty abatement.
                  </p>
                  <span className="inline-flex items-center text-teal-500 text-sm font-medium mt-2">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
                <Link href="/services/individual" className="card group">
                  <h3 className="font-bold text-navy-500 group-hover:text-teal-500 transition-colors mb-1">
                    Individual Tax Preparation
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Accurate returns prepared by an EA to minimize audit risk.
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
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-navy-500 mb-2">Under Audit?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Don&apos;t wait. Get expert representation from {SITE_CONFIG.owner},{" "}
                  {SITE_CONFIG.credential}.
                </p>
                <Link href="/book" className="btn-primary w-full mb-3">
                  Get Audit Help Now
                </Link>
                <a href={`tel:${SITE_CONFIG.phone}`} className="btn-outline w-full">
                  <Phone className="w-4 h-4 mr-1" />
                  Call Now
                </a>
              </div>

              <div className="card bg-gray-50">
                <h4 className="font-bold text-navy-500 mb-3">Our Audit Defense Includes</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Complete IRS correspondence handling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Document gathering and organization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>In-person representation at IRS offices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Appeals and protest preparation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Tax Court petition assistance</span>
                  </li>
                </ul>
              </div>

              <div className="card bg-navy-500 text-white">
                <p className="text-sm text-navy-200 mb-1">Your Representative</p>
                <p className="font-bold text-lg">{SITE_CONFIG.owner}</p>
                <p className="text-teal-300 text-sm">{SITE_CONFIG.credential}</p>
                <p className="text-navy-300 text-xs mt-1">License No. {SITE_CONFIG.licenseNo}</p>
                <p className="text-navy-300 text-xs">Enrolled since {SITE_CONFIG.enrolledDate}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile CTA */}
      <section className="lg:hidden bg-teal-500 text-white py-12">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Audit Representation?</h2>
          <p className="text-teal-100 mb-6">
            {SITE_CONFIG.owner}, {SITE_CONFIG.credential}, is ready to defend you before the IRS.
          </p>
          <Link href="/book" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
            <Calendar className="w-5 h-5 mr-2" />
            Get Audit Help Now
          </Link>
        </div>
      </section>
    </>
  );
}
