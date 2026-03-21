import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EstimatedQuarterlyTaxCalculator from "@/components/calculators/EstimatedQuarterlyTaxCalculator";

export const metadata: Metadata = {
  title: "Estimated Quarterly Tax Calculator | 2024 | Clear Tax Solutions",
  description:
    "Calculate quarterly estimated tax payments with safe harbor analysis. Avoid underpayment penalties with 100%/110% prior year tax rules. IRC § 6654; Form 1040-ES.",
};

export default function EstimatedQuarterlyTaxPage() {
  return (
    <section className="section-padding">
      <Link href="/calculators" className="inline-flex items-center text-teal-500 hover:text-teal-600 font-medium mb-8">
        <ArrowLeft className="w-4 h-4 mr-1" /> All Calculators
      </Link>
      <EstimatedQuarterlyTaxCalculator />
    </section>
  );
}
