import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ChildTaxCreditCalculator from "@/components/calculators/ChildTaxCreditCalculator";

export const metadata: Metadata = {
  title: "Child Tax Credit Calculator | 2024 CTC | Clear Tax Solutions",
  description:
    "Calculate your 2024 Child Tax Credit — $2,000 per qualifying child under 17. Includes phase-out analysis and Additional Child Tax Credit ($1,700 refundable). IRC § 24.",
};

export default function ChildTaxCreditPage() {
  return (
    <section className="section-padding">
      <Link href="/calculators" className="inline-flex items-center text-teal-500 hover:text-teal-600 font-medium mb-8">
        <ArrowLeft className="w-4 h-4 mr-1" /> All Calculators
      </Link>
      <ChildTaxCreditCalculator />
    </section>
  );
}
