import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EITCCalculator from "@/components/calculators/EITCCalculator";

export const metadata: Metadata = {
  title: "EITC Calculator | Earned Income Tax Credit 2024 | Clear Tax Solutions",
  description:
    "Calculate your 2024 Earned Income Tax Credit (EITC). Up to $7,430 for 3+ children. Includes income limits, phase-out ranges, and investment income test. IRC § 32.",
};

export default function EarnedIncomeCreditPage() {
  return (
    <section className="section-padding">
      <Link href="/calculators" className="inline-flex items-center text-teal-500 hover:text-teal-600 font-medium mb-8">
        <ArrowLeft className="w-4 h-4 mr-1" /> All Calculators
      </Link>
      <EITCCalculator />
    </section>
  );
}
