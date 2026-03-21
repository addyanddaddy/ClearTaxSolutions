import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${SITE_CONFIG.name}. Read our service terms, disclaimers, and Circular 230 disclosure.`,
};

export default function TermsPage() {
  const lastUpdated = "March 20, 2026";

  return (
    <>
      {/* ===== HEADER ===== */}
      <section className="gradient-navy">
        <div className="section-padding text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Terms of Service
          </h1>
          <p className="mt-4 text-navy-100 text-lg">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* ===== TERMS CONTENT ===== */}
      <section className="bg-white">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto">
            {/* Circular 230 Disclaimer - Prominent */}
            <div className="bg-navy-50 border-2 border-navy-500 rounded-xl p-6 mb-10">
              <h2 className="text-lg font-bold text-navy-500 mb-3">
                IRS Circular 230 Disclosure
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                To ensure compliance with requirements imposed by the IRS under
                Circular 230 (31 C.F.R. Part 10), we inform you that any U.S.
                federal tax advice contained in this website, including any
                attachments, links, or related materials, is not intended or
                written to be used, and cannot be used, for the purpose of (i)
                avoiding penalties under the Internal Revenue Code or (ii)
                promoting, marketing, or recommending to another party any
                matters addressed herein. Any tax advice provided through our
                services will be provided in writing and will contain appropriate
                disclaimers where required.
              </p>
            </div>

            <div className="space-y-8">
              {/* Agreement */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  1. Agreement to Terms
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing or using the {SITE_CONFIG.name} website
                  (&ldquo;Site&rdquo;) or any services provided by{" "}
                  {SITE_CONFIG.name} (&ldquo;Services&rdquo;), you agree to be
                  bound by these Terms of Service (&ldquo;Terms&rdquo;). If you
                  do not agree to these Terms, do not access or use our Site or
                  Services. These Terms constitute a legally binding agreement
                  between you and {SITE_CONFIG.name}, operated by{" "}
                  {SITE_CONFIG.owner}, {SITE_CONFIG.credential} (License No.{" "}
                  {SITE_CONFIG.licenseNo}).
                </p>
              </div>

              {/* Services Description */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  2. Description of Services
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {SITE_CONFIG.name} provides professional tax preparation, tax
                  planning, IRS audit representation, tax debt resolution, and
                  related tax services. Our services are performed by{" "}
                  {SITE_CONFIG.owner}, an IRS Enrolled Agent authorized to
                  practice before the Internal Revenue Service pursuant to 31
                  C.F.R. Part 10.
                </p>
                <p className="text-gray-700 leading-relaxed mt-3">
                  Our Services include, but are not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 ml-4">
                  <li>
                    Individual tax preparation (Form 1040 and all schedules)
                  </li>
                  <li>
                    Business tax preparation (Forms 1120, 1120-S, 1065, 990)
                  </li>
                  <li>
                    IRS audit representation (correspondence, office, and field
                    audits)
                  </li>
                  <li>
                    Tax debt resolution (Offers in Compromise, installment
                    agreements, penalty abatement)
                  </li>
                  <li>Payroll tax services (Forms 941, 940, W-2, 1099)</li>
                  <li>Tax planning and advisory services</li>
                  <li>Estate and trust tax preparation (Form 1041)</li>
                </ul>
              </div>

              {/* Client Responsibilities */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  3. Client Responsibilities
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  By engaging our Services, you agree to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 ml-4">
                  <li>
                    Provide complete, accurate, and truthful information
                    necessary for the preparation of your tax returns or
                    representation before the IRS
                  </li>
                  <li>
                    Respond to our requests for information and documentation in
                    a timely manner
                  </li>
                  <li>
                    Review all prepared returns carefully before authorizing
                    filing
                  </li>
                  <li>
                    Understand that you are ultimately responsible for the
                    accuracy and completeness of the information on your tax
                    returns
                  </li>
                  <li>
                    Notify us promptly of any changes in your tax situation,
                    including receipt of IRS or state tax agency correspondence
                  </li>
                  <li>
                    Pay all agreed-upon fees for services rendered in a timely
                    manner
                  </li>
                </ul>
              </div>

              {/* Engagement and Fees */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  4. Engagement and Fees
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  A formal engagement begins when you and {SITE_CONFIG.name}{" "}
                  agree on the scope of services and fees. This agreement may be
                  in the form of a written engagement letter, which will specify
                  the services to be provided, the fees, and the terms of
                  payment. Initial consultations (20 minutes) are provided free
                  of charge. Fees for tax preparation and other services will be
                  communicated before work begins and are based on the
                  complexity of the engagement. We reserve the right to require
                  a deposit or advance payment for certain services.
                </p>
              </div>

              {/* Confidentiality */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  5. Confidentiality
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We treat all client information as confidential. We will not
                  disclose your tax return information or personal data to any
                  third party without your written consent, except as required
                  by law, regulation, or IRS procedures. Our confidentiality
                  obligations are governed by IRS Circular 230, IRC Section
                  7216, and applicable state laws.
                </p>
              </div>

              {/* Website Use */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  6. Website Use
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  You agree to use our Site only for lawful purposes and in
                  accordance with these Terms. You agree not to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 ml-4">
                  <li>
                    Use the Site in any way that violates applicable federal,
                    state, or local laws or regulations
                  </li>
                  <li>
                    Attempt to gain unauthorized access to any portion of the
                    Site, server, or database
                  </li>
                  <li>
                    Transmit any malware, viruses, or harmful code through the
                    Site
                  </li>
                  <li>
                    Use the Site to collect personal information of other users
                  </li>
                  <li>
                    Reproduce, distribute, or create derivative works based on
                    the Site content without our written permission
                  </li>
                </ul>
              </div>

              {/* Tax Calculators Disclaimer */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  7. Tax Calculators and Educational Content
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Our website may include tax calculators, blog posts, articles,
                  and other educational content. This content is provided for
                  informational purposes only and does not constitute
                  professional tax advice. Tax calculators provide estimates
                  based on the information you enter and may not account for all
                  variables in your specific tax situation. You should not rely
                  solely on calculator results for making financial or tax
                  decisions. Always consult with a qualified tax professional
                  for advice specific to your situation.
                </p>
              </div>

              {/* Disclaimers */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  8. Disclaimers
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  THE SITE AND ITS CONTENT ARE PROVIDED ON AN &ldquo;AS IS&rdquo;
                  AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY
                  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
                  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                  PURPOSE, NON-INFRINGEMENT, OR ACCURACY.
                </p>
                <p className="text-gray-700 leading-relaxed mt-3">
                  We do not warrant that the Site will be uninterrupted,
                  error-free, or free of viruses or other harmful components.
                  While we strive to provide accurate and up-to-date
                  information, tax laws and regulations change frequently, and
                  we cannot guarantee that all information on the Site is
                  current at all times.
                </p>
                <p className="text-gray-700 leading-relaxed mt-3">
                  No information provided on this Site creates a professional
                  client relationship. A professional relationship is
                  established only through a signed engagement letter.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  9. Limitation of Liability
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  TO THE FULLEST EXTENT PERMITTED BY LAW, {SITE_CONFIG.name.toUpperCase()}
                  , ITS OWNER, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE
                  LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
                  OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF
                  PROFITS, DATA, USE, OR OTHER INTANGIBLE LOSSES, ARISING OUT
                  OF OR RELATED TO YOUR USE OF THE SITE OR SERVICES.
                </p>
                <p className="text-gray-700 leading-relaxed mt-3">
                  Our total aggregate liability for any claims arising from or
                  related to your use of the Site or Services shall not exceed
                  the total fees paid by you to {SITE_CONFIG.name} during the
                  twelve (12) months preceding the claim.
                </p>
                <p className="text-gray-700 leading-relaxed mt-3">
                  This limitation of liability does not apply to liability
                  arising from our willful misconduct, gross negligence, or any
                  liability that cannot be excluded or limited by applicable
                  law.
                </p>
              </div>

              {/* Indemnification */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  10. Indemnification
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  You agree to indemnify, defend, and hold harmless{" "}
                  {SITE_CONFIG.name}, its owner, employees, and agents from and
                  against any claims, liabilities, damages, losses, and
                  expenses (including reasonable attorney&apos;s fees) arising
                  from: (a) your violation of these Terms; (b) your provision
                  of inaccurate, incomplete, or fraudulent information; or (c)
                  your violation of any applicable law or regulation.
                </p>
              </div>

              {/* Intellectual Property */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  11. Intellectual Property
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  All content on the Site, including text, graphics, logos,
                  images, calculators, and software, is the property of{" "}
                  {SITE_CONFIG.name} or its content suppliers and is protected
                  by U.S. and international copyright, trademark, and other
                  intellectual property laws. You may not reproduce, distribute,
                  modify, or create derivative works of any content without our
                  prior written consent.
                </p>
              </div>

              {/* Governing Law */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  12. Governing Law and Dispute Resolution
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms shall be governed by and construed in accordance
                  with the laws of the State of {SITE_CONFIG.address.state},
                  without regard to its conflict of law provisions. Any disputes
                  arising from these Terms or your use of the Site or Services
                  shall be resolved through binding arbitration in{" "}
                  {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}, in
                  accordance with the rules of the American Arbitration
                  Association, unless both parties agree to an alternative
                  dispute resolution method.
                </p>
              </div>

              {/* Termination */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  13. Termination
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Either party may terminate the professional relationship at
                  any time by providing written notice. Upon termination, you
                  are responsible for payment of all fees incurred for services
                  rendered up to the date of termination. We reserve the right
                  to suspend or terminate your access to the Site at any time,
                  with or without cause, and with or without notice.
                </p>
              </div>

              {/* Changes to Terms */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  14. Changes to These Terms
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify these Terms at any time.
                  Changes will be effective immediately upon posting to the Site
                  with an updated &ldquo;Last Updated&rdquo; date. Your continued use of
                  the Site or Services after any changes constitutes your
                  acceptance of the revised Terms.
                </p>
              </div>

              {/* Severability */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  15. Severability
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  If any provision of these Terms is found to be unenforceable
                  or invalid, that provision shall be limited or eliminated to
                  the minimum extent necessary so that the remaining provisions
                  remain in full force and effect.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h2 className="text-2xl font-bold text-navy-500 mb-4">
                  16. Contact Information
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about these Terms of Service, please
                  contact us:
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
