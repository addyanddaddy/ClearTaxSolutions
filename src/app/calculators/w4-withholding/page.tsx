import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import W4WithholdingCalculator from "@/components/calculators/W4WithholdingCalculator";

export const metadata: Metadata = {
  title: "W-4 Withholding Calculator | 2024 | Clear Tax Solutions",
  description:
    "Optimize your W-4 withholding to avoid owing taxes or getting too large a refund. Calculate ideal per-paycheck withholding. IRC § 3402; Form W-4.",
};

export default function W4WithholdingPage() {
  return (
    <section className="section-padding">
      <Link href="/calculators" className="inline-flex items-center text-teal-500 hover:text-teal-600 font-medium mb-8">
        <ArrowLeft className="w-4 h-4 mr-1" /> All Calculators
      </Link>
      <W4WithholdingCalculator />
    </section>
  );
}
