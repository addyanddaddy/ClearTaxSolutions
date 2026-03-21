import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_CONFIG.name}. Learn how we collect, use, and protect your personal information.`,
};

export default function PrivacyPage() {
  const lastUpdated = "March 20, 2026";

  return (
    <>
      {/* ===== HEADER ===== */}
      <section className="gradient-navy">
        <div className="section-padding text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Privacy Policy
          </h1>
          <p className="mt-4 text-navy-100 text-lg">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* ===== PRIVACY POLICY CONTENT ===== */}
      <section className="bg-white">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto prose prose-gray prose-lg">
            <div className="space-y-8">
              {/* Introduction */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  Introduction
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {SITE_CONFIG.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
                  &ldquo;our&rdquo;) is committed to protecting your privacy.
                  This Privacy Policy explains how we collect, use, disclose,
                  and safeguard your personal information when you visit our
                  website, use our services, or communicate with us. This policy
                  applies to all information collected through our website,
                  email, phone, and in-person interactions.
                </p>
                <p className="text-gray-700 leading-relaxed mt-3">
                  As a tax preparation service operated by an IRS Enrolled
                  Agent, we handle highly sensitive financial and personal
                  information. We take this responsibility seriously and maintain
                  strict confidentiality standards in compliance with IRS
                  Circular 230, the Gramm-Leach-Bliley Act (GLBA), and
                  applicable federal and state privacy laws.
                </p>
              </div>

              {/* Information We Collect */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  Information We Collect
                </h2>

                <h3 className="text-lg font-semibold text-navy-500 mt-6 mb-2">
                  Personal Information You Provide
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We collect personal information that you voluntarily provide
                  to us, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 ml-4">
                  <li>
                    Full name, date of birth, Social Security Number (SSN) or
                    Individual Taxpayer Identification Number (ITIN)
                  </li>
                  <li>
                    Contact information (email address, phone number, mailing
                    address)
                  </li>
                  <li>
                    Financial information (income, deductions, investment
                    records, bank account details for direct deposit)
                  </li>
                  <li>
                    Tax documents (W-2s, 1099s, prior year returns, IRS
                    correspondence)
                  </li>
                  <li>
                    Business information (EIN, entity type, financial
                    statements)
                  </li>
                  <li>
                    Any other information relevant to the preparation of your
                    tax return or representation before the IRS
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-navy-500 mt-6 mb-2">
                  Information Collected Automatically
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  When you visit our website, we may automatically collect
                  certain information, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 ml-4">
                  <li>IP address and approximate geographic location</li>
                  <li>Browser type, version, and operating system</li>
                  <li>Pages visited, time spent, and navigation patterns</li>
                  <li>Referring website or search terms</li>
                  <li>Device identifiers and screen resolution</li>
                </ul>
              </div>

              {/* How We Use Your Information */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  How We Use Your Information
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 ml-4">
                  <li>
                    To prepare and file tax returns on your behalf with the IRS
                    and state tax authorities
                  </li>
                  <li>
                    To represent you before the IRS in audits, appeals, and
                    collections matters
                  </li>
                  <li>To provide tax planning and advisory services</li>
                  <li>To communicate with you about your tax matters</li>
                  <li>
                    To respond to your inquiries and provide customer support
                  </li>
                  <li>To send you relevant tax updates and newsletters (with your consent)</li>
                  <li>
                    To improve our website, services, and user experience
                  </li>
                  <li>To comply with legal and regulatory obligations</li>
                </ul>
              </div>

              {/* Cookies and Tracking */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  Cookies and Tracking Technologies
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Our website uses cookies and similar tracking technologies to
                  enhance your experience. These include:
                </p>

                <h3 className="text-lg font-semibold text-navy-500 mt-6 mb-2">
                  Essential Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Required for the website to function properly. These cannot be
                  disabled.
                </p>

                <h3 className="text-lg font-semibold text-navy-500 mt-6 mb-2">
                  Analytics Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We use Google Analytics (GA4) to understand how visitors
                  interact with our website. Google Analytics collects
                  anonymized data about page views, session duration, and user
                  demographics. You can opt out of Google Analytics by
                  installing the{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-500 hover:text-teal-600 underline"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>
                  .
                </p>

                <h3 className="text-lg font-semibold text-navy-500 mt-6 mb-2">
                  Marketing Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  With your consent, we may use cookies for remarketing and
                  advertising purposes through platforms such as Google Ads and
                  Meta (Facebook). You may opt out of personalized advertising
                  through your browser settings or the{" "}
                  <a
                    href="https://optout.aboutads.info/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-500 hover:text-teal-600 underline"
                  >
                    Digital Advertising Alliance opt-out page
                  </a>
                  .
                </p>
              </div>

              {/* Third-Party Services */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  Third-Party Services
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We may use the following third-party services in connection
                  with our website and business operations:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 ml-4">
                  <li>
                    <strong>Google Analytics (GA4):</strong> Website analytics
                    and traffic measurement
                  </li>
                  <li>
                    <strong>Cal.com / Calendly:</strong> Online appointment
                    scheduling
                  </li>
                  <li>
                    <strong>Email service providers:</strong> Newsletter and
                    communication delivery
                  </li>
                  <li>
                    <strong>Tax preparation software:</strong> Secure tax return
                    preparation and e-filing
                  </li>
                  <li>
                    <strong>Payment processors:</strong> Secure payment
                    collection
                  </li>
                  <li>
                    <strong>Cloud storage:</strong> Encrypted document storage
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-3">
                  Each third-party service provider has its own privacy policy
                  governing the use of your information. We encourage you to
                  review their policies.
                </p>
              </div>

              {/* Data Security */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  Data Security
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate technical and organizational security
                  measures to protect your personal information, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 ml-4">
                  <li>SSL/TLS encryption for all data transmitted via our website</li>
                  <li>Encrypted storage for sensitive financial documents</li>
                  <li>
                    Access controls limiting who can view your information
                  </li>
                  <li>
                    Compliance with IRS Publication 4557 (Safeguarding Taxpayer
                    Data) guidelines
                  </li>
                  <li>Regular security assessments and updates</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-3">
                  While we strive to protect your information, no method of
                  electronic transmission or storage is 100% secure. We cannot
                  guarantee absolute security.
                </p>
              </div>

              {/* Data Retention */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  Data Retention
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We retain tax return copies and related documents for a
                  minimum of three (3) years from the date of filing, or longer
                  as required by IRS regulations, state law, or professional
                  standards. Contact information and communication records are
                  retained for the duration of our professional relationship and
                  for a reasonable period thereafter.
                </p>
              </div>

              {/* Your Rights - GDPR */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  Your Rights (GDPR)
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  If you are a resident of the European Economic Area (EEA) or
                  the United Kingdom, you have certain data protection rights
                  under the General Data Protection Regulation (GDPR),
                  including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 ml-4">
                  <li>
                    <strong>Right of access:</strong> Request a copy of the
                    personal data we hold about you
                  </li>
                  <li>
                    <strong>Right to rectification:</strong> Request correction
                    of inaccurate or incomplete data
                  </li>
                  <li>
                    <strong>Right to erasure:</strong> Request deletion of your
                    personal data, subject to legal retention requirements
                  </li>
                  <li>
                    <strong>Right to restrict processing:</strong> Request
                    limitation of how we process your data
                  </li>
                  <li>
                    <strong>Right to data portability:</strong> Request your
                    data in a structured, machine-readable format
                  </li>
                  <li>
                    <strong>Right to object:</strong> Object to processing
                    based on legitimate interests or direct marketing
                  </li>
                </ul>
              </div>

              {/* Your Rights - CCPA */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  Your Rights (CCPA / California Residents)
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  If you are a California resident, you have rights under the
                  California Consumer Privacy Act (CCPA), including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 ml-4">
                  <li>
                    <strong>Right to know:</strong> Request disclosure of what
                    personal information we collect, use, and share
                  </li>
                  <li>
                    <strong>Right to delete:</strong> Request deletion of your
                    personal information, subject to certain exceptions
                  </li>
                  <li>
                    <strong>Right to opt-out:</strong> Opt out of the sale of
                    your personal information (we do not sell personal
                    information)
                  </li>
                  <li>
                    <strong>Right to non-discrimination:</strong> We will not
                    discriminate against you for exercising your CCPA rights
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-3">
                  <strong>We do not sell your personal information.</strong> We
                  do not share your personal information with third parties for
                  their direct marketing purposes.
                </p>
              </div>

              {/* Children's Privacy */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  Children&apos;s Privacy
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Our services are not directed to individuals under the age of
                  18. We do not knowingly collect personal information from
                  children. If we become aware that we have collected personal
                  information from a child under 18, we will take steps to
                  delete that information.
                </p>
              </div>

              {/* Changes to This Policy */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  Changes to This Privacy Policy
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. Any
                  changes will be posted on this page with an updated &ldquo;Last
                  Updated&rdquo; date. We encourage you to review this policy
                  periodically. Your continued use of our website or services
                  after any changes constitutes acceptance of the updated
                  policy.
                </p>
              </div>

              {/* Contact Us */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  Contact Us
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have questions or concerns about this Privacy Policy,
                  or wish to exercise any of your data rights, please contact
                  us:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mt-4">
                  <p className="text-gray-700">
                    <strong>{SITE_CONFIG.name}</strong>
                    <br />
                    {SITE_CONFIG.owner}, {SITE_CONFIG.credential}
                    <br />
                    {SITE_CONFIG.address.street}
                    <br />
                    {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}{" "}
                    {SITE_CONFIG.address.zip}
                    <br />
                    Email:{" "}
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="text-teal-500 hover:text-teal-600"
                    >
                      {SITE_CONFIG.email}
                    </a>
                    <br />
                    Phone:{" "}
                    <a
                      href={`tel:${SITE_CONFIG.phone}`}
                      className="text-teal-500 hover:text-teal-600"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
