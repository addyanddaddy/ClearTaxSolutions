import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  CheckCircle2,
  Scale,
  GraduationCap,
  ArrowRight,
  ExternalLink,
  Award,
  Shield,
  BookOpen,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Joseph Gasana | IRS Enrolled Agent Credentials",
  description: `Learn about Joseph Gasana, IRS Enrolled Agent (License No. ${SITE_CONFIG.licenseNo}). Federally licensed tax professional authorized to represent taxpayers before the IRS in all 50 states.`,
};

export default function AboutPage() {
  return (
    <>
      {/* JSON-LD Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: SITE_CONFIG.owner,
            jobTitle: SITE_CONFIG.credential,
            worksFor: {
              "@type": "TaxPreparationService",
              name: SITE_CONFIG.name,
            },
            hasCredential: {
              "@type": "EducationalOccupationalCredential",
              credentialCategory: "IRS Enrolled Agent",
              validFrom: "2023-09-21",
              recognizedBy: {
                "@type": "Organization",
                name: "Internal Revenue Service",
                url: "https://www.irs.gov",
              },
            },
            knowsAbout: [
              "Tax Preparation",
              "IRS Audit Representation",
              "Tax Debt Resolution",
              "Tax Planning",
              "Business Taxation",
            ],
          }),
        }}
      />

      {/* ===== EA CREDENTIAL BADGE SECTION ===== */}
      <section className="gradient-navy relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative section-padding">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* EA Seal Display */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-white/10 border-4 border-teal-400/50 flex items-center justify-center backdrop-blur-sm">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white/20 border-2 border-white/30 flex flex-col items-center justify-center text-center p-4">
                  <Shield className="w-10 h-10 text-teal-300 mb-2" />
                  <span className="text-white font-bold text-sm sm:text-base leading-tight">
                    IRS ENROLLED
                  </span>
                  <span className="text-teal-300 font-bold text-lg sm:text-xl">
                    AGENT
                  </span>
                  <span className="text-navy-200 text-xs mt-1">
                    U.S. Treasury Dept.
                  </span>
                </div>
              </div>
            </div>

            {/* Credential Details */}
            <div className="text-center lg:text-left">
              <span className="text-teal-300 font-semibold text-sm uppercase tracking-wider">
                Credentials &amp; Qualifications
              </span>
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                {SITE_CONFIG.owner}
              </h1>
              <p className="mt-2 text-xl text-teal-300 font-medium">
                {SITE_CONFIG.credential}
              </p>

              <div className="mt-6 space-y-2 text-navy-100">
                <p className="flex items-center gap-2 justify-center lg:justify-start">
                  <GraduationCap className="w-5 h-5 text-teal-400 flex-shrink-0" />
                  {SITE_CONFIG.education}
                </p>
                <p className="flex items-center gap-2 justify-center lg:justify-start">
                  <BadgeCheck className="w-5 h-5 text-teal-400 flex-shrink-0" />
                  License No. {SITE_CONFIG.licenseNo}
                </p>
                <p className="flex items-center gap-2 justify-center lg:justify-start">
                  <Award className="w-5 h-5 text-teal-400 flex-shrink-0" />
                  Enrolled: {SITE_CONFIG.enrolledDate}
                </p>
                <p className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
                  Authorized to represent taxpayers in all 50 states
                </p>
              </div>

              <div className="mt-6">
                <a
                  href="https://www.irs.gov/tax-professionals/verify-the-status-of-an-enrolled-agent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-teal-300 hover:text-teal-200 font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Verify EA Status on IRS.gov
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CERTIFICATE DISPLAY ===== */}
      <section className="bg-gray-50">
        <div className="section-padding">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-teal-500 font-semibold text-sm uppercase tracking-wider">
              Certifications
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-500">
              Professional Certifications
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* EA Certificate */}
            <div className="bg-white rounded-xl border-2 border-teal-500/30 shadow-lg overflow-hidden">
              <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Award className="w-16 h-16 mx-auto mb-3" />
                  <p className="font-medium text-gray-500">
                    EA Certificate Image
                  </p>
                  <p className="text-sm">Upload certificate image here</p>
                </div>
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-bold text-navy-500">
                  IRS Enrolled Agent Certificate
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Issued by the U.S. Department of the Treasury upon passing the
                  Special Enrollment Examination (SEE)
                </p>
              </div>
            </div>

            {/* CE Certificate */}
            <div className="bg-white rounded-xl border-2 border-teal-500/30 shadow-lg overflow-hidden">
              <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <BookOpen className="w-16 h-16 mx-auto mb-3" />
                  <p className="font-medium text-gray-500">
                    CE Certificate Image
                  </p>
                  <p className="text-sm">Upload CE certificate image here</p>
                </div>
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-bold text-navy-500">
                  Continuing Education Certificate
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Circular 230 CE credits — 72 hours required every 3-year
                  enrollment cycle, including 2 hours of ethics/professional
                  conduct
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EA AUTHORITY EXPLAINER ===== */}
      <section className="bg-white">
        <div className="section-padding">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-teal-500 font-semibold text-sm uppercase tracking-wider">
              Understanding Your Options
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-500">
              Why an IRS Enrolled Agent?
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              When it comes to IRS representation, only three types of
              professionals have unlimited practice rights. Here&apos;s how they
              compare.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            {/* EA Card */}
            <div className="card border-2 border-teal-500 relative">
              <div className="absolute -top-3 left-6 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                CLEAR TAX SOLUTIONS
              </div>
              <div className="flex items-center gap-3 mb-5 mt-2">
                <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center">
                  <BadgeCheck className="w-7 h-7 text-teal-500" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-500 text-xl">
                    Enrolled Agent
                  </h3>
                  <p className="text-sm text-teal-500 font-medium">
                    Federal License
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-navy-500 mb-1">
                    Licensing
                  </h4>
                  <p className="text-gray-600">
                    Federally licensed by the U.S. Department of the Treasury.
                    Authorized in all 50 states — no state restrictions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-500 mb-1">
                    IRS Authority
                  </h4>
                  <p className="text-gray-600">
                    Unlimited representation rights before all administrative
                    levels of the IRS per{" "}
                    <span className="font-medium">
                      31 C.F.R. &sect; 10.3(a)
                    </span>
                    .
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-500 mb-1">
                    Specialization
                  </h4>
                  <p className="text-gray-600">
                    Tax-exclusive focus. Must pass the rigorous IRS Special
                    Enrollment Examination (SEE) covering individual, business,
                    and representation topics.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-500 mb-1">
                    Continuing Education
                  </h4>
                  <p className="text-gray-600">
                    72 hours every 3-year cycle, including ethics. Required by
                    IRS Circular 230.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-500 mb-1">Cost</h4>
                  <p className="text-gray-600">
                    Competitive — typically more affordable than CPAs and
                    attorneys while offering the same IRS representation
                    authority.
                  </p>
                </div>
              </div>
            </div>

            {/* CPA Card */}
            <div className="card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-500 text-xl">CPA</h3>
                  <p className="text-sm text-gray-500 font-medium">
                    State License
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-navy-500 mb-1">
                    Licensing
                  </h4>
                  <p className="text-gray-600">
                    State-licensed. Must meet each state&apos;s education and
                    experience requirements. Practice rights limited to licensed
                    states.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-500 mb-1">
                    IRS Authority
                  </h4>
                  <p className="text-gray-600">
                    Unlimited representation rights before the IRS, same as an
                    Enrolled Agent.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-500 mb-1">
                    Specialization
                  </h4>
                  <p className="text-gray-600">
                    Broad accounting focus — auditing, financial reporting,
                    consulting. Tax is one of many practice areas.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-500 mb-1">
                    Continuing Education
                  </h4>
                  <p className="text-gray-600">
                    Varies by state. Typically 40 hours per year across all
                    accounting topics.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-500 mb-1">Cost</h4>
                  <p className="text-gray-600">
                    Higher — broader educational requirements and overhead are
                    reflected in fees.
                  </p>
                </div>
              </div>
            </div>

            {/* Tax Attorney Card */}
            <div className="card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                  <Scale className="w-7 h-7 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-500 text-xl">
                    Tax Attorney
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    State Bar License
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-navy-500 mb-1">
                    Licensing
                  </h4>
                  <p className="text-gray-600">
                    Requires a Juris Doctor (J.D.) degree and state bar
                    admission. Often pursues an LL.M. in Taxation.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-500 mb-1">
                    IRS Authority
                  </h4>
                  <p className="text-gray-600">
                    Unlimited representation rights before the IRS. Also has
                    attorney-client privilege.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-500 mb-1">
                    Specialization
                  </h4>
                  <p className="text-gray-600">
                    Best suited for criminal tax defense, Tax Court litigation,
                    and complex legal tax matters.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-500 mb-1">
                    Continuing Education
                  </h4>
                  <p className="text-gray-600">
                    Varies by state bar. Covers legal ethics and law, not
                    tax-specific.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-500 mb-1">Cost</h4>
                  <p className="text-gray-600">
                    Highest cost option. Typical hourly rates of $300–$600+.
                    Best reserved for legal matters.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pull Quote */}
          <div className="bg-navy-50 border-l-4 border-teal-500 rounded-r-lg p-6 max-w-3xl mx-auto">
            <p className="text-navy-500 text-lg italic">
              &ldquo;Enrolled agents, like attorneys and certified public
              accountants (CPAs), have unlimited practice rights. This means
              they are unrestricted as to which taxpayers they can represent,
              what types of tax matters they can handle, and which IRS offices
              they can represent clients before.&rdquo;
            </p>
            <p className="text-gray-500 text-sm mt-2">
              — Internal Revenue Service, IRS.gov
            </p>
          </div>
        </div>
      </section>

      {/* ===== JOSEPH GASANA BIO ===== */}
      <section className="bg-gray-50">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              {/* Photo Placeholder */}
              <div className="md:col-span-1">
                <div className="aspect-[3/4] bg-gray-200 rounded-xl flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-3 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-500">
                        JG
                      </span>
                    </div>
                    <p className="text-sm font-medium">Professional Photo</p>
                  </div>
                </div>
              </div>

              {/* Bio Content */}
              <div className="md:col-span-2">
                <span className="text-teal-500 font-semibold text-sm uppercase tracking-wider">
                  Meet Your Tax Professional
                </span>
                <h2 className="mt-2 text-3xl font-bold text-navy-500">
                  {SITE_CONFIG.owner}
                </h2>
                <p className="mt-1 text-teal-500 font-medium">
                  {SITE_CONFIG.credential} | {SITE_CONFIG.education}
                </p>
                <p className="mt-1 text-gray-500 text-sm">
                  License No. {SITE_CONFIG.licenseNo}
                </p>

                <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Joseph Gasana is a federally licensed IRS Enrolled Agent,
                    holds a <strong>Master&apos;s degree from the University of Arizona</strong>,
                    and is the founder of Clear Tax Solutions. With a deep commitment to
                    helping individuals and businesses navigate the complexities
                    of the U.S. tax system, Joseph provides expert tax
                    preparation, strategic tax planning, and full-scope IRS
                    representation services.
                  </p>
                  <p>
                    Originally from East Africa, Joseph brings a unique
                    perspective to tax services. He understands the specific
                    challenges faced by immigrant families, international
                    workers, and small business owners building new lives in
                    the United States. He is fluent in <strong>English,
                    Kinyarwanda, Swahili, and French</strong>, and is proud to
                    serve the East African and broader African diaspora
                    community alongside all clients who need expert tax help.
                  </p>
                  <p>
                    After earning his Enrolled Agent designation by passing the
                    IRS Special Enrollment Examination — a rigorous three-part
                    exam covering individual taxation, business taxation, and IRS
                    representation, ethics, and procedures — Joseph combines his
                    advanced education with his EA credential to deliver
                    personalized, high-quality tax services that prioritize
                    compliance, accuracy, and maximum tax savings.
                  </p>
                  <p>
                    As an Enrolled Agent, Joseph holds the highest credential the
                    IRS awards and is authorized under 31 C.F.R. Part 10 to
                    represent taxpayers before all administrative levels of the
                    Internal Revenue Service. Whether you need straightforward
                    tax preparation, help resolving a complex tax debt, or
                    defense during an IRS audit, Joseph brings the expertise and
                    authority to advocate on your behalf.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
                    <p className="text-2xl font-bold text-teal-500">50</p>
                    <p className="text-sm text-gray-500">States Covered</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
                    <p className="text-2xl font-bold text-teal-500">7+</p>
                    <p className="text-sm text-gray-500">Service Areas</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
                    <p className="text-2xl font-bold text-teal-500">4</p>
                    <p className="text-sm text-gray-500">Languages</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
                    <p className="text-2xl font-bold text-teal-500">100%</p>
                    <p className="text-sm text-gray-500">Tax-Focused</p>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/book" className="btn-primary">
                    Book a Free Consultation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMMUNITY & LANGUAGES ===== */}
      <section className="bg-white">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-teal-500 font-semibold text-sm uppercase tracking-wider">
                Serving Our Community
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-500">
                Tax Help in Your Language
              </h2>
              <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                We proudly serve clients from all backgrounds. Joseph speaks
                multiple languages and understands the unique tax needs of
                immigrant families, international workers, and first-generation
                business owners.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {SITE_CONFIG.languages.map((lang) => (
                <div
                  key={lang}
                  className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100 hover:border-teal-300 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-3">
                    <span className="text-teal-500 text-xl">
                      {lang === "English" ? "EN" : lang === "Kinyarwanda" ? "RW" : lang === "Swahili" ? "SW" : "FR"}
                    </span>
                  </div>
                  <p className="font-semibold text-navy-500">{lang}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-navy-50 rounded-xl p-8 border border-teal-100">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-navy-500 mb-2">
                    We Understand Your Journey
                  </h3>
                  <p className="text-gray-600">
                    Whether you&apos;re filing your first U.S. tax return, starting a
                    business, sending money home, or navigating ITIN applications,
                    Clear Tax Solutions provides expert guidance with cultural
                    understanding. We specialize in helping the East African
                    community and all immigrant families build financial stability
                    in the United States.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link href="/book" className="btn-primary whitespace-nowrap">
                    Schedule a Consultation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
